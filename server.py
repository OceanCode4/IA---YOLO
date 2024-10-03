from flask import Flask, Response, jsonify
import cv2
import numpy as np
import logging

app = Flask(__name__)

# Configuração de logging
logging.basicConfig(level=logging.INFO)

# Variável para armazenar detecções
detections = []

# Função fictícia para detectar objetos (substitua pela sua lógica real)
def detect_objects(frame):
    # Simulação de detecção
    height, width, _ = frame.shape
    global detections
    detections = [{"label": "Objeto", "x": 50, "y": 50, "width": 100, "height": 100}]
    return frame

# Gerador para capturar vídeo
def generate_frames():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        logging.error("Erro ao acessar a câmera")
        return

    while True:
        success, frame = cap.read()
        if not success:
            logging.error("Falha ao capturar o frame")
            break

        # Chama a função de detecção de objetos
        frame = detect_objects(frame)

        # Codifica o frame como JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            logging.error("Falha ao codificar o frame")
            continue

        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Rota para enviar o vídeo
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# Rota para obter detecções
@app.route('/detections', methods=['GET'])
def get_detections():
    return jsonify(detections)

# Rota principal
@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
