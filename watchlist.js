


const watchlistContainer = document.getElementById("watchlist-container")
const backToSearchBtn = document.getElementById("backToSearch-btn")
const watchlistImgBtn = document.querySelector(".watchlist-btn-img")
const length = localStorage.length
const emptyWatchlistNote = document.getElementById("empty-watchlist-note")
const clearAllBtn = document.getElementById("clear-all-btn")
let html = ``

for (let i = 0; i < length; i++) {
    html += JSON.parse(window.localStorage.getItem(localStorage.key(i)))
}


//POPLUATE WATCHLIST FILMS TO PAGE
watchlistContainer.innerHTML = html

function addToWatchlist(event) {
    const film = event.target.parentElement.parentElement.parentElement
    film.remove()
}


//CLEAR ALL
clearAllBtn.addEventListener("click", function () {
    localStorage.clear()
    watchlistContainer.innerHTML = `<p id="empty-watchlist-note">Your watchlist is looking empty...</p>
    <a id="back-to-search" href="index.html">Let's add some movies!</a>`

})