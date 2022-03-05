const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened chashe");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => Cache.match("offline.html"));
    })
  );
});
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then((cn) =>
      Promise.all(
        cn.map((cn) => {
          if (!cacheWhitelist.includes(cn)) {
            return caches.delete(cn);
          }
        })
      )
    )
  );
});
