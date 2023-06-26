import jogos from "./jogos.js"; // Importa todos os jogos
import { setarAcertos } from "./resultado.js"; // Importa a função setarAcertos()
import shuffleArray from "./shuffleArray.js"; // Importa a função de embaralhar array

// Pega a variável "id" que está salva na URL
// Exemplo: complete-the-fairy-tale.com/index.html?id=123
// A variável armazenaria o valor "123"
const jogoID = new URLSearchParams(window.location.search).get("id");

const jogo = jogos.find((j) => j.id === jogoID); // Encontra o jogo que possui esse ID na array de jogos
const { perguntas } = jogo; // Salva as perguntas do jogo

// Seleciona diversos elementos do documento
// #: seleciona por ID
// .: seleciona por classe
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const botoesContainer = document.querySelector(".botoes-container");
const banner = document.querySelector("#banner");
const seta = document.querySelector(".seta");

let perguntaAtual = 0;
let pontos = 0;

function verificarRespostas() {
  const opcoes = descricao.querySelectorAll("span");

  // Vai em cada uma das opções selecionadas do usuário e verifica se
  // o textContent delas corresponde ao da opção correta
  for (let i = 0; i <= perguntas[perguntaAtual].opcoes.length - 1; i++) {
    if (opcoes[i].textContent === perguntas[perguntaAtual].opcoes[i])
      pontos += 1;
  }
}

// Função que passa para a próxima pergunta
function cliqueSeta() {
  // Caso a seta esteja invisível, ignore
  if (!seta.classList.contains("active")) return;
  seta.classList.remove("active"); // Deixa a seta invisível novamente

  // Chama a função de verificar respostas
  verificarRespostas();

  // Caso esta tenha sido a última pergunta, apenas sete os pontos
  if (perguntaAtual >= perguntas.length - 1) {
    return setarAcertos(pontos);
  }

  // Passa para a próxima pergunta
  perguntaAtual++;
  setarPergunta();
}

// Adiciona o evento de clique à seta
seta.addEventListener("click", cliqueSeta);

// Função que verifica se a seta já pode ou não aparecer
function verificarSeta() {
  const questoes = document.querySelectorAll(".question"); // Seleciona todas as questões

  // Caso o usuário ainda não tenha marcado todas as questões
  // mantenha a seta invisível
  if (questoes.length !== 0) return seta.classList.remove("active");

  // Caso todas as questões já tenham sido marcadas, torne a seta vísivel
  seta.classList.add("active");
}

function cliqueQuestao(e) {
  const { target } = e;

  // Seleciona todas as questões
  const questoes = document.querySelectorAll(".question");

  // Faz com que a questão selecionada desapareça
  target.style.display = "none";

  // Para cada questão...
  for (const questao of questoes) {
    // Caso a questão não possua a classe "opção"
    if (!questao.classList.contains("opcao")) {
      questao.className = "opcao"; // Seta a classe opção
      questao.textContent = target.textContent; // Seta o texto correspondente

      // Adiciona uma nova função de clique
      questao.onclick = function () {
        // Ao clicar, faça com que o item clicado simplesmente volte a aparecer
        target.style.display = "block";
        questao.className = "question";

        // Função que verifica se a seta já pode ser exibida
        verificarSeta();
      };
      break;
    }
  }

  verificarSeta();
}

// Função que seta uma nova pergunta
function setarPergunta() {
  // Tira a opacidade do body para fazer a animação de degradê
  document.body.style.opacity = "0%";

  // Deleta todos os botões já existentes
  botoesContainer.innerHTML = "";

  // Seleciona a pergunta atual
  const pergunta = perguntas[perguntaAtual];

  // Cria uma cópia da array das opções e as embaralha
  const copiaArray = [...perguntas[perguntaAtual].opcoes];
  let opcoesEmbaralhadas = shuffleArray(copiaArray);

  // Função para ser executada depois de 700ms, que é pra dar tempo da animação de degradê se executar
  setTimeout(() => {
    // Separa a pergunta a partir da tag <question>
    const descricaoSeparada = pergunta.descricao.split("<question>");
    let descricaoHTML = pergunta.descricao; // HTML final

    // Para cada pedaço da descrição...
    descricaoSeparada.forEach((question, index) => {
      // Seleciona a opção correspondente na array de opçõesEmbaralhadas
      const opcao = opcoesEmbaralhadas[index];

      // Verifica caso a opção não seja nula, por precaução
      if (!opcao) return;

      // Muda a tag <question> por elementos que aramazenarão o valor das perguntas
      descricaoHTML = descricaoHTML.replace(
        "<question>",
        `<span class="question">${opcao}</span>`
      );

      // Cria um novo botão para a pergunta
      const novoBotao = document.createElement("button");
      novoBotao.className = "opcao";
      novoBotao.textContent = opcao;
      novoBotao.addEventListener("click", (e) => {
        // Seta a função de clique
        cliqueQuestao(e);
      });

      // Anexa o botão criado ao container de botões
      botoesContainer.appendChild(novoBotao);
    });

    descricao.innerHTML = descricaoHTML; // Seta o HTML da descrição com o HTML Final
    banner.src = `./imagens/${pergunta.banner}`; // Seta a imagem do banner com a foto correspondente

    document.body.style.opacity = "100%"; // Deixa o body visível de novo

    // Caso tenha a pergunta título, faça-a aparecer
    if (pergunta.titulo) {
      return (titulo.textContent = pergunta.titulo);
    }

    // Caso não, faça-a desaparecer para não ocupar espaço desencessário
    titulo.style.display = "none";
  }, 700);
}

// Chama a função pela primeira vez para que a primeira pergunta seja setada
setarPergunta();
