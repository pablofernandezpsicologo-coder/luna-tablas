const KEY = 'luna_cecilia';

const DEFAULT = {
  jugadora: 'Cecilia',
  nivel_actual: 1,
  niveles: {
    1: { desbloqueado: true,  estrellas: 0, escenas_ok: [], monedas: 0, record_turbo: null },
    2: { desbloqueado: false, estrellas: 0, escenas_ok: [], monedas: 0, record_turbo: null },
    3: { desbloqueado: false, estrellas: 0, escenas_ok: [], monedas: 0, record_turbo: null },
    4: { desbloqueado: false, estrellas: 0, escenas_ok: [], monedas: 0, record_turbo: null },
    5: { desbloqueado: false, estrellas: 0, escenas_ok: [], monedas: 0, record_turbo: null },
  },
  monedas_total: 0,
  cosmeticos: [],
  sesiones: 0,
  mute: false,
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    const parsed = JSON.parse(raw);
    const base = structuredClone(DEFAULT);
    // Deep merge: top-level fields override defaults, niveles merged per-key
    Object.assign(base, parsed);
    for (let i = 1; i <= 5; i++) {
      base.niveles[i] = { ...DEFAULT.niveles[i], ...(parsed.niveles?.[i] ?? {}) };
    }
    return base;
  } catch { return structuredClone(DEFAULT); }
}

export function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function completarEscena(state, nivel, escenaId, estrellas, monedas) {
  const n = state.niveles[nivel];
  if (!n.escenas_ok.includes(escenaId)) n.escenas_ok.push(escenaId);
  n.estrellas = Math.max(n.estrellas, estrellas);
  n.monedas += monedas;
  state.monedas_total += monedas;
  // desbloquear siguiente nivel si ≥2 estrellas y nivel completado
  const totalEscenas = 10;
  if (estrellas >= 2 && n.escenas_ok.length >= totalEscenas && nivel < 5) {
    state.niveles[nivel + 1].desbloqueado = true;
  }
  save(state);
  return state;
}

export function reset() {
  localStorage.removeItem(KEY);
}
