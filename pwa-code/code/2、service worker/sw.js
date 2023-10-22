self.addEventListener('install', ev => {
    console.log('install', ev)
    // skipWaiting会让service worker 跳过等待，直接进入到active的状态
    // event.waitUntil会等待skipWaiting结束，才进入到active
    // ev.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', ev => {
    console.log('activate', ev)
    
    // 表示service worker激活后，立即获取控制权
    // ev.waitUntil(self.clients.claim())
})

// fetch事件会在发请求的时候触发
self.addEventListener('fetch', ev => {
    console.log('fetch', ev)
})
console.log(4444)