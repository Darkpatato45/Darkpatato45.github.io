self.addEventListener('install', event => {
    console.log('Service Worker installé.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker activé.');
});

self.addEventListener('notificationclick', event => {
    console.log('Notification cliquée.');
    event.notification.close();
});

self.addEventListener('fetch', event => {
    // Placeholder pour gérer les requêtes réseau si nécessaire.
});
