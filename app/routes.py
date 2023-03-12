from app import app
from app import vars
from flask import render_template, redirect

@app.route('/')
def index():

    return render_template("index.html", feld=vars.feld, columns=vars.columns, rows=vars.rows)


@app.route('/generate_feld', methods=["PUT"])
def generate_feld():
    vars.feld = []
    for _x in range(len(vars.rows)):
        list = []
        for _y in range(len(vars.columns)):
            list.append(0)
        vars.feld.append(list)
    return redirect('/')
            