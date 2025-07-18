// sw.js - VERSIÓN CORREGIDA
const CACHE_NAME = 'pwa-clon-afland-v5'; // Nueva versión para forzar la actualización

const urlsToCache = [
  // Archivos principales
  './',
  './index.html',
  './manifest.json',
  './script.json',
  
  // Se ha ELIMINADO './js/script.js' de esta lista

  // Imágenes
  './img/logo.png',
  './img/favicon.png',
  './img/icon-192x192.png',
  './img/icon-512x512.png',

  // Archivos externos
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js'
];

// ... el resto del código del service worker sigue igual ...
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(cN=>Promise.all(cN.map(c=>{if(c!==CACHE_NAME)return caches.delete(c)}))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});