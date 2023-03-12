from app import app
from app import vars
from flask import render_template, redirect, request, jsonify

def get_player_from_id(id):
    for player in vars.Spieler:
        if player["id"] == id:
            return player


@app.route('/')
def index():
    return render_template("index.html", feld=vars.feld, columns=vars.columns, rows=vars.rows,
                           moderator=vars.Moderator, players=vars.Spieler)


@app.route('/generate_feld', methods=["PUT"])
def generate_feld():
    vars.feld = []
    for _x in range(len(vars.columns)):
        list = []
        for _y in range(len(vars.rows)):
            list.append(0)
        vars.feld.append(list)
    return redirect('/')

@app.route('/buzz', methods=["PUT"])
def buzz():
    user_id = request.args.get('user_id')
    player = get_player_from_id(user_id)
    if player["name"] not in vars.Buzzered and vars.button_free:
        vars.Buzzered.append(player["name"])
        print("added:", player["name"])
    return "ok"


@app.route('/buzzer/<user_id>')
def button_by_user(user_id):
    player = get_player_from_id(user_id)
    if player:
        return render_template("buzzer.html", player=player, buzzered=vars.Buzzered)
    else:
        if user_id == vars.Moderator["id"]:
            return render_template("buzzer_mod.html", player=vars.Moderator, buzzered=vars.Buzzered)
        return "error", 404
    
@app.route('/buzz/reset', methods=["PUT"])
def reset_buzzer():
    vars.Buzzered = []
    return "ok"
    
@app.route('/buzzes')
def get_buzzes():
    return jsonify(vars.Buzzered)