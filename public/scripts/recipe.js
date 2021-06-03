if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("Service worker registered"))
      .catch((err) => console.log("Service worker not registered", err));
  });
}

window.onload = init;

function init() {
  //извлечь id рецепта из URL
  let recipeId = window.location.search.substring(1).split("=")[1];

  //найти нужный рецепт
  let recipe = getRecipeById(recipeId);

  //вставить сведения о рецепте на страницу
  bindRecipe(recipe);
}

function getRecipeById(id) {
  //В качестве примера вручную добавлены несколько рецептов.
  //На практике сведения о рецептах должны извлекаться из базы данных
  const recipe1 = {
    id: 1,
    name: "Курица с печеными овощами",
    tags: ["Популярные", "Для духовки", "Из курицы"],
    imageUrl: "./images/recipe_04.webp",
    stats: { values: [50, 150, 4], labels: ["минут", "ккал", "порции"] },
    ingredients: [
      "Куриные ножки, 400 г",
      "Картофель, 300 г",
      "Морковь, 1 шт",
      "Лук репчатый, 1 шт",
      "Брокколи, 1 шт",
      "Масло растительное, 2 ст.л.",
      "Приправы, по вкусу",
    ],
    cooking: [
      `Очистите овощи, нарежьте картофель средними кусочками, морковь - кружочками, лук - полукольцами. Не нужно
                слишком измельчать овощи, они должны сохранить форму и сочность при запекании.`,
      `Курицу разрежьте на порционные куски, выложите на противень. Овощи разложите равномерно вокруг курицы.
                Добавьте специи по вкусу, полейте растительным маслом (1-2 ст.л.). Поставьте курицу с овощами в
                духовку на 40-45 минут при температуре 180 градусов. В процессе приготовления пару раз полейте курицу и
                овощи выделившимся соком.`,
    ],
  };

  const recipe2 = {
    id: 2,
    name: "Тыквенный суп-пюре",
    tags: ["Популярные", "Супы", "Вегетерианское"],
    imageUrl: "./images/recipe_02.webp",
    stats: { values: [20, 70, 4], labels: ["минут", "ккал", "порции"] },
    ingredients: [
      "Тыква, 400 г",
      "Лук репчатый, 1 шт",
      "Чеснок, 1 зубчик",
      "Сливки 10%, 100 мл",
      "Масло растительное, 2 ст.л.",
      "Соль, по вкусу",
    ],
    cooking: [
      `Разогрейте в кастрюле растительное масло. Обжарьте измельченные лук и чеснок до мягкости.`,
      `Тыкву мелко порежьте, добавьте к луку, обжаривайте 2–3 минуты. Добавьте воду, посолите. 
                Варить на среднем огне 10 минут до мягкости тыквы. Измельчите суп в блендере до однородного состояния, 
                влейте сливки. Снова поставьте на огонь и доведите до кипения.`,
      `Разлейте по тарелкам, украсьте тыквенными семечками.`,
    ],
  };

  const recipe3 = {
    id: 3,
    name: "Рисовые макароны с креветками",
    tags: ["Популярные", "Морепродукты"],
    imageUrl: "./images/recipe_03.webp",
    stats: { values: [30, 100, 5], labels: ["минут", "ккал", "порций"] },
    ingredients: [
      "Рисовая лапша, 250 г",
      "Креветки, 750 г",
      "Морковь, 1 шт",
      "Лук репчатый, 1 шт",
      "Баклажаны, 300 г",
      "Болгарский перец, 200 г",
      "Масло растительное, 8 ст.л.",
      "Приправы, по вкусу",
    ],
    cooking: [
      `Довести воду до кипения и посолить. Рисовую лапшу варить в течение 3-4 минут – согласно инструкции на упаковке.`,
      `Подготовить овощной набор – очистить морковь, лук, болгарский перец. Все овощи нарезать небольшими по размеру кусочками.`,
      `Нарезать баклажан небольшими полосками, почистить креветки.`,
      `Прогреть сковороду, влить растительное масло и выложить все овощи. Жарить 3-4 минуты. После этого добавить креветки. Жарить на слабом огне еще 4-5 минут.`,
      `Переложить в сковороду к овощам и креветкам рисовую лапшу. Добавить соевый соус, специи по вкусу.`,
      `Перемешать все компоненты и выложить лапшу в тарелку. Все, подавать к столу.`,
    ],
  };

  const recipe4 = {
    id: 4,
    name: "Суп харчо",
    tags: ["Популярные", "Супы"],
    imageUrl: "./images/recipe_05.webp",
    stats: { values: [90, 120, 6], labels: ["минут", "ккал", "порций"] },
    ingredients: [
      "Говядина, 1 кг",
      "Рис, 120 г",
      "Томатная паста, 2 ст.л.",
      "Лук репчатый, 3 шт",
      "Мука, 1 ст.л.",
      "Грецкий орех, 50 г",
      "Чеснок, 5 зубчиков",
      "Гранатовый сок без сахара, 125 мл",
      "Масло растительное, 2 ст.л.",
      "Лавровый лист, 1 шт",
      "Корень петрушки, 1 шт",
      "Базилик, 4 шт",
      "Приправы, по вкусу",
    ],
    cooking: [
      `Говядину нарежьте маленькими кусочками, положите в кастрюлю, залейте 8-10 стаканами холодной воды и поставьте 
                мясо вариться до полуготовности (около 40 минут). При закипании снимите пену.`,
      `Лук очистите и нарежьте кубиками. Выложите лук в бульон. 
                Рис промойте и добавьте в кастрюлю с супом. Варите 20 минут.`,
      `Через 20 минут добавьте половину зелени, соль и перец.`,
      `Грецкие орехи измельчите в блендере и всыпьте в суп. Готовьте 5 минут. Добавьте в харчо хмели-сунели и гранатовый сок. Варите на слабом огне 5 минут.`,
      `Кастрюлю с харчо снимите с огня. Добавьте смесь чеснока, зелени и острого перца. Кастрюлю закройте и укутайте большим полотенцем. Оставьте на 10 минут, затем разлейте по тарелкам.`,
    ],
  };

  const recipes = [];
  recipes.push(recipe1);
  recipes.push(recipe2);
  recipes.push(recipe3);
  recipes.push(recipe4);

  //найти и вернуть рецепт с требуемым id
  return recipes.find((element) => {
    return element.id == id;
  });
}

function bindRecipe(recipe) {
  bindName(recipe.name);
  bindTags(recipe.tags);
  bindImage(recipe.imageUrl, recipe.name);
  bindStats(recipe.stats);
  bindIngredients(recipe.ingredients);
  bindCookingInfo(recipe.cooking);
}

function bindName(name) {
  document.title = name;
  let header1 = document.getElementsByClassName("recipe-title")[0];
  header1.innerHTML = name;
}

function bindTags(tags) {
  //Найти на странице div с классом "tags"
  let tagsDiv = document.getElementsByClassName("tags")[0];

  for (let i = 0; i < tags.length; i++) {
    //Программно создать HTML-элемент <p>
    let taskP = document.createElement("p");

    //Вставить содержимое элемента <p>
    taskP.innerHTML = tags[i];

    //Поместить элемент <p> внутрь div-контейнера
    tagsDiv.appendChild(taskP);
  }
}

function bindImage(imageUrl, name) {
  //Найти на странице img с классом "recipe-img-big"
  let recipeImg = document.getElementsByClassName("recipe-img-big")[0];

  //Программно задать элементу img атрибуты src и alt
  recipeImg.src = imageUrl;
  recipeImg.alt = name;
}

function bindStats(stats) {
  let statsDiv = document.getElementsByClassName("recipe-info")[0];
  const statIcons = [
    "./images/clock.svg",
    "./images/burn.svg",
    "./images/dish.svg",
  ];
  const statAlts = ["Время приготовления", "Калории", "Количество порций"];

  for (let i = 0; i < stats.values.length; i++) {
    let statDiv = document.createElement("div");
    statDiv.setAttribute("class", "recipe-stat");

    let statIcon = document.createElement("img");
    statIcon.src = statIcons[i];
    statIcon.alt = statAlts[i];

    let statP = document.createElement("p");
    statP.innerHTML = `<span>${stats.values[i]}</span> ${stats.labels[i]}`;

    statDiv.appendChild(statIcon);
    statDiv.appendChild(statP);
    statsDiv.appendChild(statDiv);
  }
}

function bindIngredients(ingredients) {
  let ingrList = document.getElementsByClassName("ingredient-list")[0];

  for (let i = 0; i < ingredients.length; i++) {
    let ingrLi = document.createElement("li");
    ingrLi.innerHTML = ingredients[i];
    ingrList.appendChild(ingrLi);
  }
}

function bindCookingInfo(cooking) {
  let cookingSection = document.getElementsByClassName("cooking")[0];

  for (let i = 0; i < cooking.length; i++) {
    let cookP = document.createElement("p");
    cookP.innerHTML = cooking[i];
    cookingSection.appendChild(cookP);
  }
}
