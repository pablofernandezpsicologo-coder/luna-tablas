const CACHE = 'luna-v3';
const ASSETS = ['./', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png',
  './css/base.css', './css/kawaii.css', './css/animations.css',
  './js/app.js', './js/storage.js', './js/engine.js',
  './js/audio.js', './js/canvas/utils.js', './js/canvas/characters.js',
  './js/canvas/scenes.js', './js/canvas/particles.js',
  './screens/intro.js', './screens/mapa.js', './screens/nivel.js',
  './screens/escena.js', './screens/practica.js', './screens/jefe.js',
  './screens/resultado.js', './data/historia.js'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS))
));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));
