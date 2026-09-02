/* Sinek Tuzağı Kontrol — servis çalışanı
   Uygulama dosyalarını önbelleğe alır (çevrimdışı açılır),
   Firebase ve diğer veri isteklerine karışmaz. */
const SURUM = "sineklik-v1";
const DOSYALAR = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(DOSYALAR).catch(()=>{})).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k =>
    Promise.all(k.filter(x => x !== SURUM).map(x => caches.delete(x)))).then(()=>self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const u = e.request.url;
  // veri istekleri her zaman ağdan: firebase, kimlik doğrulama
  if (u.includes("firebaseio.com") || u.includes("googleapis.com")) return;
  if (e.request.method !== "GET") return;

  // uygulama dosyaları: önce ağ, olmazsa önbellek (yeni sürüm hemen gelsin)
  e.respondWith(
    fetch(e.request).then(y => {
      const kopya = y.clone();
      caches.open(SURUM).then(c => c.put(e.request, kopya)).catch(()=>{});
      return y;
    }).catch(() => caches.match(e.request).then(y => y || caches.match("./index.html")))
  );
});
