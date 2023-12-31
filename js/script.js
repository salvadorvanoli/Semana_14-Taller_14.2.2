const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let searchBar = document.getElementById("inputBuscar");
let searchBtn = document.getElementById("btnBuscar");
let fetchData = undefined;
let lista = document.getElementById("lista");
let cardDiv = document.getElementsByClassName("card");

// Transforma un float del 1 al 10 en una cantidad de estrellas redondeada de 1 a 5

function transformToStars(number){
    let stars = "";
    let numberToOdd = Math.trunc(number);
    if(numberToOdd % 2 != 0){
        numberToOdd++;
    }
    for(let i = 0; i < (numberToOdd/2); i++){
        stars += `<span class="fa fa-star checked"></span>`;
    }
    for(let i = 0; i < (5 - (numberToOdd/2)); i++){
        stars += `<span class="fa fa-star"></span>`;
    }
    return stars;
}

// Dado un id, busca en la data del fetch una película coincidente

function findMovieById(idP){
    let movie = fetchData.find(element => {
        return element.id == idP;
    })
    return movie;
}

// Crea un string con los géneros de una película

function getGenres(movie){
    let genresString = "";
    for(let genre of movie.genres){
        genresString += " / " + genre.name;
    }
    return genresString;
}

// Cambia los valores del offcanvas a los de la película que se clickeó

function deployOffcanvas(idP){
    let movie = findMovieById(idP);
    let offcanvasTopLabel = document.getElementById("offcanvasTopLabel");
    let offcanvasOverview = document.getElementById("offcanvasOverview");
    let offcanvasGenres = document.getElementById("offcanvasGenres");
    let dropdownYear = document.getElementById("dropdownYear");
    let dropdownLength = document.getElementById("dropdownLength");
    let dropdownBudget = document.getElementById("dropdownBudget");
    let dropdownEarnings = document.getElementById("dropdownEarnings");
    offcanvasTopLabel.innerHTML = movie.title;
    offcanvasOverview.innerHTML = movie.overview;
    offcanvasGenres.innerHTML = getGenres(movie);
    dropdownYear.innerHTML = "Release date: " + movie.release_date;
    dropdownLength.innerHTML = "Duration: " + movie.runtime + " mins";
    dropdownBudget.innerHTML = "Budget: $" + movie.budget;
    dropdownEarnings.innerHTML = "Revenue: $" + movie.revenue;
}

// Crea un div que contiene los datos de una película

function createMovieElement(movie){
    let newElement = 
    `<div class="bg-secondary p-3 m-3 border border-danger" onclick="deployOffcanvas('${movie.id}')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="row">
            <h2 class="col-xs-12 col-sm-6 col-md-8 text-white">${movie.title}</h2>
            <div class="col-xs-6 col-md-4 text-end">${transformToStars(movie.vote_average)}</div>
        </div>
        <div class="row">
            <div class="col-xs-6 fst-italic text-white">${movie.tagline}</div>
            <div class="clearfix visible-xs-block"></div>
        </div>
    </div>`;
    return newElement;
}

// Filtra y muestra las películas resultantes de la búsqueda

function searchMovie(data){
    lista.innerHTML = "";
    let search = searchBar.value.toLowerCase();
    let filteredMovies = data.filter(elemento => {
        return elemento.title.toLowerCase().includes(search) || elemento.tagline.toLowerCase().includes(search) || elemento.vote_average == search || elemento.genres.some(elem => elem.name.toLowerCase() === search);
    });
    for(let movie of filteredMovies){
        let templi = document.createElement("li");
        templi = createMovieElement(movie);
        lista.innerHTML += templi;
    }
}

// Fetch para traer la data de las películas del url

fetch(URL)
.then(response => response.json())
.then(data => {
    fetchData = data
})
.catch(error => console.log(error));

searchBtn.addEventListener("click", function(){
    searchMovie(fetchData);
});


