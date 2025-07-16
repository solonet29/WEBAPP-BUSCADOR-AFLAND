// Nombre de la caché para nuestra PWA
const CACHE_NAME = 'duende-finder-v1';

// Archivos que se guardarán en caché durante la instalación.
// Tu HTML, CSS y JS están en el mismo archivo, por lo que solo necesitamos cachear el archivo principal y el icono.
const urlsToCache = [
  '/',
  '/index.html',
  '/icono-buscador.jpg'
];

// Evento 'install': se dispara cuando el Service Worker se instala.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta y archivos principales guardados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara para cada petición.
// Intenta servir desde la caché primero, si no puede, va a la red.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devolvemos
        if (response) {
          return response;
        }
        // Si no, lo pedimos a la red
        return fetch(event.request);
      })
  );
});