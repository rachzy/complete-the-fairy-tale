import shuffleArray from "./shuffleArray.js";

const perguntas = [
  {
    titulo: "Once Upon a Time...",
    descricao: `There lived a little country girl, the <question> creature who 
        was ever seen. Her mother had a little red riding hood made for her. 
        <question> called her Little Red Riding Hood. \n One day her mother said to her: 
        “Go my dear, and see how your <question> is doing, for I hear she has been 
        very ill.” Little Red Riding Hood set out immediately.`,
    opcoes: ["prettiest", "Everybody", "grandmother"],
    banner: "cv1.png",
  },
  {
    descricao: `As she was going through the <question> , she met with a wolf. He 
        asked her where she was going. \n “I am going to see my grandmother.” “Does 
        she live far off?” said the <question> . “It is <question> that mill you see there”.`,
    opcoes: ["woods", "wolf", "beyond"],
    banner: "cv2.png",
  },
  {
    descricao: `It was not long before the wolf arrived at the old woman’s 
        house. He <question> at the door. \n Tap, tap, tap. \n “Who’s there?” “Your 
        <question>, Little Red Riding Hood,” replied the wolf, faking her voice.
        The <question> grandmother called out, “Pull the string, and the latch will go up.”`,
    opcoes: ["knocked", "grandchild", "good"],
    banner: "cv3.png",
  },
  {
    descricao: `The wolf pulled the string and the door opened, and then he immediately 
        fell upon the good woman and <question> her up in a moment. \n He then <question> the door and 
        got into the grandmother’s bed, expecting Little Red Riding Hood, who came some time 
        afterwards and knocked at the door. Tap, tap, tap. \n “It is your grandchild, Little 
        Red Riding Hood.” \n The wolf cried out, “Pull the string, and the latch will go up.” 
        \n Little Red Riding Hood pulled the string, and the door opened.`,
    opcoes: ["ate", "grandchild", "good"],
    banner: "cv4.png",
  },
  {
    descricao: `“Grandmother, what big <question> you have!” \n
        “All the better to hug you with, my dear.” \n
        “Grandmother, what big <question> you have!” \n
        “All the better to hear you with, my child.” \n
        “Grandmother, what big <question> you have!” \n
        “All the better to see you with, my child.” \n
        “Grandmother, what big teeth you have got!” \n
        “All the better to eat you up with.” \n
        `,
    opcoes: ["arms", "ears", "eyes"],
    banner: "cv5.png",
  },
  {
    descricao: `Fortunately, a <question> was passing near by the hut. He heard 
        the wolf, and recognised him right away. The hunter entered the <question>, 
        saw the wolf snoring on the bed and opened the animal's huge belly. From 
        there left grandma and Little Riding Hood: \n - <question>! Thanks! It was so 
        dark inside the wolf's belly,” said the girl.
        `,
    opcoes: ["hunter", "house", "Phew"],
    banner: "cv6.png",
  },
  {
    descricao: `The hunter stuffed the wolf's belly with stones and sewed it up 
        tightly. When the evil one woke up, he stumbled away and fell into the <question>, 
        never to return. Grandma, Little Red Riding Hood and the hunter were relieved 
        and happy. Little Red Riding Hood then promised: \n "I will never again go into 
        the <question> alone or listen to strangers!" \n And finally the three of them sat 
        down at the table and ate the cake and <question> that Little Red Riding Hood brought 
        in her basket.
        `,
    opcoes: ["river", "forest", "sweets"],
    banner: "cv7.png",
  },
];

const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const botoesContainer = document.querySelector(".botoes-container");
const banner = document.querySelector("#banner");
const seta = document.querySelector(".seta");

let perguntaAtual = 0;

function cliqueSeta() {
  if (!seta.classList.contains("active")) return;

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
  let opcoesEmbaralhadas = shuffleArray(pergunta.opcoes);

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
