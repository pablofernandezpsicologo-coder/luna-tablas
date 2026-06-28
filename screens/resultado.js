import { sfxNivelSuperado } from '../js/audio.js';
import { ParticleSystem } from '../js/canvas/particles.js';

let particles = null;

export function mount(container, state, params, navigate) {
  const { nivel, tipo='practica', aciertos=10, fallos=0, estrellas=3 } = params;
  const n = state.niveles[nivel];

  sfxNivelSuperado();

  container.innerHTML = `
    <div style="width:100%;height:100%;background:linear-gradient(160deg,#fce4ec,#f3e5f5);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2rem;padding:1.5rem;text-align:center">
      <div id="emoji-anim" style="font-size:3.5rem" class="pop-in">🌟</div>
      <h2 style="color:#ad1457;font-size:1.5rem">
        ${tipo === 'nivel_completo' ? '¡Capítulo completado!' : tipo === 'jefe' ? '¡La Bruja ha sido derrotada!' : '¡Ronda terminada!'}
      </h2>
      <div id="stars-anim" style="font-size:2rem" class="pop-in">
        ${'⭐'.repeat(estrellas)}${'☆'.repeat(3-estrellas)}
      </div>
      <div class="card-kawaii" style="min-width:260px">
        <p style="font-size:1rem;color:#4a148c">✅ Aciertos: <strong>${aciertos}</strong></p>
        <p style="font-size:1rem;color:#c62828">❌ Fallos: <strong>${fallos}</strong></p>
        <p style="font-size:1rem;color:#f57f17">💰 Monedas nivel: <strong>${n.monedas}</strong></p>
        <p style="font-size:1rem;color:#7b1fa2">💰 Total: <strong>${state.monedas_total}</strong></p>
      </div>
      ${tipo === 'nivel_completo' && nivel < 5 && state.niveles[nivel+1]?.desbloqueado ?
        '<p style="color:#2e7d32;font-weight:bold">🔓 ¡Has desbloqueado el siguiente reino!</p>' : ''}
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center">
        <button id="btn-seguir" class="btn-kawaii">Continuar ✨</button>
        <button id="btn-mapa" class="btn-kawaii" style="background:#9c27b0;box-shadow:0 4px 0 #6a1b9a">🗺️ Mapa</button>
      </div>
    </div>
    <canvas id="c-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50"></canvas>
  `;

  const pc = document.getElementById('c-particles');
  pc.width = window.innerWidth; pc.height = window.innerHeight;
  particles = new ParticleSystem(pc);
  setTimeout(() => particles.confetti(60), 300);

  document.getElementById('btn-seguir').onclick = () => navigate('nivel', { nivel });
  document.getElementById('btn-mapa').onclick = () => navigate('mapa');
}

export function unmount() { particles?.stop(); particles = null; }
