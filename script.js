function generatePrompt() {
    const role = document.getElementById("role").value;
    const expertise = document.getElementById("expertise").value;
    const focus = document.getElementById("focus").value;
    const task = document.getElementById("task").value;
    const topic = document.getElementById("topic").value;
    const tone = document.getElementById("tone").value;
    const category = document.getElementById("category").value;

    const prompt = `Imagina que eres un ${role}, Experto en ${expertise}, con Enfoque en ${focus}, tu Tarea es redactar preguntas. Tema: ${topic}, Tono: ${tone}, Categoría: ${category}.
Sigue estos pasos y solo presenta el resultado del punto 3:
1. **Preparación del Contenido**:
- **Tema:** ${topic}
2. **Desarrollo del Cuestionario:**
  - **Respuestas:** Formula respuestas correctas para la Pregunta, limitando a un máximo de 5 palabras y evitando repetir palabras de la Pregunta. 
  - **Términos:** Enuncia términos sobre el Tema, limitando a un máximo de 5 palabras y evitando repetir palabras de la Pregunta. 
  - **Definiciones:** Enuncia definiciones sobre el Término, limitando a un máximo de 5 palabras y evitando repetir palabras del Término. 
  - **Distractores:** Formula respuestas falsas para la pregunta, limitando a un máximo de 5 palabras y evitando repetir palabras de la Pregunta.
  - **Feedback:** Proporciona feedback conciso para cada respuesta y distractor, no excediendo las 5 palabras.
  - **Recomendación:** Coloca la respuesta correcta en la primera posición. Asegúrate de que la Pregunta, Respuestas, Distractores y Feedback sigan estrictamente el formato GIFT para Moodle. No utilices comillas dobles """" en ningún caso. Aquí tienes un esquema para presentar el cuestionario:

3. **Formato GIFT para Moodle:**
inicia con: $CATEGORY: ${topic} (${topic})
Redacta una Introducción máximo 10 palabras, con Enfoque en Educación en Tecnología de la Información, Tema: ${topic}
Diseña una Pregunta en el Tono seleccionado para el Tema, mínimo de 10 palabras.

::01::[html]<h5>Redacta una Introducción máximo 10 palabras, ${focus}, Tema: ${topic}. Elabora preguntas utilizando el siguiente párrafo: "${category}"</h5>
Seleccione la respuesta correcta:{
= Respuesta correcta 1 # Correcto: Feedback para la respuesta correcta 1
~Distractor único 1 # Incorrecto: Feedback para el distractor 1
~Distractor único 2 # Incorrecto: Feedback para el distractor 2
~Distractor único 3 # Incorrecto: Feedback para el distractor 3
}`;

    document.getElementById("promptOutput").textContent = prompt;
}
function downloadGIFT() {
    const promptOutput = document.getElementById("promptOutput").textContent;
    const blob = new Blob([promptOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt_gift.txt';
    a.click();
    URL.revokeObjectURL(url);
}

async function sendToChatGPT() {
    const promptOutput = document.getElementById("promptOutput").textContent;

    try {
        const response = await fetch('http://localhost:5500/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: promptOutput })
        });

        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }

        const data = await response.json();
        document.getElementById("chatgptResponse").textContent = data.response;
    } catch (error) {
        console.error('Error:', error);
        alert('Error communicating with the server: ' + error.message);
    }
}