const staticAssets = [
    './',
    './main.css',
    './assets/fallback.json',
    './assets/images/fetch-dog.jpeg'
]
self.addEventListener('install', async event => {
    const cache = await caches.open('news-static')
    cache.addAll(staticAssets)
})

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url)

    if(url.origin === location.origin) {
        event.respondWith(cacheFirst(req))    
    } else {
        event.respondWith(networkFirt(req))
    }
    
})

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req)
    return cachedResponse || fetch(req)
}

async function networkFirt(req) {
    const cache = await caches.open('news-dynamic')

    try {
        const res = await fetch(req)
        cache.put(req, res.clone())
        return res
    } catch(err) {
        const cachedResponse =  await cache.match(req)
        console.log(cachedResponse)
        return cachedResponse || await caches.match('./assets/fallback.json')
    }
}