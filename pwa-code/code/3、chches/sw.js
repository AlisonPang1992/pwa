const CACHE_NAME = 'cache-v1'
// 主要在install事件中缓存内容
self.addEventListener('install', async ev => {
  // 开启一个cache
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll([
    '/',
    '/icons/icon_144x144.png',
    '/icons/icon_152x152.png',
    '/icons/icon_192x192.png',
    '/icons/icon_512x512.png',
  ])
  await self.skipWaiting()
})

// 一般用来清除旧的资源
self.addEventListener('activate', async ev => {
  const keys = await caches.keys()
  keys.forEach(key => {
    if (key !== CACHE_NAME) {
      caches.delete(key)
    }
  })
  await self.clients.claim()
})

self.addEventListener('fetch', ev => {
  const req = ev.request
  if (req.url.includes('https://')) {
    ev.respondWith(networkFirst(req))
  } else {
    ev.respondWith(cacheFirst(req))
  }
})

// 网络优先
const networkFirst = async (req) => {
  const cache = await caches.open(CACHE_NAME)
  try {
    const fresh = await fetch(req)
    // 把响应的备份存储到缓存中
    cache.put(req, fresh.clone())
    return fresh
  } catch(e) {
    // 去缓存中读取
    const cached = await cache.match(req)
    return cached
  }
}
// cache优先，一般适用于静态资源
const cacheFirst = async (req) => {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(req)
  if (cached) {
    return cached
  } else {
    const fresh = await fetch(req)
    cache.put(req, fresh.clone())
    return fresh
  }
}
