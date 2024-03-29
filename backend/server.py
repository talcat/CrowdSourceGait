from flask import Flask, request
from flask import send_file,send_from_directory

app = Flask(__name__)
import glob
import json

#does this work?

@app.route("/getImages/<int:seq_num>/<int:vid_num>/<int:frame_num>")
def getImage(seq_num, vid_num, frame_num):
    frames = glob.glob("frames/*png")
    frames.sort()
    return send_file(frames[frame_num], mimetype='image/png')

@app.route("/")
def hack():
    return send_file('../frontend/src/client/index.html')

@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('../frontend/src/client/',
                               filename)


# get frame data
@app.route('/getFrameData/<int:seq_num>/<int:vid_num>/<int:frame_num>',methods=['GET'])
def foo(seq_num, vid_num, frame_num):
    return '{"foo":true, "bar":false}'

@app.route('/labelFrame/<int:seq_num>/<int:vid_num>/<int:frame_num>',methods=['POST'])
def post_data(seq_num, vid_num, frame_num):
    labels = json.loads(request.data)
    print labels
    return str(request.data)

if __name__ == "__main__":
    app.run()
