import json

filename = "gamestate.json"

def read_gamestate():
    with open(filename, "r") as file:
        return json.loads(file.readline())

def get_value(key):
    gamestate = read_gamestate()
    return gamestate[key]

def get_gamestate():
    gamestate = read_gamestate()
    return gamestate

def save_gamestate(gamestate):
    with open(filename, "w") as file:
        return file.writelines(json.dumps(gamestate))
