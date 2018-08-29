
function changeSec(value) {
    if (value == "photo") {
        $(".imgSec").addClass("d-flex").removeClass("d-none");
        $(".videoSec").addClass("d-none").removeClass("d-flex")
        $(".audioSec").addClass("d-none").removeClass("d-flex")
        showImages(value);
    }
    else if (value == "video") {
        $(".videoSec").addClass("d-flex").removeClass("d-none");
        $(".imgSec").addClass("d-none").removeClass("d-flex");
        $(".audioSec").addClass("d-none").removeClass("d-flex");
        showVideo(value);
    }

    else if (value == "audio") {
        $(".audioSec").addClass("d-flex").removeClass("d-none");
        $(".imgSec").addClass("d-none").removeClass("d-flex");
        $(".videoSec").addClass("d-none").removeClass("d-flex");
        showAudio(value);
    }
}

function changeAccept(type) {
    if (type == "photo") {
        $("#medias").attr(
            "accept", "image/*"
        );
    }
    else {
        $("#medias").attr(
            "accept", type + "/*"
        );
    }
}


$("#myForm").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    if (!$("#uploadMedia").val() == "" && !$("#medias").get(0).files.length == 0 && !$("#titel").val() == "") {
        $.ajax({
            url: $(this).attr("action"),
            type: $(this).attr("method"),
            data: formData,
            dataType: "JSON",
            cache: false,
            contentType: false,
            processData: false
        }).done(function (data) {
            alert("Fil uppladdad!");
            $('#myForm')[0].reset();

        }).fail(function (data) {
            alert("Uppladning misslyckad, försök igen.");
        });
    }
    else
        alert("Du måste fylla i alla fält för att ladda upp.");


});

var files = [];
function showImages(type) {
    $(".images").empty();
    $.ajax({
        url: "https://ddwap.mah.se/AF8654/server.php?action=getMedia&type=" + type,
        type: "get",
        data: files,
        dataType: "JSON"
    }).done(function (data) {
        if (data.files != null) {
            for (var i = 0; i < data.files.length; i++) {
                $(".imgSec").append('<div><img class = "img-fluid w-75 rounded imageClass" src = "https://ddwap.mah.se/AF8654/' + data.files[i].path +
                    '" alt = "Database items">', '<br><p class = "title">' + data.files[i].title +
                    '</p></div>').children("div").addClass("imgItem m-3");
            }
        }
        else
            alert("No files in database")
    }).fail(function (data) {
    });
}

function showVideo(type) {
    $(".videos").empty();
    $.ajax({
        url: "https://ddwap.mah.se/AF8654/server.php?action=getMedia&type=" + type,
        type: "get",
        data: files,
        dataType: "JSON"
    }).done(function (data) {
        if (data.files != null) {
            for (var i = 0; i < data.files.length; i++) {
                $(".videoSec").append('<div><video class="video" height="360" width="640" controls><source class="videoFile m-4 w-100" src="https://ddwap.mah.se/af8654/' + data.files[i].path + '" type="video/mp4"></video><br><p>' + data.files[i].title + '</p></div>');
            }
        }
        else
            alert("No files in database")
    }).fail(function (data) {
    });
}
function showAudio(type) {
    $(".audio").empty();
    $.ajax({
        url: "https://ddwap.mah.se/AF8654/server.php?action=getMedia&type=" + type,
        type: "get",
        data: files,
        dataType: "JSON"
    }).done(function (data) {
        if (data.files != null) {
            for (var i = 0; i < data.files.length; i++) {
                $(".audioSec").append('<div class = "w-100 m-3"><audio controls><source class="audioFile m-4" src="https://ddwap.mah.se/af8654/' + data.files[i].path + '" type="audio/mp3"></audio><br><p>' + data.files[i].title + '</p></div>');
            }
        }
        else
            alert("No files in database")
    }).fail(function (data) {
    });
}