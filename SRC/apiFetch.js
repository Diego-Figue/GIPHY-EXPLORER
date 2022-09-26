import { ContentGifs, inputValue } from "./nodes.js";
import { getItemDefault, setItem } from "./localStorage.js";


const API = "https://api.giphy.com/v1/gifs/";
const API_KEY = "?api_key=gxl1NFEAMYKBNA4MLrvYo1zXZjYuYDik";

//observador
let observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entradas => {
        if (entradas.isIntersecting) {
            const test = trendingGifs();
            console.log(test);
            // const newGifs = ContentGifs.append = trendingGifs();
            // console.log(newGifs);
            // ContentGifs.style.background = "red";
            // return newGifs;
        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});

//endpoint trending
export async function trendingGifs() {
    try {
        let response = await fetch(`${API}trending${API_KEY}&limit=10`);
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

        //obtener ultimo gift
        const gifsInView = document.querySelectorAll('.contentG .contentG__containImg');
        const latestGif = gifsInView[gifsInView.length - 1];

        observador.observe(latestGif);


    } catch (error) {
        console.log(error);
    }
}

//endpoint Buscar

export async function searchGif() {

    if (!inputValue.value) {
        ContentGifs.innerHTML = '<h1 class="text_null">Ingresa una palabra!!!😉</h1>';
    } else {
        setItem();
        getItemDefault();
        try {
            let response = await fetch(`${API}search${API_KEY}&q=${inputValue.value}&limit=10`);
            let { data } = await response.json();

            if (data.length == 0) {
                ContentGifs.innerHTML = '<h1 class="text_noFound">Lo sentimos, no hemos encotrado tu busqueda. 😞</h1>';
                return
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
}
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

//funcion handlle click search

export const handleClickSearch = (image) => {
    inputValue.value = image;
    searchGif();
}

//template GifsOld
export const entryOldSearch = (image) => {
    const paragrapth = document.createElement('p');
    paragrapth.addEventListener('click', () => handleClickSearch(image));
    paragrapth.textContent = image;
    paragrapth.className = 'contain__searchOldText';
    return paragrapth;
};

