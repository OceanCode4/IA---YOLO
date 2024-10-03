async function detectObjectsFromServer() {
    const videoElement = document.getElementById('cameraFeed');
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Captura um frame da câmera
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

    // Envia o frame para o servidor
    const formData = new FormData();
    formData.append('image', imageBlob, 'frame.jpg');
    
    // Faz a requisição para o servidor backend
    const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        body: formData
    });

    const detections = await response.json();

    // Atualiza a área de objetos detectados
    const detectedObjectsDiv = document.getElementById('detectedObjects');
    detectedObjectsDiv.innerHTML = ''; // Limpa objetos anteriores

    detections.forEach(obj => {
        const objectText = `${obj.name} (Confiança: ${(obj.confidence * 100).toFixed(2)}%)`;
        const objectElement = document.createElement('p');
        objectElement.textContent = objectText;
        detectedObjectsDiv.appendChild(objectElement);
    });
}

// Faz a detecção a cada 2 segundos
setInterval(detectObjectsFromServer, 2000);
