const staticDevRecipes = "pwa-recipes";
const assets = [
  "/",
  "/index.html",
  "/recipe.html",
  "/css/main.css",
  "/css/recipe.css",
  "/css/style.css",
  "/scripts/recipe.js",
  "/images/background.png",
  "/images/burn.svg",
  "/images/chef.svg",
  "/images/clock.svg",
  "/images/cook.png",
  "/images/dish.svg",
  "/images/heart.svg",
  "/images/menu.svg",
  "/images/recipe_02.webp",
  "/images/recipe_03.webp",
  "/images/recipe_04.webp",
  "/images/recipe_05.webp"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevRecipes).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});