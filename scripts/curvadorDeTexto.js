const textosCurvados = document.querySelectorAll("#texto-curvado");

textosCurvados.forEach((texto) => {
  const circleType = new CircleType(texto);
  circleType.dir(1);
  circleType.radius(800);
});
