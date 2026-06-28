import { ESCENAS } from '../data/historia.js';
import { sfxAcierto, sfxError, hablar, pararTTS } from '../js/audio.js';
import { completarEscena } from '../js/storage.js';
import { calcularEstrellas } from '../js/engine.js';
import { ParticleSystem } from '../js/canvas/particles.js';

let particles = null;

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
    <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5);
      display:flex;flex-direction:column;overflow:hidden">
      <div class="hud">
        <span>Nivel ${nivel} · Escena ${idx+1}/${escenas.length}</span>
        <span class="stars">${'⭐'.repeat(state.niveles[nivel].estrellas)}${'☆'.repeat(3-state.niveles[nivel].estrellas)}</span>
      </div>
      <div style="padding:3.5rem 1rem 1rem;flex:1;display:flex;flex-direction:column;gap:.8rem;overflow-y:auto">
        <div class="card-kawaii" style="text-align:center">
          <p style="font-size:1rem;color:#4a148c;line-height:1.7">${escena.narrador}</p>
          <p style="font-size:.8rem;color:#ad1457;margin-top:.5rem">✨ ¿Cuál es la respuesta? ✨</p>
        </div>
        <div id="opciones" style="display:grid;grid-template-columns:${pregunta.opciones ? '1fr 1fr' : '1fr'};gap:.6rem">
          ${buildOpcionesHTML(pregunta)}
        </div>
        <div id="feedback" style="min-height:2rem;text-align:center;font-size:1.1rem;font-weight:bold"></div>
      </div>
    </div>
    <canvas id="c-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50"></canvas>
  `;

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
