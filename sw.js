const CACHE_NAME = 'temporizador-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/rsc/dim.mp3',  // Asegúrate de incluir todos los recursos necesarios para que la PWA funcione sin conexión.
  '/rsc/gong.wav',
  '/rsc/tibetan.wav',
  '/rsc/icon-192.png',
  '/rsc/icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;  // Si está en la caché, lo devuelve.
        }
        return fetch(event.request);  // Si no está, lo descarga.
      })
  );
});
