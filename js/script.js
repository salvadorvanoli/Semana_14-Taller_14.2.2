const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let searchBar = document.getElementById("inputBuscar");
let searchBtn = document.getElementById("btnBuscar");
let fetchData = undefined;
let lista = document.getElementById("lista");
let cardDiv = document.getElementsByClassName("card");

function findMovieById(idP){
    let movie = fetchData.find(element => {
        return element.id == idP;
    })
    return movie;
}

function getGenres(movie){
    let genresString = "";
    for(let genre of movie.genres){
        genresString += " / " + genre.name;
    }
    return genresString;
}

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
    dropdownYear.innerHTML = movie.release_date;
    dropdownLength.innerHTML = movie.runtime;
    dropdownBudget.innerHTML = movie.budget;
    dropdownEarnings.innerHTML = movie.revenue;
}

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

function createMovieElement(movie){
    let newElement = 
    `<div class="card" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onclick="deployOffcanvas('${movie.id}')"><h2>${movie.title}</h2> <p>${movie.tagline}</p> <span>${transformToStars(movie.vote_average)}</span></div>`;
    return newElement;
}

function searchMovie(data){
    let search = searchBar.value.toLowerCase();
    let filteredMovies = data.filter(elemento => {
        return elemento.title.toLowerCase().includes(search) || elemento.tagline.toLowerCase().includes(search) || elemento.vote_average == search;
    });
    for(let movie of filteredMovies){
        let templi = document.createElement("li");
        templi = createMovieElement(movie);
        lista.innerHTML += templi;
    }
}

fetch(URL)
.then(response => response.json())
.then(data => {
    fetchData = data
})
.catch(error => console.log(error));

searchBtn.addEventListener("click", function(){
    searchMovie(fetchData);
});


