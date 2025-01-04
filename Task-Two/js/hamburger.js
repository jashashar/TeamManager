(function () {
  var hamburger = document.getElementById("hamburger");
  var navbar = document.getElementById("nav");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("navRender");
    navbar.style.animation = "nav 1s";
  });
})();
