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

@app.route('/set_user_message', methods=["PUT"])
def set_user_message():
    user_id = request.args.get('user_id')
    message = request.args.get('message')
    player = get_player_from_id(user_id)
    if vars.text_free:
        player["text"] = message
    return "ok"

@app.route('/add_points', methods=["PUT"])
def add_points():
    user_id = request.args.get('user_id')
    points = request.args.get('points')
    player = get_player_from_id(user_id)
    if vars.text_free:
        player["punkte"] = player["punkte"] + int(points)
    return "ok"

@app.route('/save_cam_link', methods=["PUT"])
def save_cam_link():
    user_id = request.args.get('user_id')
    cam_link = request.args.get('cam_link')
    player = get_player_from_id(user_id)
    if vars.text_free:
        player["video-link"] = cam_link
    return "ok"

@app.route('/save_cam_link_mod', methods=["PUT"])
def save_cam_link_mod():
    cam_link = request.args.get('cam_link')
    if vars.text_free:
        vars.Moderator["video-link"] = cam_link
    return "ok"


@app.route('/buzzer/<user_id>')
def button_by_user(user_id):
    player = get_player_from_id(user_id)
    if player:
        return render_template("buzzer.html", player=player, buzzered=vars.Buzzered)
    else:
        if user_id == vars.Moderator["id"]:
            return render_template("buzzer_mod.html", players=vars.Spieler, player=vars.Moderator, buzzered=vars.Buzzered, buzzer_active=vars.button_free, text_active=vars.text_show)
        return "error", 404
    
@app.route('/buzz/reset', methods=["PUT"])
def reset_buzzer():
    vars.Buzzered = []
    return "ok"

@app.route('/buzz/deactivate', methods=["PUT"])
def deactivate_buzzer():
    vars.button_free = False
    return "ok"

@app.route('/buzz/activate', methods=["PUT"])
def activate_buzzer():
    vars.button_free = True
    return "ok"

@app.route('/texts/deactivate', methods=["PUT"])
def deactivate_texts():
    vars.text_show = False
    return "ok"

@app.route('/texts/activate', methods=["PUT"])
def activate_texts():
    vars.text_show = True
    return "ok"

@app.route('/texts/reset', methods=["PUT"])
def reset_texts():
    for player in vars.Spieler:
        player["text"] = ""
    vars.text_show = True
    return "ok"
    
@app.route('/buzzes')
def get_buzzes():
    return jsonify(vars.Buzzered)


@app.route('/player')
def get_texts():
    return jsonify(vars.Spieler)

@app.route('/moderator')
def get_moderator():
    return jsonify(vars.Moderator)

@app.route('/if_text_show')
def get_text_show():
    return jsonify(vars.text_show)

@app.route('/visited', methods=["PUT"])
def visited():
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    if vars.feld[x][y] == 1:
        vars.feld[x][y] = 0
    else:
        vars.feld[x][y] = 1
    return "ok"

@app.route('/open_panel', methods=["PUT"])
def open_panel():
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    vars.open_panel = [x, y]
    return "ok"

@app.route('/close_panel', methods=["PUT"])
def close_panel():
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    vars.open_panel = []
    return "ok"


@app.route('/feld')
def get_feld():
    return jsonify(vars.feld)

@app.route('/get_open_panel')
def get_open_panel():
    return jsonify(vars.open_panel)