import flask
from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
import numpy as np
import pandas as pd
from imageio import imread


def face_embedding(request):

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    if request.method == "GET":
        return "Hello!"

    if request.method == "POST":
        try:
            data = request.get_json()
            downloadURL = data["downloadURL"]

            image = imread(downloadURL)

            device = torch.device(
                'cuda:0' if torch.cuda.is_available() else 'cpu')
            mtcnn = MTCNN(
                image_size=160, margin=0, min_face_size=20, thresholds=[0.6, 0.7, 0.7], factor=0.709, post_process=True, device=device)
            resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

            aligned_image, prob = mtcnn(image, return_prob=True)
            aligned_image = aligned_image.unsqueeze(0)
            aligned_image.to(device)

            embedding = resnet(aligned_image).detach().cpu()
            embedding = embedding.squeeze().tolist()

            del image, aligned_image

            response = flask.jsonify(embedding=embedding)
            response.headers.set('Access-Control-Allow-Origin', '*')
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
            return response

        except:
            response = flask.jsonify(embedding="nope")
