console.log('Loaded service worker!');

self.skipWaiting();

self.addEventListener('push', ev => {
  const data = ev.data.json();
  self.console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data
  });
});
self.addEventListener('notificationclick', function(event) {
  self.console.log('[Service Worker] Notification click Received.', event);

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});