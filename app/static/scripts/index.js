

function generate_feld(){

    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://127.0.0.1:5000/generate_feld', requestOptions);

}