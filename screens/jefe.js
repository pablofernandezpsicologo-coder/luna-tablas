import { generarPregunta } from '../js/engine.js';
import { sfxAcierto, sfxError, sfxNivelSuperado, hablar, pararTTS } from '../js/audio.js';
import { ParticleSystem } from '../js/canvas/particles.js';

let particles = null;

export function mount(container, state, params, navigate) {
  const { nivel } = params;
  const N = 5;
  let idx = 0, vidas = 3;

  hablar('La Bruja del Olvido aparece. Tienes tres vidas. ¡Responde bien y recuperarás el Libro Mágico!');

  function render() {
    if (idx >= N) {
      sfxNivelSuperado();
      hablar('¡Lo lograste, Cecilia! ¡La Bruja ha desaparecido y el Libro Mágico está completo!');
      navigate('resultado', { nivel, tipo:'jefe', aciertos:N, fallos:3-vidas, estrellas: vidas===3?3:vidas>=2?2:1 });
      return;
    }
    if (vidas <= 0) {
      hablar('¡Oh no! Inténtalo de nuevo, Cecilia. ¡Tú puedes!');
      navigate('nivel', { nivel });
      return;
    }

    const p = generarPregunta(nivel);
    let respondido = false;

    const opcionesHTML = p.opciones
      ? p.opciones.map(o => `<button class="btn-option" data-val="${o}">${o}</button>`).join('')
      : `
        <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem">
          <input id="inp" class="answer-input" type="text" inputmode="numeric" maxlength="4" placeholder="?" readonly/>
          <div class="numpad">
            ${[1,2,3,4,5,6,7,8,9,0,'⌫','✓'].map(k =>
              `<button class="numpad-key" data-key="${k}">${k}</button>`
            ).join('')}
          </div>
        </div>`;

    container.innerHTML = `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a0030,#4a148c);
        display:flex;flex-direction:column;overflow:hidden">
        <div class="hud" style="background:linear-gradient(90deg,#4a148c,#c2185b)">
          <span style="color:#ffd700">⚔️ Batalla final ${idx+1}/${N}</span>
          <span>${'❤️'.repeat(vidas)}${'🖤'.repeat(3-vidas)}</span>
        </div>
        <div style="padding:3.5rem 1rem 1rem;flex:1;display:flex;flex-direction:column;gap:1rem;align-items:center">
          <div style="font-size:3rem" class="float">🧙‍♀️</div>
          <div class="card-kawaii" style="text-align:center;border-color:#ce93d8;width:100%;max-width:400px">
            <p style="font-size:.85rem;color:#6a1b9a;margin-bottom:.3rem">La Bruja lanza un enigma...</p>
            <p style="font-size:1.3rem;font-weight:bold;color:#880e4f">${p.enunciado}</p>
          </div>
          <div id="opciones" style="display:grid;grid-template-columns:${p.opciones ? '1fr 1fr' : '1fr'};gap:.6rem;width:100%;max-width:320px">
            ${opcionesHTML}
          </div>
          <div id="feedback" style="min-height:2rem;text-align:center;font-size:1rem;font-weight:bold;color:white"></div>
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
      const correcto = Number(valor) === p.respuesta;
      const fb = document.getElementById('feedback');
      container.querySelectorAll('.btn-option,.numpad-key').forEach(b => b.disabled = true);
      if (correcto) {
        sfxAcierto(); idx++;
        fb.textContent = '⚡ ¡Respuesta correcta! La bruja retrocede...';
        particles.sparkles(window.innerWidth/2, 200, 12);
      } else {
        sfxError(); vidas--;
        fb.textContent = `💔 Era ${p.respuesta}. ¡Pierdes una vida!`;
      }
      setTimeout(render, 1300);
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
