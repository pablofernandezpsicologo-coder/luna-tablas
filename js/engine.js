// Devuelve número aleatorio entre min y max inclusive
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// Genera 3 distractores plausibles distintos de la respuesta correcta
function distractores(correcta) {
  const set = new Set([correcta]);
  const offsets = [-2,-1,1,2,3,-3,4,-4,5,-5].sort(()=>Math.random()-.5);
  for (const o of offsets) {
    const v = correcta + o;
    if (v > 0 && !set.has(v)) set.add(v);
    if (set.size === 4) break;
  }
  // Fallback: si no hay suficientes distractores, extender rango
  let extra = 6;
  while (set.size < 4) { if (!set.has(extra)) set.add(extra); extra++; }
  return [...set].sort(() => Math.random() - .5);
}

function preguntaFlash() {
  const a = rand(1,10), b = rand(1,10);
  const respuesta = a * b;
  return { tipo:'flash', enunciado:`${a} × ${b} = ?`, a, b, respuesta, opciones: distractores(respuesta) };
}

function preguntaEscribe() {
  const a = rand(1,10), b = rand(1,10);
  return { tipo:'escribe', enunciado:`${a} × ${b} = ?`, a, b, respuesta: a*b };
}

function preguntaFactor() {
  const a = rand(1,10), b = rand(1,10);
  const mostrar = Math.random() < .5 ? 'a' : 'b';
  const enunciado = mostrar==='a' ? `__ × ${b} = ${a*b}` : `${a} × __ = ${a*b}`;
  return { tipo:'factor', enunciado, a, b, respuesta: mostrar==='a' ? a : b };
}

function preguntaDivision() {
  const b = rand(2,10), respuesta = rand(1,10);
  const a = b * respuesta;
  return { tipo:'division', enunciado:`${a} ÷ ${b} = ?`, a, b, respuesta, opciones: distractores(respuesta) };
}

// Banco de problemas narrativos
const PROBLEMAS = [
  { nivel:3, texto:'La hada tiene {a} bolsitas con {b} estrellas cada una. ¿Cuántas estrellas tiene en total?', op:'mul' },
  { nivel:3, texto:'El unicornio plantó {a} filas de flores con {b} flores en cada fila. ¿Cuántas flores hay?', op:'mul' },
  { nivel:3, texto:'La sirena repartió {total} conchas entre {b} amigas iguales. ¿Cuántas le tocó a cada una?', op:'div' },
  { nivel:4, texto:'Luna tiene {a} cajas con {b} pociones. Usó {resta} pociones. ¿Cuántas le quedan?', op:'mul_resta' },
  { nivel:4, texto:'En la galaxia hay {a} planetas con {b} lunas cada uno. ¿Cuántas lunas en total?', op:'mul' },
];

function preguntaProblema(nivel) {
  const pool = PROBLEMAS.filter(p => p.nivel <= nivel);
  const plantilla = pool[rand(0, pool.length-1)];
  const a = rand(2,9), b = rand(2,9);
  let respuesta, texto;
  if (plantilla.op === 'mul') {
    respuesta = a * b;
    texto = plantilla.texto.replace('{a}',a).replace('{b}',b);
  } else if (plantilla.op === 'div') {
    respuesta = a;
    const total = a * b;
    texto = plantilla.texto.replace('{total}',total).replace('{b}',b);
  } else { // mul_resta
    const resta = rand(1, a*b - 1);
    respuesta = a*b - resta;
    texto = plantilla.texto.replace('{a}',a).replace('{b}',b).replace('{resta}',resta);
  }
  return { tipo:'problema', enunciado:texto, a, b, respuesta, opciones: distractores(respuesta) };
}

const GENERADORES = {
  1: () => preguntaFlash(),
  2: () => Math.random()<.6 ? preguntaEscribe() : preguntaFactor(),
  3: () => {
    const r = Math.random();
    if (r < .4) return preguntaProblema(3);
    if (r < .7) return preguntaDivision();
    return preguntaEscribe();
  },
  4: () => {
    const r = Math.random();
    if (r < .4) return preguntaProblema(4);
    if (r < .7) return preguntaDivision();
    return preguntaFactor();
  },
  5: () => {
    const r = Math.random();
    if (r < .35) return preguntaProblema(4);
    if (r < .6)  return preguntaDivision();
    if (r < .8)  return preguntaFactor();
    return preguntaEscribe();
  },
};

export function generarPregunta(nivel) {
  return GENERADORES[nivel]?.() ?? preguntaFlash();
}

export function generarRonda(nivel, n=10) {
  return Array.from({ length: n }, () => generarPregunta(nivel));
}

// estrellas: 0-3 según aciertos, fallos y tiempo medio (ms)
export function calcularEstrellas(aciertos, fallos, tiempoMedio) {
  if (aciertos < 6) return 1;
  if (fallos > 2)   return 1;
  if (fallos > 0 || tiempoMedio > 12000) return 2;
  return 3;
}
