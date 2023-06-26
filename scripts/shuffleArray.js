// Função para embaralhar array
// Feita por: coolaj86
// Encontrada em: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

export default function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // Enquanto ainda há um elemento para embaralhar.
  while (currentIndex != 0) {
    // Seleciona um elemento restante
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E troca esse elemento com o elemento atual
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
