const CACHE_NAME = 'your-cache-name';
const MANIFEST_URL = '/manifest.js';

self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  self.skipWaiting(); // Activate the new service worker immediately
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

async function checkForUpdate() {
  const response = await fetch(MANIFEST_URL);
  const manifest = await response.json();
  const currentVersion = manifest.version;

  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(MANIFEST_URL);
  if (cachedResponse) {
    const cachedManifest = await cachedResponse.json();
    const cachedVersion = cachedManifest.version;

    if (currentVersion !== cachedVersion) {
      console.log('New version available:', currentVersion);
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage('newVersion'));
      });
    }
  }

  await cache.put(MANIFEST_URL, response.clone());
}

self.addEventListener('activate', event => {
  event.waitUntil(checkForUpdate());
});