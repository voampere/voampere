const CACHE_NAME = 'va-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/theme.css',
  '/css/components.css',
  '/js/main.js',
  '/js/calculators.js',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon.png',
  '/assets/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
