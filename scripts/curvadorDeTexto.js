// Seleciona todos os elementos com o id "texto-curvado"
// No caso, todos os elementos que precisam ter o texto curvado
const textosCurvados = document.querySelectorAll("#texto-curvado");

// Para cada um desses elementos
textosCurvados.forEach((texto) => {
  // Aplica a função CircleType() a cada um deles
  const circleType = new CircleType(texto);
  circleType.dir(1);
  circleType.radius(800);
});
