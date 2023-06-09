//url = "http://localhost:43173"
url = "https://h2922469.stratoserver.net"

function set_interval(){
    setInterval(refresh_buzzs, 500);
    setInterval(refresh_texts, 500);
    setInterval(refresh_if_text_show, 500);
    setInterval(refresh_feld, 500);
    setInterval(refresh_player_cams, 500);
    setInterval(refresh_moderators_cams, 500);
    setInterval(get_open_panel, 500);
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
    buzzered = fetch(url+'/buzzes', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_buzzed(data))
    .catch(function() {
        console.log("error");
    });

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
    buzzered = fetch(url+'/player', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_player_stats_divs(data))
    .catch(function() {
        console.log("error");
    });
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
    buzzered = fetch(url+'/if_text_show', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_player_stats_divs_if_text_show(data))
    .catch(function() {
        console.log("error");
    });
}

function open_this_panel(x, y){
    toggle_visibility(x, y)
    open_panel(x, y)

}
function close_this_panel(x, y){
    close_panel(x, y)

}

function toggle_visibility(x, y){
    const requestOptions = {
        method: 'PUT'
    };
    buzzered = fetch(url+'/visited?x='+x+'&y='+y, requestOptions)
}

function close_panel(x, y){
    const requestOptions = {
        method: 'PUT'
    };
    buzzered = fetch(url+'/close_panel?x='+x+'&y='+y, requestOptions)
    .catch(function() {
        console.log("error");
    });
}

function open_panel(x, y){
    const requestOptions = {
        method: 'PUT'
    };
    buzzered = fetch(url+'/open_panel?x='+x+'&y='+y, requestOptions)
    .catch(function() {
        console.log("error");
    });
}

function open_panel_make_div(data){
    elements = document.getElementsByClassName("question_panel")
    for (let i = 0; i < elements.length; i++) {
        element = elements[i]
        if(!element.classList.contains("unvisible")){
            if(element.id === "question_" + data[0] + "_" + data[1]){
            }else{
                element.classList.add("unvisible")
            }
        }
        if(element.id === "question_" + data[0] + "_" + data[1]){
            element.classList.remove("unvisible")
        }
    }
    
}

function get_open_panel(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch(url+'/get_open_panel', requestOptions)
    .then((response) => response.json())
    .then((data) => open_panel_make_div(data))
    .catch(function() {
        console.log("error");
    });
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
    buzzered = fetch(url+'/feld', requestOptions)
    .then((response) => response.json())
    .then((data) => make_feld(data))
    .catch(function() {
        console.log("error");
    });
}

function make_feld_cams(){

}


function refresh_cams(players){
    for (let x = 0; x < players.length; x++) {
        const element = players[x];
        obj = document.getElementById("player_cam_" + element["name"])
        if(element["video-link"] !== obj.src){
            obj.src = element["video-link"]
        }
    }
}

function refresh_mod_cam(moderator){
    if(moderator["video-link"] !== document.getElementById("mod_cam").src){
        document.getElementById("mod_cam").src = moderator["video-link"]
    }
}


function refresh_player_cams(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch(url+'/player', requestOptions)
    .then((response) => response.json())
    .then((data) => (refresh_cams(data)))
    .catch(function() {
        console.log("error");
    });
}

function refresh_moderators_cams(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch(url+'/moderator', requestOptions)
    .then((response) => response.json())
    .then((data) => (refresh_mod_cam(data)))
    .catch(function() {
        console.log("error");
    });
}