//funcion para transladar la cabecera
const inputClick = () => {
  let contain = document.getElementById("idContain");
  contain.style.transform = "translateY(-280px)";
  contain.style.transition = "all .5s ease-in-out";
};

//funcion para buscar GIPHY
const searchWord = () =>{
  const inputValue = document.getElementById("inpSearch").value;

  //CONEXION API
const API = "api.giphy.com/v1/gifs/trending?api_key=gxl1NFEAMYKBNA4MLrvYo1zXZjYuYDik&limit=20";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const gifs = await fetchData(API);
    let view = `
    ${gif.items
      .map(
        (gi) => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
    `
      )
      .slice(0, 4)
      .join("")}; 
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
}
