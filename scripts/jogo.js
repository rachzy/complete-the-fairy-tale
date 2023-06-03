import jogos from "./jogos.js";
import { setarAcertos } from "./resultado.js";
import shuffleArray from "./shuffleArray.js";

const jogoID = new URLSearchParams(window.location.search).get("id");

const jogo = jogos.find((j) => j.id === jogoID);
const { perguntas } = jogo;

const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const botoesContainer = document.querySelector(".botoes-container");
const banner = document.querySelector("#banner");
const seta = document.querySelector(".seta");

let perguntaAtual = 0;
let pontos = 0;

function verificarRespostas() {
  const opcoes = descricao.querySelectorAll("span");

  for (let i = 0; i <= perguntas[perguntaAtual].opcoes.length - 1; i++) {
    if (opcoes[i].textContent === perguntas[perguntaAtual].opcoes[i])
      pontos += 1;
  }
}

function cliqueSeta() {
  if (!seta.classList.contains("active")) return;
  seta.classList.remove("active");

  verificarRespostas();

  if (perguntaAtual >= perguntas.length - 1) {
    return setarAcertos(pontos);
  }

  perguntaAtual++;
  setarPergunta();
}

seta.addEventListener("click", cliqueSeta);

function verificarSeta() {
  const questoes = document.querySelectorAll(".question");

  if (questoes.length !== 0) return seta.classList.remove("active");

  seta.classList.add("active");
}

function cliqueQuestao(e) {
  const { target } = e;

  const questoes = document.querySelectorAll(".question");

  target.style.display = "none";

  for (const questao of questoes) {
    if (!questao.classList.contains("opcao")) {
      questao.className = "opcao";
      questao.textContent = target.textContent;

      questao.onclick = function () {
        target.style.display = "block";
        questao.className = "question";

        verificarSeta();
      };
      break;
    }
  }

  verificarSeta();
}

function setarPergunta() {
  document.body.style.opacity = "0%";

  botoesContainer.innerHTML = "";

  const pergunta = perguntas[perguntaAtual];

  const copiaArray = [...perguntas[perguntaAtual].opcoes];
  let opcoesEmbaralhadas = shuffleArray(copiaArray);

  setTimeout(() => {
    const descricaoSeparada = pergunta.descricao.split("<question>");
    let descricaoHTML = pergunta.descricao;

    descricaoSeparada.forEach((question, index) => {
      const opcao = opcoesEmbaralhadas[index];

      if (!opcao) return;

      descricaoHTML = descricaoHTML.replace(
        "<question>",
        `<span class="question">${opcao}</span>`
      );

      const novoBotao = document.createElement("button");
      novoBotao.className = "opcao";
      novoBotao.textContent = opcao;
      novoBotao.addEventListener("click", (e) => {
        cliqueQuestao(e);
      });

      botoesContainer.appendChild(novoBotao);
    });

    descricao.innerHTML = descricaoHTML;
    banner.src = `./imagens/${pergunta.banner}`;

    document.body.style.opacity = "100%";

    if (pergunta.titulo) {
      return (titulo.textContent = pergunta.titulo);
    }
    titulo.style.display = "none";
  }, 700);
}
setarPergunta();
