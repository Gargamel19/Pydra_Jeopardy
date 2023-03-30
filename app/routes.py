from app import app
from app import vars
from flask import render_template, redirect, request, jsonify

def get_player_index_from_id(player, id):
    for x in range(len(player)):
        if player[x]["id"] == id:
            return x
    return -1


@app.route('/')
def index():
    gamestate = vars.get_gamestate()
    feld = gamestate["feld"]
    columns = gamestate["columns"]
    rows = gamestate["rows"]
    Moderator = gamestate["Moderator"]
    Spieler = gamestate["Spieler"]
    return render_template("index.html", feld=feld, columns=columns, rows=rows,
                           moderator=Moderator, players=Spieler)


@app.route('/generate_feld', methods=["PUT"])
def generate_feld():
    gamestate = vars.get_gamestate()
    columns = gamestate["columns"]
    rows = gamestate["rows"]

    gamestate["feld"] = []

    for _x in range(len(columns)):
        list = []
        for _y in range(len(rows)):
            list.append(0)
        gamestate["feld"].append(list)
    vars.save_gamestate(gamestate)
    return redirect('/')

@app.route('/buzz', methods=["PUT"])
def buzz():
    gamestate = vars.get_gamestate()
    button_free = gamestate["button_free"]
    user_id = request.args.get('user_id')
    index = get_player_index_from_id(gamestate["Spieler"], user_id)
    if gamestate["Spieler"][index]["name"] not in gamestate["Buzzered"] and button_free:
        gamestate["Buzzered"].append(gamestate["Spieler"][index]["name"])
        vars.save_gamestate()
    return "ok"

@app.route('/set_user_message', methods=["PUT"])
def set_user_message():
    gamestate = vars.get_gamestate()
    user_id = request.args.get('user_id')
    message = request.args.get('message')
    index = get_player_index_from_id(gamestate["Spieler"], user_id)
    if gamestate["text_free"]:
        gamestate["Spieler"][index]["text"] = message
        vars.save_gamestate()
    return "ok"

@app.route('/add_points', methods=["PUT"])
def add_points():
    gamestate = vars.get_gamestate()
    user_id = request.args.get('user_id')
    points = request.args.get('points')
    index = get_player_index_from_id(gamestate["Spieler"], user_id)
    if gamestate["text_free"]:
        gamestate["Spieler"][index]["punkte"] = gamestate["Spieler"][index]["punkte"] + int(points)
        vars.save_gamestate(gamestate)
    return "ok"

@app.route('/save_cam_link', methods=["PUT"])
def save_cam_link():
    gamestate = vars.get_gamestate()
    user_id = request.args.get('user_id')
    cam_link = request.args.get('cam_link')
    index = get_player_index_from_id(gamestate["Spieler"], user_id)
    if gamestate["text_free"]:
        gamestate["Spieler"][index]["video-link"] = cam_link
        vars.save_gamestate(gamestate)
    return "ok"

@app.route('/save_cam_link_mod', methods=["PUT"])
def save_cam_link_mod():
    gamestate = vars.get_gamestate()
    cam_link = request.args.get('cam_link')
    if gamestate["text_free"]:
        gamestate["Moderator"]["video-link"] = cam_link
        vars.save_gamestate(gamestate)
    return "ok"


@app.route('/buzzer/<user_id>')
def button_by_user(user_id):
    gamestate = vars.get_gamestate()
    index = get_player_index_from_id(gamestate["Spieler"], user_id)
    if index!=-1:
        return render_template("buzzer.html", player=gamestate["Spieler"][index], buzzered=gamestate["Buzzered"])
    else:
        if user_id == gamestate["Moderator"]["id"]:
            return render_template("buzzer_mod.html", players=gamestate["Spieler"], player=gamestate["Moderator"], buzzered=gamestate["Buzzered"], buzzer_active=gamestate["button_free"], text_active=gamestate["text_show"])
        return "error", 404
    
@app.route('/buzz/reset', methods=["PUT"])
def reset_buzzer():
    gamestate = vars.get_gamestate()
    gamestate["Buzzered"] = []
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/buzz/deactivate', methods=["PUT"])
def deactivate_buzzer():
    gamestate = vars.get_gamestate()
    gamestate["button_free"] = False
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/buzz/activate', methods=["PUT"])
def activate_buzzer():
    gamestate = vars.get_gamestate()
    gamestate["button_free"] = True
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/texts/deactivate', methods=["PUT"])
def deactivate_texts():
    gamestate = vars.get_gamestate()
    gamestate["text_show"] = False
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/texts/activate', methods=["PUT"])
def activate_texts():
    gamestate = vars.get_gamestate()
    gamestate["text_show"] = True
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/texts/reset', methods=["PUT"])
def reset_texts():
    gamestate = vars.get_gamestate()
    for player in gamestate["Spieler"]:
        player["text"] = ""
    gamestate["text_show"] = True
    vars.save_gamestate(gamestate)
    return "ok"
    
@app.route('/buzzes')
def get_buzzes():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["Buzzered"])


@app.route('/player')
def get_texts():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["Spieler"])

@app.route('/moderator')
def get_moderator():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["Moderator"])

@app.route('/if_text_show')
def get_text_show():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["text_show"])

@app.route('/visited', methods=["PUT"])
def visited():
    gamestate = vars.get_gamestate()
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    if gamestate["feld"][x][y] == 1:
        gamestate["feld"][x][y] = 0
    else:
        gamestate["feld"][x][y] = 1
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/open_panel', methods=["PUT"])
def open_panel():
    gamestate = vars.get_gamestate()
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    gamestate["open_panel"] = [x, y]
    vars.save_gamestate(gamestate)
    return "ok"

@app.route('/close_panel', methods=["PUT"])
def close_panel():
    gamestate = vars.get_gamestate()
    gamestate["open_panel"] = []
    vars.save_gamestate(gamestate)
    return "ok"


@app.route('/feld')
def get_feld():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["feld"])

@app.route('/get_open_panel')
def get_open_panel():
    gamestate = vars.get_gamestate()
    return jsonify(gamestate["open_panel"])