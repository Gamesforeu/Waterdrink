const CACHE_NAME = 'h2o-glow-pro-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// Installation cycle processing caching core
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS))
        .then(() => self.skipWaiting())
    );
});

// Resource activation cleaner interceptor routines
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch events interception mapping pipeline strategies
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            return cachedResponse || fetch(e.request).catch(() => {
                return caches.match('./index.html');
            });
        })
    );
});
