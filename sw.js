// Asignamos un nombre y versión al caché
const CACHE_NAME = 'webapp-buscador-afland-v1';

// Definimos la lista de archivos a cachear
// ¡Asegúrate de que estas rutas son correctas!
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/img/144.png',
  '/img/favicon.png'
  // Si tienes más imágenes o archivos, ¡añádelos aquí!
];

// Evento 'install': se ejecuta cuando el Service Worker se instala
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados exitosamente');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falló el cacheo de archivos', err);
      })
  );
});

// Evento 'activate': limpia cachés antiguos si el nombre del caché cambia
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antiguo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento 'fetch': intercepta las peticiones de red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        // Devuelve el recurso desde el caché si existe
        if (res) {
          return res;
        }
        // Si no está en caché, lo pide a la red
        return fetch(e.request);
      })
      .catch(err => {
        console.error('Error al hacer fetch', err);
      })
  );
});