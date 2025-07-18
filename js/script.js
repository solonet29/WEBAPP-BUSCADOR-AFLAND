const CACHE_NAME = 'pwa-clon-afland-v2'; // He subido la versión para forzar la actualización

const urlsToCache = [
  // Archivos principales
  './',
  './index.html',
  './manifest.json',
  './script.json',
  
  // Archivo JavaScript
  './js/script.js',

  // Imágenes y logos
  './img/icon-192x192.png',
  './img/icon-512x512.png',
  './img/icono-buscador.jpg',
  './img/favicon.png', // Asegúrate de tener este archivo en la carpeta img

  // Archivos externos (CDNs)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados para modo offline');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Devuelve desde caché o va a la red si no lo encuentra
      return res || fetch(e.request);
    })
  );
});