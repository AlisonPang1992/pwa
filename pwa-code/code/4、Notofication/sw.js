setTimeout(() => {
    self.registration.showNotification('你好', {
        body: '我叫李雷，交个朋友吧',
        icon: 'https://gss0.baidu.com/9rkZbzqaKgQUohGko9WTAnF6hhy/assets/pwa/demo/pwa-icon.png',
        data: {
            time: new Date(Date.now()).toString(),
            url: 'https://www.baidu.com'
        }
    })
    // 监听通知点击事件
    self.addEventListener('notificationclick', function (e) {
        // 关闭通知
        e.notification.close()
        // 打开网页
        e.waitUntil(clients.openWindow(e.notification.data.url))
    })
}, 5000)
