from flask import Flask, request, g, render_template, make_response

app = Flask(__name__)

@app.before_request
def before_request():
    print("before_request() called")

@app.after_request
def after_request(response):
    print("after_request() called")
    return response


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