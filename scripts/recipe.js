window.onload = init;

function init(){
    let recipeId = window.location.search.substring(1).split("=")[1];
    console.log(`recipe id = ${recipeId}`);
}