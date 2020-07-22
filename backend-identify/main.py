import numpy as np
import flask 
import json
def identify(request):
   
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

    if request.method=="GET":
        return "Hello!"



    if request.method=="POST":
        data = request.get_json()
        embeddings = np.array(json.loads(data["embeddings"]))
        new_embed = np.array(json.loads(data["new_embed"]))



        dists = [np.linalg.norm(e1-new_embed) for e1 in embeddings]
        index = np.argmin(dists)
        response = flask.jsonify(index=int(index))

    
        response.headers.set('Access-Control-Allow-Origin', '*')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
        return response

