const uploadFile = async (e) => {
    //Stops form from sending request itself
    e.preventDefault();

    const response = await fetch('/upload', {
        method: 'POST',
        //Compiles form data into proper body format as if it uploaded from form
        body: new FormData(e.target)
    });

    const text = await response.text();
    document.getElementById('messages').innerText = text;

    return false;
}

const retrieveFile = async (e) => {
    e.preventDefault();

    const id = document.getElementById('_id').ariaValueMax;
    const display = document.getElementById('display');

    display.innerHTML = `<img src=/retrieve?_id=${id}>`;

    return false;
}

const init = () => {
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', uploadFile);

    const retrieveForm = document.getElementById('retrieveForm');
    retrieveForm.addEventListener('submit', retrieveFile);
}

window.onload = init;