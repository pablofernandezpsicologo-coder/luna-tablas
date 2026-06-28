let ctx = null;
let muted = false;
let cachedVoices = [];

if (window.speechSynthesis) {
  const loadVoices = () => { cachedVoices = speechSynthesis.getVoices(); };
  loadVoices();
  speechSynthesis.addEventListener('voiceschanged', loadVoices);
}

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function beep(freq, dur, type='sine', vol=.3, delay=0) {
  if (muted) return;
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ac.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(.001, ac.currentTime + delay + dur);
  osc.start(ac.currentTime + delay);
  osc.stop(ac.currentTime + delay + dur + .05);
}

export function sfxAcierto() {
  beep(523,.1,'sine',.25);
  beep(659,.1,'sine',.25,.12);
  beep(784,.2,'sine',.25,.24);
}

export function sfxError() {
  beep(220,.15,'sawtooth',.2);
  beep(180,.25,'sawtooth',.2,.18);
}

export function sfxRacha() {
  [523,659,784,1047].forEach((f,i) => beep(f,.1,'sine',.22,i*.09));
}

export function sfxNivelSuperado() {
  [523,659,784,1047,1319].forEach((f,i) => beep(f,.15,'sine',.28,i*.1));
  beep(1568,.4,'sine',.28,.55);
}

export function sfxClick() { beep(800,.05,'sine',.15); }

export function setMute(val) { muted = val; }
export function isMuted() { return muted; }

// TTS — lee el texto de la escena
export function hablar(texto) {
  if (muted || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'es-ES'; u.rate = .9; u.pitch = 1.1;
  const voces = cachedVoices.length ? cachedVoices : speechSynthesis.getVoices();
  const voz = voces.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('female'))
            || voces.find(v => v.lang.startsWith('es'))
            || voces[0];
  if (voz) u.voice = voz;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export function pararTTS() { if (window.speechSynthesis) speechSynthesis.cancel(); }
