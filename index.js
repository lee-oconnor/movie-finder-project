

const searchMovieBtn = document.getElementById("search-movie-btn")
const myWatchlist = document.querySelector(".watchlist-btn")
const searchedMovies = document.getElementById("found-film")
const startExploringDiv = document.querySelector(".start-exploring")
const movieIcon = document.getElementById("icon")
const addToWatchlistBtn = document.getElementById("watchlist-add") //renamed this for clarity
const foundMovieDiv = document.getElementById("found-movie")




searchMovieBtn.addEventListener("click", function (e) {
    e.preventDefault()
    const searchboxValue = document.getElementById("search-movie").value
    startExploringDiv.classList.add("hide")
    fetch(`https://www.omdbapi.com/?apikey=bbc5e59f&s=${searchboxValue}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.Search.length; i++) {
                let filmTitle = data.Search[i].Title
                let filmImdbID = data.Search[i].imdbID
                let filmPoster = data.Search[i].Poster
                let filmGenre
                let filmRuntime
                let filmPlot
                let filmRating
                searchedMovies.innerHTML = ``
                fetch(`https://www.omdbapi.com/?apikey=bbc5e59f&i=${filmImdbID}`)
                    .then(res => res.json())
                    .then(data => {
                        filmGenre = data.Genre
                        filmRuntime = data.Runtime
                        filmPlot = data.Plot
                        filmRating = data.Ratings[0].Value

                        const dataObj = {
                            filmTitle: filmTitle,
                            filmPoster: filmPoster,
                            filmGenre: filmGenre,
                            filmRuntime: filmRuntime,
                            filmPlot: filmPlot,
                            filmRating: filmRating
                        }

                        searchedMovies.innerHTML += `
             <div class="found-movie" id="${filmImdbID}">
                 <div class="movie-poster">
                     <img src="${dataObj.filmPoster}" alt="Movie Poster" id="filmPoster-${i}">
                 </div>
                 <div class="movie-details">
                   <h4 class="movie-title" id="filmTitle-${i}">${dataObj.filmTitle} <span id="filmRating-${i}" class="film-rating"><img id="star" src="/img/star.png"alt="star rating">${dataObj.filmRating}</span>
                   </h4>
                    <span class="min-genre-watchlist">
                        <span id="runtime-${i}" class="runtime">${dataObj.filmRuntime}</span>
                        <span id="genre-${i}" class="genre">${dataObj.filmGenre}</span> 
                         <button class="watchlist-btn" add-state=${localStorage.getItem(filmImdbID) ? "removable" : "addable"} onClick="addToWatchlist(event)">Watchlist</button>
                     </span>
                     <div class="movie-plot" id="filmPlot-${i}">${dataObj.filmPlot}</div>
                 </div>
             </div>
            `
                    })
            }

        })

})


function addToWatchlist(event) {
    const btn = event.target
    const movie = btn.parentElement.parentElement.parentElement
    const movieID = movie.getAttribute('id')
    btn.setAttribute("add-state", "removable")
    btn.textContent = "Remove"
    localStorage.setItem(movieID, JSON.stringify(movie.outerHTML))


}

