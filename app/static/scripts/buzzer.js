function set_interval(){
    setInterval(refresh_buzzs, 500);
    setInterval(refresh_texts_mod, 500);
}

function generate_feld(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/generate_feld', requestOptions);

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function make_divs(data){
    buzzered_names = document.getElementsByClassName("buzzered_names")[0]
    
    removeAllChildNodes(buzzered_names)
    for (const x in data) {
        buzzered_name_container = document.createElement("div");
        buzzered_name_container.classList.add("buzzered_name_container")
        buzzered_name = document.createElement("div");
        buzzered_name.classList.add("buzzered_name")
        buzzered_name.innerHTML = data[x]

        buzzered_name_container.appendChild(buzzered_name)
        buzzered_names.appendChild(buzzered_name_container)

    }
}

function refresh_buzzs(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://h2922469.stratoserver.net:43173/buzzes', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs(data));

}

function buzz(user_id){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/buzz?user_id='+user_id, requestOptions);
}

function activate_buzzer(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/buzz/activate', requestOptions);

}

function deactivate_buzzer(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/buzz/deactivate', requestOptions);

}

function activate_texts(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/texts/activate', requestOptions);

}

function deactivate_texts(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/texts/deactivate', requestOptions);

}

function reset_buzz_button(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/buzz/reset', requestOptions);

}

function reset_texts_button(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/texts/reset', requestOptions);

}

function change_buzzer_active(){
    buzzer_active = document.getElementById("buzzer_active")
    if(!buzzer_active.checked){
        deactivate_buzzer()
    }else{
        activate_buzzer()
    }
}

function change_text_active(){
    text_active = document.getElementById("text_active")
    if(!text_active.checked){
        deactivate_texts()
    }else{
        activate_texts()
    }
}

function send_message(user_id){
    user_input_value = document.getElementById("user_input").value
    send_message_to_be(user_id, user_input_value)
}

function send_message_to_be(user_id, message){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/set_user_message?user_id='+user_id+'&message=' + message, requestOptions);
}

function give_player_points(user_id, points){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/add_points?user_id='+user_id+'&points=' + points, requestOptions);
}

function save_cam_link(user_name, user_id){

    cam_link_input = document.getElementById("camlink_" + user_name).value

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/save_cam_link?user_id='+user_id+'&cam_link=' + cam_link_input, requestOptions);
}

function save_cam_link_moderator(){

    cam_link_input = document.getElementById("camlink_mod").value

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://h2922469.stratoserver.net:43173/save_cam_link_mod?cam_link=' + cam_link_input, requestOptions);
}

function make_divs_texts_mod(players){
    for (const x in players) {
        const element = players[x]
        document.getElementById("player_text_div_" + element["name"]).innerHTML = element["text"]
    }
}

function refresh_texts_mod(){
    const requestOptions = {
        method: 'GET'
    };
    buzzered = fetch('http://h2922469.stratoserver.net:43173/player', requestOptions)
    .then((response) => response.json())
    .then((data) => make_divs_texts_mod(data));


}