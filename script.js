function generatePrompt() {
    const role = document.getElementById('role').value;
    const expertise = document.getElementById('expertise').value;
    const focus = document.getElementById('focus').value;
    const task = document.getElementById('task').value;
    const topic = document.getElementById('topic').value;
    const tone = document.getElementById('tone').value;
    const category = document.getElementById('category').value;

    const prompt = `Imagina que eres un ${role}, experto en ${expertise}, con enfoque en ${focus}. Tu tarea es redactar preguntas sobre el tema ${topic} en un tono ${tone}, dentro de la categoría ${category}.`;

    document.getElementById('promptOutput').textContent = prompt;
}

async function sendToChatGPT() {
    const prompt = document.getElementById('promptOutput').textContent;

    const apiKey = ''; 
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch('http://localhost:5500/api/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{"role": "user", "content": prompt}]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            const gptResponse = data.choices[0].message.content;
            document.getElementById('chatgptResponse').textContent = gptResponse;
            formatToGIFT(gptResponse);
        } else {
            throw new Error("Unexpected API response structure");
        }
    } catch (error) {
        console.error('Error al llamar a la API de ChatGPT:', error);
        document.getElementById('chatgptResponse').textContent = `Error: ${error.message}`;
    }
}

function formatToGIFT(response) {
    const giftFormat = `::Pregunta::\n${response}\n`;
    document.getElementById('chatgptResponse').textContent = giftFormat;
}

function generatePrompt() {
    const role = document.getElementById('role').value;
    const expertise = document.getElementById('expertise').value;
    const focus = document.getElementById('focus').value;
    const task = document.getElementById('task').value;
    const topic = document.getElementById('topic').value;
    const tone = document.getElementById('tone').value;
    const category = document.getElementById('category').value;

    const prompt = `Imagina que eres un ${role}, experto en ${expertise}, con enfoque en ${focus}. Tu tarea es redactar preguntas sobre el tema ${topic} en un tono ${tone}, dentro de la categoría ${category}.`;

    document.getElementById('promptOutput').textContent = prompt;
}

function downloadGIFT() {
    const giftContent = document.getElementById('chatgptResponse').textContent;
    const blob = new Blob([giftContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preguntas.gift';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function copyPrompt() {
    var contenido = document.getElementById('promptOutput').innerText.trim();
    navigator.clipboard.writeText(contenido)
      .then(function() {
        alert('Contenido copiado al portapapeles');
      })
      .catch(function(error) {
        console.error('Error al copiar el contenido: ', error);
        alert('Error al copiar el contenido. Por favor, intenta nuevamente.');
      });
  }