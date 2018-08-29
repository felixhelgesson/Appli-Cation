// $(".searchSec").removeClass("d-flex").addClass("d-none");
// $(".uploadSec").removeClass("d-none").addClass("d-flex");

$(".uploadBtn").on("click", function () {
    $(".uploadSec").removeClass("d-none").addClass("d-flex");
    $(".searchSec").removeClass("d-flex").addClass("d-none");
    $(".movieLibSec").removeClass("d-flex").addClass("d-none");
    clearSearch();
    
    
});

$(".searchBtn").on("click", function () {
    $(".searchSec").removeClass("d-none").addClass("d-flex");
    $(".uploadSec").removeClass("d-flex").addClass("d-none");
    $(".movieLibSec").removeClass("d-flex").addClass("d-none");
});

$(".libBtn").on("click", function () {
    var localMovies = localStorage.getItem("movies");
    console.log(localMovies);
    
    if (localStorage.getItem("movies") == "[]" || localMovies === null) {
        alert("Du har inga filmer sparade än!")
    }
    else {
        $(".movieLibSec").removeClass("d-none").addClass("d-flex");
        $(".uploadSec").removeClass("d-flex").addClass("d-none");
        $(".searchSec").removeClass("d-flex").addClass("d-none");
        clearSearch();
        loadMovies();
    }
});

function clearSearch() {
    $(".listContainer").empty();
    $('#search').val("");
};


