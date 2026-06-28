import { drawLuna } from '../js/canvas/characters.js';
import { hablar } from '../js/audio.js';
import { save } from '../js/storage.js';

export function mount(container, state, params, navigate) {
  container.innerHTML = `
    <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5,#e8eaf6);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem">
      <canvas id="c-luna" width="220" height="240" style="filter:drop-shadow(0 8px 16px rgba(173,20,87,.3))"></canvas>
      <div style="text-align:center">
        <h1 style="font-size:1.8rem;color:#ad1457;text-shadow:2px 2px 0 #f8bbd0;margin-bottom:.5rem">
          ¡Hola, Cecilia! 🌟
        </h1>
        <p style="font-size:1.1rem;color:#6a1b9a;max-width:320px;line-height:1.5">
          Soy <strong>Luna</strong>. La Bruja del Olvido robó el Libro Mágico de los Números.<br>
          ¡Solo tú puedes ayudarme a recuperarlo!
        </p>
      </div>
      <button id="btn-start" class="btn-kawaii" style="font-size:1.3rem;padding:.9rem 2.5rem">
        ✨ ¡Empezar la aventura!
      </button>
      ${state.sesiones > 0 ? `
        <button id="btn-continue" class="btn-kawaii" style="background:#9c27b0;box-shadow:0 4px 0 #6a1b9a,0 6px 16px rgba(156,39,176,.35);font-size:1rem">
          📖 Continuar aventura
        </button>` : ''}
    </div>
  `;

  const canvas = document.getElementById('c-luna');
  const ctx = canvas.getContext('2d');
  drawLuna(ctx, 110, 175, .9, 'feliz');

  setTimeout(() => hablar('¡Hola Cecilia! Soy Luna. La Bruja del Olvido robó el Libro Mágico. ¡Solo tú puedes ayudarme!'), 600);

  canvas.classList.add('fade-in');

  document.getElementById('btn-start').onclick = () => {
    state.sesiones = (state.sesiones || 0) + 1;
    save(state);
    navigate('mapa');
  };

  const btnCont = document.getElementById('btn-continue');
  if (btnCont) btnCont.onclick = () => navigate('mapa');
}

export function unmount() {}
