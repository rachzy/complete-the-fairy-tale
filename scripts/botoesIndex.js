const objetos = document.querySelectorAll("#objeto");

objetos.forEach((objeto) => {
  objeto.addEventListener("click", () => {
    document.body.classList.toggle("fadeOut");
    setTimeout(() => {
      window.location.href = "./jogo.html";
    }, 700);
  });
});
