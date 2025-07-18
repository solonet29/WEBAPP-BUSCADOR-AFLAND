const CACHE_NAME = 'pwa-clon-afland-v3'; // Subo la versión para forzar actualización

const urlsToCache = [
  // Archivos principales
  './',
  './index.html',
  './manifest.json',
  './script.json',
  
  // Archivo JavaScript
  './js/script.js',

  // Lista de imágenes definitiva y consistente
  './img/logo.png',
  './img/favicon.png',
  './img/icon-192x192.png',
  './img/icon-512x512.png',

  // Archivos externos (CDNs)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js'
];

// ... el resto del código del service worker sigue igual ...