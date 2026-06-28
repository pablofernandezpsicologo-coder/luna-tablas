import { load, save } from './storage.js';
import { setMute, isMuted, sfxClick } from './audio.js';

// Registro de pantallas
const SCREENS = {};
let currentScreen = null;
let state = null;

export function registerScreen(name, mod) { SCREENS[name] = mod; }

export function navigate(name, params={}) {
  sfxClick();
  if (currentScreen?.unmount) currentScreen.unmount();
  const container = document.getElementById('app');
  container.innerHTML = '';
  const mod = SCREENS[name];
  if (!mod) { console.error('Screen not found:', name); return; }
  currentScreen = mod;
  mod.mount(container, state, params, navigate);
  // botón mute persistente
  let btn = document.getElementById('btn-mute');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'btn-mute';
    btn.className = 'btn-mute';
    btn.onclick = () => {
      setMute(!isMuted());
      state.mute = isMuted();
      save(state);
      btn.textContent = isMuted() ? '🔇' : '🔊';
    };
    document.body.appendChild(btn);
  }
  btn.textContent = isMuted() ? '🔇' : '🔊';
}

async function main() {
  // Registrar service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  state = load();
  setMute(state.mute ?? false);

  // Importar y registrar todas las pantallas
  const mods = await Promise.all([
    import('../screens/intro.js'),
    import('../screens/mapa.js'),
    import('../screens/nivel.js'),
    import('../screens/escena.js'),
    import('../screens/practica.js'),
    import('../screens/jefe.js'),
    import('../screens/resultado.js'),
  ]);
  const names = ['intro','mapa','nivel','escena','practica','jefe','resultado'];
  mods.forEach((m,i) => registerScreen(names[i], m));

  navigate('intro');
}

main();
