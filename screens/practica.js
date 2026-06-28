import { generarRonda, calcularEstrellas } from '../js/engine.js';
import { sfxAcierto, sfxError, sfxRacha, pararTTS } from '../js/audio.js';
import { ParticleSystem } from '../js/canvas/particles.js';

let particles = null;

function buildOpcionesHTML(p) {
  if (p.opciones) {
    return p.opciones.map(o =>
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
  const { nivel } = params;
  const preguntas = generarRonda(nivel, 10);
  let idx = 0, aciertos = 0, fallos = 0, racha = 0;
  let t0 = Date.now(), tiempos = [];
  let respondido = false;

  function render() {
    if (idx >= preguntas.length) {
      const tiempoMedio = tiempos.length ? tiempos.reduce((a,b)=>a+b,0)/tiempos.length : 9999;
      const estrellas = calcularEstrellas(aciertos, fallos, tiempoMedio);
      navigate('resultado', { nivel, tipo:'practica', aciertos, fallos, estrellas });
      return;
    }
    const p = preguntas[idx];
    respondido = false;
    t0 = Date.now();

    container.innerHTML = `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5);
        display:flex;flex-direction:column;overflow:hidden">
        <div class="hud">
          <span>Pregunta ${idx+1}/10</span>
          <span>✅ ${aciertos} &nbsp; ❌ ${fallos} &nbsp; 🔥 ${racha}</span>
        </div>
        <div style="padding:3.5rem 1rem 1rem;flex:1;display:flex;flex-direction:column;gap:.8rem">
          <div class="progress-bar"><div class="progress-bar-fill" style="width:${idx*10}%"></div></div>
          <div class="card-kawaii" style="text-align:center;padding:1.5rem">
            <p style="font-size:1.3rem;font-weight:bold;color:#880e4f">${p.enunciado}</p>
          </div>
          <div id="opciones" style="display:grid;grid-template-columns:${p.opciones ? '1fr 1fr' : '1fr'};gap:.6rem">
            ${buildOpcionesHTML(p)}
          </div>
          <div id="feedback" style="min-height:2rem;text-align:center;font-size:1rem;font-weight:bold"></div>
        </div>
      </div>
      <canvas id="c-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50"></canvas>
    `;

    const pc = document.getElementById('c-particles');
    pc.width = window.innerWidth; pc.height = window.innerHeight;
    particles = new ParticleSystem(pc);

    function responder(valor) {
      if (respondido) return;
      respondido = true;
      tiempos.push(Date.now() - t0);
      const correcto = Number(valor) === p.respuesta;
      const fb = document.getElementById('feedback');
      container.querySelectorAll('.btn-option,.numpad-key').forEach(b => b.disabled = true);
      if (correcto) {
        aciertos++; racha++;
        sfxAcierto();
        if (racha % 3 === 0) sfxRacha();
        fb.textContent = racha >= 3 ? `🔥 ¡Racha de ${racha}! ¡Increíble!` : '⭐ ¡Correcto!';
        fb.style.color = '#2e7d32';
        particles.sparkles(window.innerWidth/2, window.innerHeight/2, 8);
      } else {
        fallos++; racha = 0;
        sfxError();
        fb.textContent = `❌ Era ${p.respuesta}`;
        fb.style.color = '#c62828';
      }
      setTimeout(() => { idx++; render(); }, 900);
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

  render();
}

export function unmount() { pararTTS(); particles?.stop(); particles = null; }
