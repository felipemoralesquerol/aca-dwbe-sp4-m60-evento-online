require("dotenv").config();
const assert = require("chai").assert;
const fetch = require("node-fetch");
const urlAPI = process.env.APP_URL + ":" + process.env.APP_PORT + "/api";

describe("Probando API Auth", () => {
  it("1.API responde 403 (sin token)", async () => {
    await fetch(urlAPI + "/auth/me").then((response) => {
      //console.log(response.status);
      assert.equal(response.status, 403);
    });
  });

  it("2.API include text me (sin token)", async () => {
    await fetch(urlAPI + "/auth/me")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json)
        assert.deepEqual(json, {
          status: "Acceso denegado o credenciales incorrectas.",
        });
      });
  });

  it("3.API signin and me OK", async () => {
    // LOGIN
    let response = await fetch(urlAPI + "/auth/signin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        usuario: "admin",
        password: "pass1234",
        email: "admin@example.com",
      }),
    });
    let json = await response.json();
    token = json.token;
    //console.log(json.status)
    assert.deepEqual(json.status, "signin", 'Se espera status: "signin"');
    assert.exists(token, "Se espera un token en la respuesta");

    //ME
    response = await fetch(urlAPI + "/auth/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    });
    json = await response.json();
    //console.log(json)
    assert.deepEqual(json.status, "me", 'Se espera status: "me"');
    assert.exists(json.data, "Se espera la clave data en la respuesta");
    assert.deepEqual(json.data.username, "admin", "Se espera el usuario admin");
    assert.deepEqual(
      json.data.email,
      "admin@example.com",
      "Se espera el email admin@example.com"
    );
  });

  it("4.API signin denied", async () => {
    let response = await fetch(urlAPI + "/auth/signin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        usuario: "admin",
        password: "otraclavecualquiera",
        email: "admin@example.com",
      }),
    });
    let json = await response.json();
    token = json.token;
    //console.log(json);
    assert.equal(response.status, 401);
    assert.notDeepEqual(
      json.status,
      "'Error de credenciales. Acceso denegado'",
      'Se espera status: "Error de credenciales. Acceso denegado"'
    );
    assert.notExists(token, "Se espera un token en la respuesta");
  });


});
