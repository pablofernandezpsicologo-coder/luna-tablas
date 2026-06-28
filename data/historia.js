// Cada escena: id, titulo, narrador (texto TTS), pregunta
// pregunta.tipo: 'flash' (tiene opciones[]), 'escribe' (no opciones), 'factor' (no opciones), 'division' (tiene opciones[]), 'problema' (tiene opciones[])

export const ESCENAS = {
  1: [ // Reino del Océano — Nivel 1: flash cards (4 opciones)
    { id:'1-1', titulo:'La llegada al Océano',
      narrador:'Cecilia, has llegado al Reino del Océano. La sirena Coral te necesita. Las bolsas de conchas están mezcladas.',
      pregunta:{ tipo:'flash', enunciado:'La sirena tiene 3 bolsas con 8 conchas cada una. ¿Cuántas conchas en total?', respuesta:24, opciones:[24,18,32,11] }
    },
    { id:'1-2', titulo:'El tesoro del arrecife',
      narrador:'Bajo el arrecife de coral hay 5 cofres. Cada cofre tiene 7 perlas. ¿Cuántas perlas hay en total?',
      pregunta:{ tipo:'flash', enunciado:'5 cofres × 7 perlas = ?', respuesta:35, opciones:[35,30,42,28] }
    },
    { id:'1-3', titulo:'Los peces payaso',
      narrador:'Hay 4 anémonas y en cada una viven 6 peces payaso. ¿Cuántos peces payaso hay?',
      pregunta:{ tipo:'flash', enunciado:'4 × 6 = ?', respuesta:24, opciones:[24,20,28,18] }
    },
    { id:'1-4', titulo:'Las burbujas mágicas',
      narrador:'Luna lanzó 9 burbujas mágicas. Cada burbuja lleva 3 estrellas de mar. ¿Cuántas estrellas en total?',
      pregunta:{ tipo:'flash', enunciado:'9 × 3 = ?', respuesta:27, opciones:[27,18,36,21] }
    },
    { id:'1-5', titulo:'La canción de las olas',
      narrador:'Las olas forman grupos de 7. Si hay 8 grupos, ¿cuántas olas cantan?',
      pregunta:{ tipo:'flash', enunciado:'7 × 8 = ?', respuesta:56, opciones:[56,48,63,54] }
    },
    { id:'1-6', titulo:'El collar de algas',
      narrador:'Coral quiere hacer un collar con 2 tipos de conchas. Si pone 6 de cada tipo, ¿cuántas conchas necesita?',
      pregunta:{ tipo:'flash', enunciado:'2 × 6 = ?', respuesta:12, opciones:[12,8,16,10] }
    },
    { id:'1-7', titulo:'Los caballitos de mar',
      narrador:'Los caballitos de mar nadan en filas de 5. Si hay 9 filas, ¿cuántos caballitos hay?',
      pregunta:{ tipo:'flash', enunciado:'5 × 9 = ?', respuesta:45, opciones:[45,40,54,36] }
    },
    { id:'1-8', titulo:'La tormenta de estrellas',
      narrador:'Cayeron estrellas en 4 zonas del océano. En cada zona cayeron 10 estrellas iguales. ¿Cuántas en total?',
      pregunta:{ tipo:'flash', enunciado:'10 × 4 = ?', respuesta:40, opciones:[40,50,30,44] }
    },
    { id:'1-9', titulo:'El tesoro perdido',
      narrador:'La bruja borró el resultado. Ayuda a Coral: 7 grupos de 7 peces.',
      pregunta:{ tipo:'flash', enunciado:'7 × 7 = ?', respuesta:49, opciones:[49,42,56,45] }
    },
    { id:'1-10', titulo:'El Libro del Océano',
      narrador:'Último enigma antes de recuperar la página del Libro. 8 sirenas y 8 perlas para cada una.',
      pregunta:{ tipo:'flash', enunciado:'8 × 8 = ?', respuesta:64, opciones:[64,56,72,60] }
    },
  ],
  2: [ // Valle de Unicornios — Nivel 2: escribe + factor
    { id:'2-1', titulo:'El campo de flores',
      narrador:'Los unicornios plantaron flores en 6 filas. Cada fila tiene 9 flores. ¿Cuántas flores hay? Escribe tú la respuesta.',
      pregunta:{ tipo:'escribe', enunciado:'6 × 9 = ?', respuesta:54 }
    },
    { id:'2-2', titulo:'La crin arcoíris',
      narrador:'Un unicornio tiene crin con 7 colores. Si hay 8 unicornios, ¿cuántos colores en total?',
      pregunta:{ tipo:'escribe', enunciado:'7 × 8 = ?', respuesta:56 }
    },
    { id:'2-3', titulo:'Las herraduras mágicas',
      narrador:'Cada unicornio tiene 4 patas y necesita una herradura por pata. Si hay 9 unicornios, ¿cuántas herraduras?',
      pregunta:{ tipo:'escribe', enunciado:'4 × 9 = ?', respuesta:36 }
    },
    { id:'2-4', titulo:'El factor oculto',
      narrador:'La bruja borró un número del mapa. ¿Puedes encontrarlo?',
      pregunta:{ tipo:'factor', enunciado:'__ × 7 = 63', respuesta:9 }
    },
    { id:'2-5', titulo:'El prado misterioso',
      narrador:'Hay 48 tréboles de cuatro hojas. Si están en 6 grupos iguales, ¿cuántos hay en cada grupo?',
      pregunta:{ tipo:'factor', enunciado:'6 × __ = 48', respuesta:8 }
    },
    { id:'2-6', titulo:'Los arcoíris',
      narrador:'Cada arcoíris tiene 7 colores. ¿Cuántos colores hay en 8 arcoíris?',
      pregunta:{ tipo:'escribe', enunciado:'7 × 8 = ?', respuesta:56 }
    },
    { id:'2-7', titulo:'Las estrellas de la noche',
      narrador:'El unicornio plateado dibujó 9 constelaciones con 9 estrellas cada una.',
      pregunta:{ tipo:'escribe', enunciado:'9 × 9 = ?', respuesta:81 }
    },
    { id:'2-8', titulo:'El mapa del valle',
      narrador:'Falta un número en el mapa del Valle de Unicornios.',
      pregunta:{ tipo:'factor', enunciado:'__ × 6 = 54', respuesta:9 }
    },
    { id:'2-9', titulo:'El puente arcoíris',
      narrador:'El puente tiene 10 arcos y cada arco brilla con 8 colores.',
      pregunta:{ tipo:'escribe', enunciado:'10 × 8 = ?', respuesta:80 }
    },
    { id:'2-10', titulo:'La página del Valle',
      narrador:'Último enigma del Valle de Unicornios. ¿Cuánto es 9 por 7?',
      pregunta:{ tipo:'escribe', enunciado:'9 × 7 = ?', respuesta:63 }
    },
  ],
  3: [ // Bosque Encantado — Nivel 3: problemas narrativos + división
    { id:'3-1', titulo:'La poción de hadas',
      narrador:'El hada necesita 8 flores para cada frasco de poción. ¿Cuántas flores para 6 frascos?',
      pregunta:{ tipo:'problema', enunciado:'6 frascos, 8 flores cada uno. ¿Cuántas flores en total?', respuesta:48, opciones:[48,42,56,36] }
    },
    { id:'3-2', titulo:'Los hongos mágicos',
      narrador:'Hay 56 setas repartidas en 7 grupos iguales. ¿Cuántas setas hay en cada grupo?',
      pregunta:{ tipo:'division', enunciado:'56 ÷ 7 = ?', respuesta:8, opciones:[8,6,9,7] }
    },
    { id:'3-3', titulo:'Las luciérnagas',
      narrador:'Hay 9 árboles y en cada árbol descansan 7 luciérnagas. ¿Cuántas luciérnagas hay en total?',
      pregunta:{ tipo:'problema', enunciado:'9 árboles × 7 luciérnagas = ?', respuesta:63, opciones:[63,56,72,54] }
    },
    { id:'3-4', titulo:'La receta secreta',
      narrador:'La receta dice: divide 45 hongos entre 9 calderos iguales. ¿Cuántos en cada caldero?',
      pregunta:{ tipo:'division', enunciado:'45 ÷ 9 = ?', respuesta:5, opciones:[5,4,6,7] }
    },
    { id:'3-5', titulo:'El sendero de piedras',
      narrador:'El sendero tiene 8 tramos y cada tramo tiene 6 piedras mágicas. ¿Cuántas piedras en total?',
      pregunta:{ tipo:'problema', enunciado:'8 tramos × 6 piedras = ?', respuesta:48, opciones:[48,42,54,40] }
    },
    { id:'3-6', titulo:'Los nidos de pájaro',
      narrador:'Hay 72 huevos repartidos en 8 nidos iguales. ¿Cuántos huevos por nido?',
      pregunta:{ tipo:'division', enunciado:'72 ÷ 8 = ?', respuesta:9, opciones:[9,8,7,10] }
    },
    { id:'3-7', titulo:'La danza de las hojas',
      narrador:'7 vientos traen 9 hojas mágicas cada uno. ¿Cuántas hojas caen en total?',
      pregunta:{ tipo:'problema', enunciado:'7 vientos × 9 hojas = ?', respuesta:63, opciones:[63,54,72,56] }
    },
    { id:'3-8', titulo:'La fuente encantada',
      narrador:'La fuente reparte 36 gotas mágicas en 6 charcos iguales. ¿Cuántas por charco?',
      pregunta:{ tipo:'division', enunciado:'36 ÷ 6 = ?', respuesta:6, opciones:[6,5,7,8] }
    },
    { id:'3-9', titulo:'El árbol de los deseos',
      narrador:'El árbol tiene 8 ramas y cada rama tiene 8 deseos colgados. ¿Cuántos deseos hay?',
      pregunta:{ tipo:'problema', enunciado:'8 ramas × 8 deseos = ?', respuesta:64, opciones:[64,56,72,48] }
    },
    { id:'3-10', titulo:'La página del Bosque',
      narrador:'Último enigma del bosque. Divide 81 estrellas entre 9 hadas.',
      pregunta:{ tipo:'division', enunciado:'81 ÷ 9 = ?', respuesta:9, opciones:[9,7,8,10] }
    },
  ],
  4: [ // Galaxia Estelar — Nivel 4: razonamiento inverso + doble paso
    { id:'4-1', titulo:'Los planetas perdidos',
      narrador:'Hay 7 planetas y cada uno tiene 8 lunas. ¿Cuántas lunas hay en total?',
      pregunta:{ tipo:'problema', enunciado:'7 planetas × 8 lunas = ?', respuesta:56, opciones:[56,48,63,54] }
    },
    { id:'4-2', titulo:'La constelación borrada',
      narrador:'Una constelación tenía 63 estrellas en 9 grupos iguales. ¿Cuántas por grupo?',
      pregunta:{ tipo:'division', enunciado:'63 ÷ 9 = ?', respuesta:7, opciones:[7,6,8,9] }
    },
    { id:'4-3', titulo:'El mapa estelar',
      narrador:'Falta un número en el mapa de la galaxia. Encuéntralo.',
      pregunta:{ tipo:'factor', enunciado:'__ × 9 = 72', respuesta:8 }
    },
    { id:'4-4', titulo:'Los astronautas',
      narrador:'Hay 6 naves con 9 astronautas cada una. Luego 12 bajan en la luna. ¿Cuántos quedan volando?',
      pregunta:{ tipo:'problema', enunciado:'(6×9) − 12 = ?', respuesta:42, opciones:[42,44,40,48] }
    },
    { id:'4-5', titulo:'Los meteoritos',
      narrador:'Cayeron 48 meteoritos en 8 planetas iguales. ¿Cuántos por planeta?',
      pregunta:{ tipo:'division', enunciado:'48 ÷ 8 = ?', respuesta:6, opciones:[6,5,7,8] }
    },
    { id:'4-6', titulo:'Las galaxias gemelas',
      narrador:'Dos galaxias con 9 × 9 estrellas cada una. ¿Cuántas en total?',
      pregunta:{ tipo:'problema', enunciado:'2 × (9×9) = ?', respuesta:162, opciones:[162,144,180,150] }
    },
    { id:'4-7', titulo:'El agujero negro',
      narrador:'El agujero negro absorbió varios grupos de 7 estrellas. En total absorbió 56. ¿Cuántos grupos?',
      pregunta:{ tipo:'factor', enunciado:'__ × 7 = 56', respuesta:8 }
    },
    { id:'4-8', titulo:'Los cometas',
      narrador:'Pasan 90 cometas en 10 noches. ¿Cuántos cometas por noche?',
      pregunta:{ tipo:'division', enunciado:'90 ÷ 10 = ?', respuesta:9, opciones:[9,8,10,7] }
    },
    { id:'4-9', titulo:'La nebulosa de colores',
      narrador:'La nebulosa tiene 6 capas y cada capa brilla con 8 colores. ¿Cuántos colores en total?',
      pregunta:{ tipo:'problema', enunciado:'6 × 8 = ?', respuesta:48, opciones:[48,42,56,54] }
    },
    { id:'4-10', titulo:'La página de la Galaxia',
      narrador:'Último enigma galáctico. La estrella guía multiplica 9 por 8.',
      pregunta:{ tipo:'problema', enunciado:'9 × 8 = ?', respuesta:72, opciones:[72,63,81,64] }
    },
  ],
  5: [ // Gran Reino de Cristal — Nivel 5: fluidez + batalla final
    { id:'5-1', titulo:'Las puertas del Reino',
      narrador:'Las puertas tienen 7 filas de 9 diamantes cada una. Escribe el total.',
      pregunta:{ tipo:'escribe', enunciado:'7 × 9 = ?', respuesta:63 }
    },
    { id:'5-2', titulo:'El trono de cristal',
      narrador:'El trono tiene 8 lados y cada lado brilla con 8 gemas. ¿Cuántas gemas hay?',
      pregunta:{ tipo:'escribe', enunciado:'8 × 8 = ?', respuesta:64 }
    },
    { id:'5-3', titulo:'La armadura mágica',
      narrador:'Falta el número secreto para abrir la armadura.',
      pregunta:{ tipo:'factor', enunciado:'__ × 8 = 72', respuesta:9 }
    },
    { id:'5-4', titulo:'Los guardias del reino',
      narrador:'Hay 6 torres con 9 guardias cada una. Luego llegan 9 más a cada torre. ¿Cuántos guardias hay en total?',
      pregunta:{ tipo:'problema', enunciado:'6 × (9+9) = ?', respuesta:108, opciones:[108,99,117,96] }
    },
    { id:'5-5', titulo:'El espejo del tiempo',
      narrador:'El espejo divide 99 recuerdos en 9 grupos iguales. ¿Cuántos por grupo?',
      pregunta:{ tipo:'division', enunciado:'99 ÷ 9 = ?', respuesta:11, opciones:[11,9,10,12] }
    },
    { id:'5-6', titulo:'La biblioteca mágica',
      narrador:'Hay 10 estanterías con 10 libros mágicos cada una. ¿Cuántos libros hay?',
      pregunta:{ tipo:'escribe', enunciado:'10 × 10 = ?', respuesta:100 }
    },
    { id:'5-7', titulo:'El dragón de cristal',
      narrador:'El dragón tiene varios grupos de 9 escamas y en total tiene 81. ¿Cuántos grupos?',
      pregunta:{ tipo:'factor', enunciado:'__ × 9 = 81', respuesta:9 }
    },
    { id:'5-8', titulo:'El río de luz',
      narrador:'El río se divide en 7 brazos y por cada brazo pasan 8 barcos de luz. ¿Cuántos barcos en total?',
      pregunta:{ tipo:'escribe', enunciado:'7 × 8 = ?', respuesta:56 }
    },
    { id:'5-9', titulo:'La bóveda estrellada',
      narrador:'La bóveda tiene 9 arcos y cada arco tiene 9 joyas brillantes. ¿Cuántas joyas?',
      pregunta:{ tipo:'escribe', enunciado:'9 × 9 = ?', respuesta:81 }
    },
    { id:'5-10', titulo:'El Libro Restaurado — Batalla Final',
      narrador:'Cecilia, este es el enigma final. Si lo resuelves, la Bruja del Olvido desaparecerá para siempre.',
      pregunta:{ tipo:'escribe', enunciado:'8 × 9 + 8 = ?', respuesta:80 }
    },
  ],
};
