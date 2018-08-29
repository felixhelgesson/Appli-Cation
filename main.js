$("#searchBtn").on("click", retrieveinfo);
window.onload = loadFave();

var movies = [];

function loadFave() {
    if (localStorage.getItem("favMovie") !== null) {
        $(".favFilmHeader").append(localStorage.getItem("favMovie"));
    }
    else
    $(".favFilmHeader").append(" - Du har ingen favoritfilm än, sök en film och lägg till en favorit!");
}

function retrieveinfo() {
    $(".listContainer").empty();
    var phrase = $("#search").val();
    var payload = {};

    payload["s"] = phrase;

    $.ajax({
        url: "https://www.omdbapi.com/?apikey=2cf20c03&",
        type: "GET",
        dataType: "JSON",
        data: payload

    }).done(function (data) {
        var nrOfMovies = data.Search.length;
        var favBtn = $('<br> <button type="button" class="favBtn btn btn-light m-1">Favorit</button>');
        var arkivBtn = $('<br> <button type="button" class="arkBtn btn btn-dark m-1">Lägg i Bibliotek</button>');
        var imdbBtn = $('<br> <button type="button" class="linkBtn btn bg-warning m-1">IMDb</button>');

        for (let index = 0; index < nrOfMovies; index++) {
            $(".listContainer").append(
                "<div> <h5 id = title>" + data.Search[index].Title + "</h5>" +
                "<h6 id = year>(" + data.Search[index].Year + ")</h6>" +
                "<h5 id = movieId>" + data.Search[index].imdbID + "</h5>" +
                "<br> <img src=" + data.Search[index].Poster + " class = img-fluid> </div>"
            ).children("div").addClass("m-3 p-3 movieItem");
        }
        $(".movieItem").append(favBtn, arkivBtn, imdbBtn).css({ "background-color": "lightblue" });

    }).fail(function (data) {
        console.log("Det här gick ju inte");
    });
}

/* Favorite button-function --------------------------------------------*/
$(".listContainer").on('click', '.favBtn', function (e) {
    var item = this;
    favMovie(e, item)
})

function favMovie(e, item) {
    e.preventDefault();
    var temp = {};
    temp["movie"] = $(item).parent().find("#title").text();
    var JSONFav = JSON.stringify(temp.movie);
    localStorage.setItem("favMovie", JSONFav);

    setFavMovie();
}

function setFavMovie() {
    var currentFavMovie = localStorage.getItem("favMovie");
    $(".favFilmHeader").empty();
    $(".favFilmHeader").append("Favoritfilm: " + currentFavMovie);
}
/*---------------------------------------------------------------------*/
/* Archive button-function --------------------------------------------*/

$(".listContainer").on('click', '.arkBtn', function (e) {
    var item = this;
    archiveMovie(e, item)
})

function archiveMovie(e, item) {
    e.preventDefault();
    var retrivemovies = localStorage.getItem("movies");
    movies = JSON.parse(retrivemovies);
    if (movies == null) {
        movies = [];
    }
    var temp = {};
    temp["title"] = $(item).parent().find("#title").text();
    temp["year"] = $(item).parent().find("#year").text();
    temp["id"] = $(item).parent().find("#movieId").text();
    if (findObj(movies, "id", temp.id) === null) {
        movies.push(temp);
        localStorage.removeItem("movies");
        var JSONMovies = JSON.stringify(movies);
        localStorage.setItem("movies", JSONMovies);
    }
    alert(temp["title"] + " har lagts in i ditt bibliotek!");
}

function findObj(array, key, value) {
    console.log(array);
    console.log(key);
    console.log(value);
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

/*---------------------------------------------------------------------*/
/* IMDb-button-function -----------------------------------------------*/

$(".listContainer").on('click', '.linkBtn', function (e) {
    var item = this;
    openIMDb(e, item)
})

function openIMDb(e, item) {
    e.preventDefault();
    var temp = {};
    temp["id"] = $(item).parent().find("#movieId").text();

    var win = window.open("https://www.imdb.com/title/" + temp.id + "/", '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
}
/*---------------------------------------------------------------------*/