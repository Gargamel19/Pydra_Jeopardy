function set_interval(){
    setInterval(refresh_buzzs, 500);
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
    buzzered = fetch('http://127.0.0.1:5000/buzzes', requestOptions)
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
    fetch('http://127.0.0.1:5000/buzz?user_id='+user_id, requestOptions);
    button = document.getElementsByClassName("buzzer_button")[0]


}

function activate_buzzer(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://127.0.0.1:5000/buzz/activate', requestOptions);

}

function deactivate_buzzer(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://127.0.0.1:5000/buzz/deactivate', requestOptions);

}

function reset_button(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://127.0.0.1:5000/buzz/reset', requestOptions);

}

function change_buzzer_active(){
    buzzer_active = document.getElementById("buzzer_active")
    if(!buzzer_active.checked){
        deactivate_buzzer()
    }else{
        activate_buzzer()
    }
}