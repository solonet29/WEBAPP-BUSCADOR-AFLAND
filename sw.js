const CACHE_NAME = 'webapp-buscador-afland-v5';

// Lista de archivos a cachear con rutas relativas
const urlsToCache = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  './icono-buscador.jpg'
];

// Evento 'install': se ejecuta cuando el Service Worker se instala
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché y guardando archivos nuevos');
        // Cacheamos recursos externos para un mejor modo offline
        cache.add("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");
        cache.add("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Falló el cacheo de archivos', err);
      })
  );
});

// Evento 'activate': limpia cachés antiguos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', cacheName);
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
        // Devuelve desde el caché si existe, si no, va a la red
        return res || fetch(e.request);
      })
      .catch(err => {
        console.error('Error al hacer fetch:', err);
      })
  );
});