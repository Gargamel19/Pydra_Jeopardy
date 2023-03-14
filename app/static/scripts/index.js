function set_interval(){
    setInterval(refresh_buzzs, 500);
    setInterval(refresh_texts, 500);
    setInterval(refresh_if_text_show, 500);
    setInterval(refresh_feld, 500)
}

function make_divs_buzzed(data){
    
    player_cams = document.getElementsByClassName("player_cam")
    for (let i = 0; i < player_cams.length; i++) {
        player_cams[i].classList.remove("first");
        player_cams[i].classList.remove("second")
        player_cams[i].classList.remove("third")
        
    }
    
    for (let i = 0; i < data.length; i++) {
        player_cam = document.getElementsByClassName(data[i])[0]
        if(i === 0){
            player_cam.classList.add("first")
        }
        if(i === 1){
            player_cam.classList.add("second")
        }
        if(i === 2){
            player_cam.classList.add("third")
        }
        
    }
}

function refresh_buzzs(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://127.0.0.1:5000/buzzes', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_buzzed(data));

}

function make_divs_player_stats_divs(data){
    for (let i = 0; i < data.length; i++) {
        document.getElementById("player_points_"+data[i]["name"]).innerHTML = data[i]["punkte"]
        document.getElementById("player_text_"+data[i]["name"]).innerHTML = data[i]["text"]
    }
}

function refresh_texts(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://127.0.0.1:5000/player', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_player_stats_divs(data));
}


function make_divs_player_stats_divs_if_text_show(data){
    if (data) {
        texts = document.getElementsByClassName("player_text")
        for (let i = 0; i < texts.length; i++) {
            texts[i].classList.remove("unvisible")
        }
    }else{
        texts = document.getElementsByClassName("player_text")
        for (let i = 0; i < texts.length; i++) {
            texts[i].classList.add("unvisible")
        }
    }
}

function refresh_if_text_show(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://127.0.0.1:5000/if_text_show', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_player_stats_divs_if_text_show(data));
}

function set_visited(x, y){
    console.log("set_visited "+ x + " , " + y);
    const requestOptions = {
        method: 'PUT'
    };
    buzzered = fetch('http://127.0.0.1:5000/visited?x='+x+'&y='+y, requestOptions)
    question_x_y = document.getElementById("question_" + x + "_" + y)
    question_x_y.classList.remove("unvisible")
}

function close_question(x, y){
    console.log("close "+ x + " , " + y);
    question_x_y = document.getElementById("question_" + x + "_" + y)
    console.log(question_x_y);
    question_x_y.classList.add("unvisible")
}


function make_feld(data){
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data.length; y++) {
            feld_item = document.getElementById("feld_item_" + x + "_" + y)
            if(data[x][y] == 0){
                feld_item.classList.remove("played")
            }else{
                feld_item.classList.add("played")
            }
        }
    }
}

function refresh_feld(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://127.0.0.1:5000/feld', requestOptions)
    .then((response) => response.json())
    .then((data) => make_feld(data));
}