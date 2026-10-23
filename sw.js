// Retire the old template's offline cache so visitors receive the new site.
// Workbox names include this registration scope; never clear another site's caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('workbox-precache-') && name.includes(self.registration.scope)).map(name => caches.delete(name)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(client => { if (client.url.startsWith(self.registration.scope)) client.navigate(client.url); });
  })());
});
