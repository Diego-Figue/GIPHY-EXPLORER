import { ContentSearchold, inputValue } from "./nodes.js"
import { entryOldSearch } from "./apiFetch.js";
//recuoerar local storatge
export const getItem = () => {
    const valueLS = JSON.parse(localStorage.getItem('search'));
    if (valueLS == null) {
        return [];
    } else {
        return valueLS;
    }
}

//template oldSearch

const oldSearch = (response) => {
    if (response == undefined) {
        return
    } else {
        return response.map((response) => entryOldSearch(response));
    }
};

//envio texto para pintar las busquedas recientes
export const getItemDefault = () => {
    const response = getItem();
    ContentSearchold.innerHTML = "";
    ContentSearchold.append(...oldSearch(response));
    // ContentSearchold.innerHTML = oldSearch(response).join("");

    ;
}
//guardar info local storage

export const setItem = () => {
    const responseGetItem = getItem();
    if (responseGetItem.length >= 3) {
        responseGetItem.pop();
    }
    responseGetItem.unshift(inputValue.value);
    localStorage.setItem('search', JSON.stringify(responseGetItem));
}
