// Seleciona todos os elementos com o id "objeto"
// No caso, todos os jogos disponíveis
const objetos = document.querySelectorAll("#objeto");

// Para cada objeto...
objetos.forEach((objeto) => {

  // Adiciona uma função para quando o usuário clicar
  // Essa função redirecionará o usuário para o jogo selecionado
  objeto.addEventListener("click", () => {
    document.body.classList.toggle("fadeOut"); // Adiciona a classe da animação de degradê do body

    // Dá um tempo de 700ms para que a animação de degradê se execute
    setTimeout(() => {
      // Redireciona o usuário para o jogo selecionado
      window.location.href = `./jogo.html?id=${objeto.value}`;
    }, 700);
  });
});
