self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed');
});

// activate event
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] actived');
});

// fetch event
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource');
});
