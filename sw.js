/* Service worker mínimo: permite instalar la app en el computador o el celular.
   Siempre busca primero la versión en línea; solo usa la copia guardada si no hay conexión.
   No toca Firebase ni Google. */
const CACHE = "davinci-soriano-v5";
const BASE = ["./", "./index.html", "./config.js", "./plataforma.js", "./manifest.webmanifest", "./iconos/ds-192.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  /* El PDF del reglamento y los JSON grandes no se guardan en la copia sin conexión. */
  const guardar = !/\.(pdf)$/i.test(url.pathname);
  e.respondWith(fetch(req, { cache: "no-cache" }).then((res) => {
    if (guardar && res && res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {}); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"))));
});
