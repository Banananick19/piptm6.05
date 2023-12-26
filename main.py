import flask
import os
from flask import Flask, request, g, render_template, make_response, redirect
import uuid
import json
app = Flask(__name__)

def find_file(in_path, name):
    for root, directories, filenames in os.walk(in_path):
        if not filenames:
            continue

        for filename in filenames:
            if filename.startswith(name):
                return os.path.join(root, filename)

    return None

@app.post("/upload")
def upload():
    file = request.files['file']
    filename = uuid.uuid4().hex + '.' + file.filename.split(".")[-1]
    file.save("files/" + filename)
    response = {'filename': filename.split(".")[0]}
    return json.dumps(response)

@app.get("/file")
def getFile():
    filename = find_file("./files", request.args.get("filename"))
    return flask.send_file(filename, download_name=filename, mimetype="image/png")



@app.route("/")
def index():
    res = make_response(render_template('main.html', name='Jerry'))
    res.headers['Content-Type'] = 'text/html'
    res.headers['Server'] = 'Foobar'
    res.set_cookie("favorite-color", "skyblue")
    res.set_cookie("favorite-font", "sans-serif")
    return res

if __name__ == "__main__":
    app.run(debug=True)