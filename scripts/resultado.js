const metadeContainers = document.querySelectorAll(".metade-container");
const resultadoContainer = document.querySelector(".resultado-container");

const score = document.querySelector("#score");
const levelLabel = document.querySelector("#level");
const desc = document.querySelector("#desc");

// Array que armazena todos os níveis de proficiência em inglês
const leveis = [
  {
    titulo: "BEGINNER",
    descricao: `Can understand and use familiar everyday expressions 
    and very basic phrases aimed at the satisfaction of needs of a 
    concrete type. Can introduce themselves and others and can ask and 
    answer questions about personal details.`,
    minimoAcertos: 0,
    maximoAcertos: 8,
  },
  {
    titulo: "INTERMEDIATE",
    descricao: `Can understand the main points of clear standard input 
    on familiar matters regularly encountered in work, school, leisure, 
    etc. Can deal with most situations likely to arise whilst travelling 
    in an area where the language is spoken.`,
    minimoAcertos: 9,
    maximoAcertos: 16,
  },
  {
    titulo: "ADVANCED",
    descricao: `Can understand a wide range of demanding, longer texts, and 
    recognise implicit meaning. Can express themself fluently and spontaneously 
    without much obvious searching for expressions. Can use language flexibly and 
    effectively.`,
    minimoAcertos: 17,
    maximoAcertos: 21,
  },
];

// Função que mostra a tela de acertos ao usuário, baseado em seu número final de acertos
// quantidade: total de acertos do usuário
export function setarAcertos(quantidade) {
  // Tira a opacidade do body para fazer a animação de degradê
  document.body.style.opacity = "0%";

  // Procura por um level cujo mínimo de acertos seja menor ou igual e 
  // o máximo de acertos seja maior ou igual a quantidade de acertos
  const level = leveis.find(
    (lv) => lv.minimoAcertos <= quantidade && lv.maximoAcertos >= quantidade
  );

  // Função para ser executada depois de 500ms, que é pra dar tempo da animação de degradê se executar
  setTimeout(() => {
    // Remove todos os containers da tela
    metadeContainers.forEach((container) => {
      container.style.display = "none";
    });

    // Mostra todos os containers de resultado, que antes estavam invisíveis
    resultadoContainer.style.display = "flex";

    // Seta os textos da tela de acertos com os valores correspondentes
    score.textContent = quantidade;
    levelLabel.textContent = level.titulo;
    desc.textContent = level.descricao;

    // Faz com que o body apareça novamente
    document.body.style.opacity = "100%";
  }, 500);
}
