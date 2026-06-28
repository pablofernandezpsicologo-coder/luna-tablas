const MUNDOS = [
  { nivel:1, emoji:'🧜‍♀️', nombre:'Reino del Océano',    color:'#4AB0D9', colorD:'#0277bd' },
  { nivel:2, emoji:'🦄',   nombre:'Valle de Unicornios',  color:'#F5A623', colorD:'#e65100' },
  { nivel:3, emoji:'🌿',   nombre:'Bosque Encantado',     color:'#2E7D52', colorD:'#1b5e20' },
  { nivel:4, emoji:'🚀',   nombre:'Galaxia Estelar',      color:'#9c27b0', colorD:'#4a148c' },
  { nivel:5, emoji:'👑',   nombre:'Gran Reino de Cristal', color:'#e91e63', colorD:'#880e4f' },
];

export function mount(container, state, params, navigate) {
  const items = MUNDOS.map(m => {
    const n = state.niveles[m.nivel];
    const desbloqueado = n.desbloqueado;
    const estrellas = '⭐'.repeat(n.estrellas) + '☆'.repeat(3 - n.estrellas);
    return `
      <div class="mundo-btn ${desbloqueado ? '' : 'bloqueado'}"
           data-nivel="${m.nivel}"
           style="background:${desbloqueado ? 'white' : '#f5f5f5'};
             border:3px solid ${desbloqueado ? m.color : '#ccc'};
             border-radius:20px;padding:1rem;display:flex;align-items:center;gap:1rem;
             box-shadow:${desbloqueado ? '0 4px 16px rgba(0,0,0,.12)' : 'none'};
             opacity:${desbloqueado ? '1' : '.5'};
             cursor:${desbloqueado ? 'pointer' : 'default'};
             touch-action:manipulation">
        <span style="font-size:2.5rem">${m.emoji}</span>
        <div style="flex:1">
          <div style="font-weight:bold;color:${m.colorD};font-size:1rem">${m.nombre}</div>
          <div style="font-size:.8rem;color:#666">${desbloqueado ? estrellas : '🔒 Bloqueado'}</div>
          ${desbloqueado && n.escenas_ok.length > 0 ? `<div style="font-size:.75rem;color:#999">${n.escenas_ok.length}/10 escenas</div>` : ''}
        </div>
        ${desbloqueado ? `<span style="font-size:1.5rem;color:${m.color}">▶</span>` : ''}
      </div>`;
  }).join('');

  container.innerHTML = `
    <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5,#e8eaf6);
      overflow-y:auto;padding:1rem">
      <div style="text-align:center;margin-bottom:1rem">
        <h2 style="color:#ad1457;font-size:1.4rem">🗺️ Los 5 Reinos de Luna</h2>
        <p style="color:#7b1fa2;font-size:.9rem">Monedas: 💰 ${state.monedas_total} &nbsp;|&nbsp; Sesiones: ${state.sesiones}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:.7rem;max-width:480px;margin:0 auto;padding-bottom:3rem">
        ${items}
      </div>
    </div>
  `;

  container.querySelectorAll('.mundo-btn:not(.bloqueado)').forEach(el => {
    el.addEventListener('click', () => {
      navigate('nivel', { nivel: parseInt(el.dataset.nivel) });
    });
  });
}

export function unmount() {}
