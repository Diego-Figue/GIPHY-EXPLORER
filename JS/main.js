const API = "https://api.giphy.com/v1/gifs/";
const API_KEY = "?api_key=gxl1NFEAMYKBNA4MLrvYo1zXZjYuYDik";
const ContentGifs = document.getElementById("contentGifs");
const ContentSearchold = document.getElementById("searchOldDiv");
const inputValue = document.getElementById("inpSearch");

//template Gifs
const entryImage = (image) => {
  return `
  <div class="contentG__containImg">
    <div class="contentG__header">
      <h1 class="contentG_title">${image.title}</h1>
    </div>
    <img src="${image.url}" class="contentG__img"/>
  </div>
  `;
};
//template GifsOld
const entryOldSearch = (image) => {
  return `
    <p onClick="searchGif()" class="contain__searchOldText">${image}</p>
  `
};

//template oldSearch

const oldSearch = (response) => {
  return response.map((oldS) => entryOldSearch(oldS));
};

//endpoint trending
async function trendingGifs() {
  try {
    let response = await fetch(`${API}trending${API_KEY}&limit=10`);
    console.log(`This the response of petition `, response);
    let { data } = await response.json();

    //extraemos el titulo , la url y el user de los gifs
    let urlImage = data.map((image) => {
      return {
        url: image.images.original.webp,
        title: image.title,
      };
    });

    const view = urlImage.map((img) => entryImage(img));

    ContentGifs.innerHTML = view.join(""); //unimos los objetos
  } catch (error) {
    console.log(error);
  }
}


//guardar info local storage

const getItem = () => {
  return JSON.parse(localStorage.getItem('search'));
}

const getItemDefault = () => {
  const response = getItem();
  ContentSearchold.innerHTML = oldSearch(response);
  ;
}

const setItem = () => {
  const responseGetItem = getItem();
  if (responseGetItem.length == 3) {
    responseGetItem.pop();
  }
  responseGetItem.unshift(inputValue.value);
  console.log(responseGetItem);

  localStorage.setItem('search', JSON.stringify(responseGetItem));

}

//recuoerar local storatge


//endpoint Buscar

async function searchGif() {
  setItem();
  getItemDefault();

  if (!inputValue.value) {
    return trendingGifs();
  }
  console.log(inputValue.value);

  try {
    let response = await fetch(`${API}search${API_KEY}&q=${inputValue.value}&limit=10`);
    console.log(`This the response of petition SEARCH`, response);
    let { data } = await response.json();

    if (data.length == 0) {
      console.log('no found');
    }

    let search = data.map((image) => {
      return {
        url: image.images.original.webp,
        title: image.title,
      };
    });
    const view = search.map((img) => entryImage(img));

    ContentGifs.innerHTML = view.join("");
  } catch (error) {
    console.log(error);
  }
}

//lama la funcion apenas cargue la pagina
window.addEventListener("load", () => trendingGifs());
window.addEventListener("load", () => getItemDefault());
