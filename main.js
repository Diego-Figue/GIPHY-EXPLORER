//imports 
import { getItemDefault } from "./SRC/localStorage.js";
import { BtnSearch, logoGiphy } from "./SRC/nodes.js";
import { trendingGifs, searchGif } from "./SRC/apiFetch.js";

//eventos click
logoGiphy.addEventListener('click', () => {
  trendingGifs();
});

BtnSearch.addEventListener('click', () => {
  searchGif();
})

//lama la funcion apenas cargue la pagina
window.addEventListener("load", () => trendingGifs());
window.addEventListener("load", () => getItemDefault());

