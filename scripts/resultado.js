const metadeContainers = document.querySelectorAll(".metade-container");
const resultadoContainer = document.querySelector(".resultado-container");

const score = document.querySelector("#score");
const levelLabel = document.querySelector("#level");
const desc = document.querySelector("#desc");

const leveis = [
  {
    titulo: "BEGINNER",
    description: `Can understand and use familiar everyday expressions 
    and very basic phrases aimed at the satisfaction of needs of a 
    concrete type. Can introduce themselves and others and can ask and 
    answer questions about personal details.`,
    minimoAcertos: 0,
    maximoAcertos: 8,
  },
  {
    titulo: "INTERMEDIATE",
    description: `Can understand the main points of clear standard input 
    on familiar matters regularly encountered in work, school, leisure, 
    etc. Can deal with most situations likely to arise whilst travelling 
    in an area where the language is spoken.`,
    minimoAcertos: 9,
    maximoAcertos: 16,
  },
  {
    titulo: "ADVANCED",
    description: `Can understand a wide range of demanding, longer texts, and 
    recognise implicit meaning. Can express themself fluently and spontaneously 
    without much obvious searching for expressions. Can use language flexibly and 
    effectively.`,
    minimoAcertos: 17,
    maximoAcertos: 21,
  },
];

export function setarAcertos(quantidade) {
  document.body.style.opacity = "0%";
  const level = leveis.find(
    (lv) => lv.minimoAcertos <= quantidade && lv.maximoAcertos >= quantidade
  );

  setTimeout(() => {
    metadeContainers.forEach((container) => {
      container.style.display = "none";
    });
    resultadoContainer.style.display = "flex";

    score.textContent = quantidade;
    levelLabel.textContent = level.titulo;
    desc.textContent = level.description;

    document.body.style.opacity = "100%";
  }, 500);
}
