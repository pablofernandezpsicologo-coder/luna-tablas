import { ESCENAS } from '../data/historia.js';

const MUNDOS = {
  1:{ nombre:'Reino del Océano',    emoji:'🧜‍♀️', color:'#4AB0D9', colorD:'#0277bd' },
  2:{ nombre:'Valle de Unicornios',  emoji:'🦄',   color:'#F5A623', colorD:'#e65100' },
  3:{ nombre:'Bosque Encantado',     emoji:'🌿',   color:'#2E7D52', colorD:'#1b5e20' },
  4:{ nombre:'Galaxia Estelar',      emoji:'🚀',   color:'#9c27b0', colorD:'#4a148c' },
  5:{ nombre:'Gran Reino de Cristal',emoji:'👑',   color:'#e91e63', colorD:'#880e4f' },
};

export function mount(container, state, params, navigate) {
  const { nivel } = params;
  const mundo = MUNDOS[nivel];
  const n = state.niveles[nivel];
  const escenas = ESCENAS[nivel];

  const escenesHTML = escenas.map((e, i) => {
    const completada = n.escenas_ok.includes(e.id);
    return `
      <button class="escena-btn" data-idx="${i}"
        style="background:${completada ? '#e8f5e9' : 'white'};
          border:2px solid ${completada ? '#81c784' : mundo.color};
          border-radius:14px;padding:.7rem 1rem;text-align:left;font-family:inherit;
          display:flex;align-items:center;gap:.6rem;cursor:pointer;touch-action:manipulation;width:100%">
        <span style="font-size:1.3rem">${completada ? '✅' : '📖'}</span>
        <span style="font-size:.9rem;color:#4a148c">${e.titulo}</span>
      </button>`;
  }).join('');

  container.innerHTML = `
    <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5);overflow-y:auto;padding-bottom:2rem">
      <div class="hud">
        <button id="btn-back" style="background:none;color:white;font-size:1.2rem;cursor:pointer;touch-action:manipulation">←</button>
        <span>${mundo.emoji} ${mundo.nombre}</span>
        <span class="stars">${'⭐'.repeat(n.estrellas)}${'☆'.repeat(3-n.estrellas)}</span>
      </div>
      <div style="margin-top:3.5rem;display:flex;flex-direction:column;gap:.6rem;max-width:480px;margin:3.5rem auto 0;padding:0 1rem">
        <h3 style="text-align:center;color:#ad1457;margin-bottom:.5rem">
          Historia — ${n.escenas_ok.length}/${escenas.length} escenas
        </h3>
        ${escenesHTML}
        <button id="btn-practica" class="btn-kawaii" style="margin-top:.5rem;background:#9c27b0;box-shadow:0 4px 0 #6a1b9a">
          ⚡ Ronda de práctica libre (10 preguntas)
        </button>
        ${nivel === 5 ? `<button id="btn-jefe" class="btn-kawaii" style="background:#e91e63">
          👑 ¡Batalla final con la Bruja!
        </button>` : ''}
        <button id="btn-mapa-back" style="background:none;border:none;color:#ad1457;font-family:inherit;cursor:pointer;text-decoration:underline;text-align:center;padding:.5rem;touch-action:manipulation">
          ← Volver al mapa
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.escena-btn').forEach(b => {
    b.addEventListener('click', () => navigate('escena', { nivel, idx: parseInt(b.dataset.idx) }));
  });
  document.getElementById('btn-practica').onclick = () => navigate('practica', { nivel });
  document.getElementById('btn-back').onclick = () => navigate('mapa');
  document.getElementById('btn-mapa-back').onclick = () => navigate('mapa');
  document.getElementById('btn-jefe')?.addEventListener('click', () => navigate('jefe', { nivel }));
}

export function unmount() {}
