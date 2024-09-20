// Realiza una petición fetch para obtener datos del archivo data.json
fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    preguntas = data.preguntes; // Accede al array de preguntas
    console.log('Preguntas cargadas:', preguntas); // Verifica que las preguntas se cargan
    mostrarPregunta(); // Muestra la primera pregunta
  })
  .catch(error => console.error('Fetch error:', error));

// Variables para preguntas, índice actual y puntuación
let preguntas = [];
let preguntaActual = 0;
let puntuacion = 0;

// Muestra la pregunta actual
function mostrarPregunta() {
  console.log('Mostrando pregunta', preguntaActual); // Verifica que la función se llama

  if (preguntaActual < preguntas.length) {
    let pregunta = preguntas[preguntaActual];
    let htmlString = `<h3>${pregunta.pregunta}</h3>`;
    
    // Si hay una imagen, mostrarla
    if (pregunta.imatge) {
      htmlString += `<img src="${pregunta.imatge}" alt="Imagen de la pregunta" style="max-width: 100%; height: auto;"/>`;
    }

    // Crea botones para las respuestas
    pregunta.respostes.forEach((resposta, index) => {
      htmlString += `<button onclick="verificarResposta(${index})">${resposta}</button>`;
    });

    // Actualiza el contenido en el elemento 'partida'
    document.getElementById('partida').innerHTML = htmlString;
  } else {
    // Muestra la puntuación final
    document.getElementById('partida').innerHTML = `<h2>Joc acabat! La teva puntuació és: ${puntuacion}/${preguntas.length}</h2>`;
  }
}

// Verifica la respuesta seleccionada
function verificarResposta(resposta_selecionat) {
  let pregunta = preguntas[preguntaActual];

  // Comprueba si la respuesta es correcta
  if (pregunta.resposta_correcta !== undefined && resposta_selecionat === pregunta.resposta_correcta) {
    puntuacion++; // Incrementa la puntuación si la respuesta es correcta
  }

  // Avanza a la siguiente pregunta
  preguntaActual++;
  mostrarPregunta(); // Muestra la siguiente pregunta
}
