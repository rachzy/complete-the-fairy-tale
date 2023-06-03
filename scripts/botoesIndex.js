const objetos = document.querySelectorAll("#objeto");

objetos.forEach((objeto) => {
  objeto.addEventListener("click", () => {
    document.body.classList.toggle("fadeOut");
    setTimeout(() => {
      window.location.href = `./jogo.html?id=${objeto.value}`;
    }, 700);
  });
});
