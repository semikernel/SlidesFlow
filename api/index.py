from flask import Flask
app = Flask(__name__)

@app.route("/api/python")
# 定义一个函数，名为hello_world
def hello_world():
    # 返回一个字符串，内容为<p>Hello, World!</p>
    return "<p>Hello, World!</p>"