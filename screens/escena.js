import { ESCENAS } from '../data/historia.js';
import { sfxAcierto, sfxError, hablar, pararTTS } from '../js/audio.js';
import { completarEscena } from '../js/storage.js';
import { ParticleSystem } from '../js/canvas/particles.js';
import { drawFondo } from '../js/canvas/scenes.js';
import { drawLuna } from '../js/canvas/characters.js';

let particles = null;

// Emojis temáticos por escena para superponer en el canvas
const EMOJI_ESCENA = {
  '1-1':'🐚','1-2':'💎','1-3':'🐠','1-4':'⭐','1-5':'🌊',
  '1-6':'🌿','1-7':'🐴','1-8':'✨','1-9':'🔮','1-10':'📖',
  '2-1':'🦄','2-2':'🌈','2-3':'🧲','2-4':'🗺️','2-5':'🍀',
  '2-6':'🌈','2-7':'💫','2-8':'🗺️','2-9':'🌉','2-10':'📖',
  '3-1':'🧪','3-2':'🍄','3-3':'🌟','3-4':'🧙','3-5':'🪨',
  '3-6':'🐦','3-7':'🍃','3-8':'⛲','3-9':'🌳','3-10':'📖',
  '4-1':'🪐','4-2':'⭐','4-3':'🗺️','4-4':'🚀','4-5':'☄️',
  '4-6':'🌌','4-7':'🕳️','4-8':'💫','4-9':'🌠','4-10':'📖',
  '5-1':'💎','5-2':'👑','5-3':'🛡️','5-4':'⚔️','5-5':'🪞',
  '5-6':'📚','5-7':'🐉','5-8':'✨','5-9':'💫','5-10':'📖',
};

function drawIlustracion(canvas, nivel, escenaId) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  drawFondo(ctx, W, H, nivel);
  // Luna en esquina izquierda
  drawLuna(ctx, W * 0.18, H * 0.72, H / 230, 'feliz');
  // Emoji temático grande en centro-derecha
  const emoji = EMOJI_ESCENA[escenaId] || '✨';
  ctx.font = `${Math.floor(H * 0.28)}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.9;
  ctx.fillText(emoji, W * 0.7, H * 0.5);
  ctx.globalAlpha = 1;
}

function buildOpcionesHTML(pregunta) {
  if (pregunta.opciones) {
    return pregunta.opciones.map(o =>
      `<button class="btn-option" data-val="${o}">${o}</button>`
    ).join('');
  }
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem">
      <input id="inp" class="answer-input" type="text" inputmode="numeric" maxlength="4" placeholder="?" readonly/>
      <div class="numpad">
        ${[1,2,3,4,5,6,7,8,9,0,'⌫','✓'].map(k =>
          `<button class="numpad-key" data-key="${k}">${k}</button>`
        ).join('')}
      </div>
    </div>`;
}

export function mount(container, state, params, navigate) {
  const { nivel, idx } = params;
  const escenas = ESCENAS[nivel];
  const escena = escenas[idx];
  const { pregunta } = escena;
  let respondido = false;
  const t0 = Date.now();

  container.innerHTML = `
    <div style="width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden">
      <div class="hud">
        <span>Nivel ${nivel} · Escena ${idx+1}/${escenas.length}</span>
        <span class="stars">${'⭐'.repeat(state.niveles[nivel].estrellas)}${'☆'.repeat(3-state.niveles[nivel].estrellas)}</span>
      </div>
      <canvas id="c-scene" style="width:100%;flex:0 0 38%;margin-top:3rem"></canvas>
      <div style="flex:1;display:flex;flex-direction:column;gap:.6rem;overflow-y:auto;padding:.8rem 1rem">
        <div class="card-kawaii" style="text-align:center">
          <p style="font-size:.95rem;color:#4a148c;line-height:1.6">${escena.narrador}</p>
          <p style="font-size:.75rem;color:#ad1457;margin-top:.4rem">✨ ¿Cuál es la respuesta? ✨</p>
        </div>
        <div id="opciones" style="display:grid;grid-template-columns:${pregunta.opciones ? '1fr 1fr' : '1fr'};gap:.5rem">
          ${buildOpcionesHTML(pregunta)}
        </div>
        <div id="feedback" style="min-height:1.8rem;text-align:center;font-size:1rem;font-weight:bold"></div>
      </div>
    </div>
    <canvas id="c-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50"></canvas>
  `;

  // Dibujar ilustración temática
  const sc = document.getElementById('c-scene');
  sc.width = sc.offsetWidth * (window.devicePixelRatio || 1);
  sc.height = sc.offsetHeight * (window.devicePixelRatio || 1);
  drawIlustracion(sc, nivel, escena.id);

  hablar(escena.narrador);

  const pc = document.getElementById('c-particles');
  pc.width = window.innerWidth; pc.height = window.innerHeight;
  particles = new ParticleSystem(pc);

  function responder(valor) {
    if (respondido) return;
    respondido = true;
    const correcto = Number(valor) === pregunta.respuesta;
    const fb = document.getElementById('feedback');
    container.querySelectorAll('.btn-option,.numpad-key').forEach(b => b.disabled = true);
    if (correcto) {
      sfxAcierto();
      fb.textContent = '🌟 ¡Correcto! ¡Genial, Cecilia!';
      fb.style.color = '#2e7d32';
      particles.confetti(50);
      const tiempoMs = Date.now() - t0;
      const estrellas = tiempoMs < 8000 ? 3 : tiempoMs < 20000 ? 2 : 1;
      completarEscena(state, nivel, escena.id, estrellas, 10);
    } else {
      sfxError();
      fb.textContent = `❌ La respuesta correcta era ${pregunta.respuesta}`;
      fb.style.color = '#c62828';
    }
    setTimeout(() => {
      const next = idx + 1;
      if (next < escenas.length) navigate('escena', { nivel, idx: next });
      else navigate('resultado', { nivel, tipo:'nivel_completo' });
    }, correcto ? 1800 : 2400);
  }

  container.querySelectorAll('.btn-option').forEach(b => {
    b.addEventListener('click', () => responder(b.dataset.val));
  });

  let inputVal = '';
  container.querySelectorAll('.numpad-key').forEach(b => {
    b.addEventListener('click', () => {
      const k = b.dataset.key;
      const inp = document.getElementById('inp');
      if (!inp) return;
      if (k === '⌫') { inputVal = inputVal.slice(0,-1); }
      else if (k === '✓') { responder(inputVal); return; }
      else if (inputVal.length < 4) { inputVal += k; }
      inp.value = inputVal;
    });
  });
}

export function unmount() { pararTTS(); particles?.stop(); particles = null; }
