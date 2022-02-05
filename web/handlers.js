function handlerValidarRegister(e) {
    console.log('Validar Register');

    e.preventDefault();
    const form = document.getElementById("form");
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const email = form.email.value;
    const password = form.password.value;
    const username = nombre + '.' + apellido;

    if (nombre === "" || apellido === "" || email === "" || password === "") {
        alert("Todos los campos son requeridos");
        return false;
    }

    // TODO: Incluir validaciones de longitudes de los campos

    console.log('Registrar usuario');

    const url = 'http://localhost:5000/api/auth/signup';

    const dataPOST = {
        username,
        password,
        nombre,
        apellido,
        email: email,
        "direccionEnvio": "",
        "telefono": ""
    };

    var statusCode = 200;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataPOST),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(info => {
            console.log(info);
            if (info.status === 200 || info.status === 201) {
                window.location.href = "registerOK.html";
            } else {
                const messaggeError = document.getElementById("messageError");
                messaggeError.innerText = info.body.status;
            }
        });
};




