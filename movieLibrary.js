// $(".updateBtn").on("click", function(){
//         loadMovies();
// });

function loadMovies() {
    $("#movieTable").empty();
    var retrivemovies = localStorage.getItem("movies");
    movies = JSON.parse(retrivemovies);
    for (i = 0; i < movies.length; i++) {
        if (movies[i].id != '') {
            $.ajax({
                url: 'https://www.omdbapi.com/?apikey=2cf20c03&i=' + movies[i].id,
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    $("#movieTable").append("<tr>" + "<td>" + "<img  class= 'poster img-fluid' src='" + data.Poster + "' alt = 'moviePoster' height= '50%' width = '25%'" + "</td>" +
                        "<td>" + data.Title + "</td>" +
                        "<td>" + data.Year + "</td>" +
                        "<td>" + data.Runtime + "</td>" +
                        "<td>" + data.imdbRating + "</td>" +
                        "<td><button  value='" + data.imdbID + "' class='movie-item-remove btn btn-default'>" +
                        "Ta Bort</button>" + "</td>" +
                        "</tr>")
                }
            });
        }
        else {
            alert('Detta gick icke');
            return (false);
        }

    }
}
$("#movieTable").on('click', '.movie-item-remove', function (e) {
    var item = this;
    deleteMovie(e, item)
})

function deleteMovie(e, item) {
    e.preventDefault();
    var retriveLocalMovies = localStorage.getItem("movies");
    movies = JSON.parse(retriveLocalMovies);
    var itemIdex = findObj(movies, "id", $(item).val());
    movies.splice(itemIdex, 1);
    localStorage.removeItem("movies");
    var JSONMovies = JSON.stringify(movies);
    localStorage.setItem("movies", JSONMovies);
    $(item).parent().parent().fadeOut('slow', function () {
        $(item).parent().parent().remove();
    });
    console.log(localStorage.getItem("movies"));
    loadMovies();
}
function findObj(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i
        }
    }
    return null;
}
