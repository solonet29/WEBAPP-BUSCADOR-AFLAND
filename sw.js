const CACHE_NAME = 'pwa-clon-afland-v1';

const urlsToCache = [
  './',
  './index.html',
  './js/script.js',
  './script.json',
  './manifest.json',
  './img/logo-afland-pro.png',
  './img/favicon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});