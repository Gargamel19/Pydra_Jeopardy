function set_interval(){
    setInterval(refresh_buzzs, 500);
}

function generate_feld(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://127.0.0.1:5000/generate_feld', requestOptions);

}

function make_divs(data){
    
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
    .then((data) => make_divs(data));

}