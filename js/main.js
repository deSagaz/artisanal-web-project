toggleImage = function(event) {
    // console.log(event); // DEBUG
    var elem = document.getElementById("image-overlay");

    if (event.type === "mouseenter") {
        elem.classList.add("show");
    } else {
        elem.classList.remove("show");
    }
}

window.onload = function() {
    listener = document.getElementById("image-wrapper");

    listener.addEventListener("mouseenter", toggleImage);
    listener.addEventListener("mouseleave", toggleImage);
}
