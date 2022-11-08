window.onload= () => {
    Profile()
}

// ProfileUpdate()

function profile(){
    location.href="profile.html"
  }

function index(){
    location.href="index.html"
}

const gap = 16;

const carousel = document.getElementById("carousel")
//content = document.getElementById("content"),
next = document.getElementById("carousel-next")
prev = document.getElementById("carousel-prev")

carousel-next.addEventListener("click", e => {
    carousel.scrollBy(width + gap, 0);
});
carousel-prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));