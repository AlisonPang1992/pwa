self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('manifest-store').then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/icons/icon_144x144.png',
        '/icons/icon_152x152.png',
        '/icons/icon_192x192.png',
        '/icons/icon_512x512.png',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
  