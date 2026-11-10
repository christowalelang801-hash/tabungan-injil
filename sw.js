self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

// Handle Klik Tombol di Bilah Notifikasi Status Bar HP
self.addEventListener('notificationclick', (e) => {
    e.notification.close();

    // Kirim sinyal matikan alarm ke web
    e.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                client.postMessage({ action: 'stopAlarm' });
                if ('focus' in client) return client.focus();
            }
            if (self.clients.openWindow) return self.clients.openWindow('./');
        })
    );
});
