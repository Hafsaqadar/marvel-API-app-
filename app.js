const timestamp = new Date().getTime().toString();
const apiKey = "5b27c9a95b4f9aace5956657d4396f3a";
const privateKey = "70eddc2fcf7e3732f6e7bede52a590fad667bae2";

const hashValue = CryptoJS.MD5(timestamp + privateKey + apiKey).toString();

const input = document.getElementById('input-box');
const button = document.getElementById('submit-button');
const showContainer = document.getElementById('show-container');
const listContainer = document.querySelector('.list');

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements(){
    listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async() =>{
        removeElements();
        if(input.value.length < 4) {
            return;
        }

        showContainer.innerHTML = '<p style="color: green;">Loading...</p>';

        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}&limit=5`;
        const response = await fetch(url);
        const jsonData = await response.json();
        showContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();

        jsonData.data.results.forEach((result) => {
            let name = result.name;
            let div = document.createElement('div');
            div.style.cursor = "pointer";
            div.classList.add('autocomplete-items');
            div.setAttribute("onclick", `displayWords('${name}')`);
            let word = `<b>${name.substr(0, input.value.length)}</b>${name.substr(input.value.length)}`;
            div.innerHTML = `<p class="item">${word}</p>`;

            fragment.appendChild(div);
            listContainer.appendChild(fragment);
        });
    }, 200);
});

button.addEventListener("click", async () => {
    if(input.value.trim().length < 1) {
        alert("Input cannot be empty");
        return;
    }

    showContainer.innerHTML = '<p>Loading...</p>';
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}&limit=5`;
    const response = await fetch(url);
    const jsonData = await response.json();
    
    showContainer.innerHTML = ''; // Clear the loading text

    jsonData.data.results.forEach((element) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('container-character-image');
        const img = document.createElement('img');
        img.src = `${element.thumbnail.path}.${element.thumbnail.extension}`;
        img.alt = element.name;
        imgContainer.appendChild(img);

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('character-name');
        nameDiv.textContent = element.name;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('character-description');
        descriptionDiv.textContent = element.description || 'No description available';

        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(nameDiv);
        cardContainer.appendChild(descriptionDiv);

        showContainer.appendChild(cardContainer);
    });
});





























































































































































// const timestamp = new Date().getTime().toString();
// const apiKey = "5b27c9a95b4f9aace5956657d4396f3a";
// const privateKey = "70eddc2fcf7e3732f6e7bede52a590fad667bae2";

// const hashValue = CryptoJS.MD5(timestamp + privateKey + apiKey).toString();

// const input = document.getElementById('input-box');
// const button = document.getElementById('submit-button');
// const showContainer = document.getElementById('show-container');
// const listContainer = document.querySelector('.list');

// function displayWords(value) {
//     input.value = value;
//     removeElements();
// }

// function removeElements(){
//     listContainer.innerHTML = "";
// }

// input.addEventListener("keyup", async () => {
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(async() =>{
//     removeElements();
//     if(input.value.length < 4) {
//         return;
//     }

//     showContainer.innerHTML = '<p>loading..............</P>';

    
    

//     const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}&limit=5`;
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     showContainer.innerHTML = '';

//     const fragment = document.createDocumentFragment();

//     jsonData.data.results.forEach((result) => {
//         let name = result.name;
//         let div = document.createElement('div');
//         div.style.cursor = "pointer";
//         div.classList.add('autocompleate-items');
//         div.setAttribute("onclick", `displayWords('${name}')`);
//         let word = `<b>${name.substr(0, input.value.length)}</b>${name.substr(input.value.length)}`;
//         div.innerHTML = `<p class="item">${word}</p>`;

//         fragment.appendChild(div);
//         listContainer.appendChild(fragment);
//     });
// }, 200);
// });
// button.addEventListener("click", async () => {
//     if(input.value.trim().length < 1) {
//         alert("Input cannot be empty");
//         return;
//     }

//     showContainer.innerHTML = "";
//     const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}&limit=5`;
//     const response = await fetch(url);
//     const jsonData = await response.json();
   

//     jsonData.data.results.forEach((element) => {
//         showContainer.innerHTML = 
//        `<div class="card-container">
//             <div class="container-character-image">
//             <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}"/>
//             </div>
//             <div class="character-name">${element.name}</div>
//             <div class="character-description">${element.description}</div>
//         </div>`;
//     });
// });





























































































































































