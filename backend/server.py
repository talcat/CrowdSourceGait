from flask import Flask
from flask import send_file,send_from_directory

app = Flask(__name__)
import glob

@app.route("/getImages/<path>/<int:frame_num>")
def getImage(path,frame_num):
    frames = glob.glob("frames/*png")
    frames.sort()
    return send_file(frames[frame_num], mimetype='image/png')

@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('../frontend/src/client/',
                               filename)

if __name__ == "__main__":
    app.run()
