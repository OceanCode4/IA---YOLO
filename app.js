let totalTrashDetected = 0;

document.getElementById('startDetection').addEventListener('click', function () {
    // Iniciar webcam
    const video = document.getElementById('webcam');
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err) {
                console.log("Erro ao acessar a webcam: " + err);
            });
    }

    // Simulação de detecção de lixo (substituir por integração com IA)
    setInterval(() => {
        let detectedItems = Math.floor(Math.random() * 5); // Simulação de itens detectados
        totalTrashDetected += detectedItems;
        document.getElementById('detected-trash').innerText = `${detectedItems} itens`;
        document.getElementById('totalTrash').innerText = (totalTrashDetected / 1000).toFixed(2); // Em toneladas
    }, 5000);
});
