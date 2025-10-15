// Container erstellen
const template = document.createElement("div");
template.className = "container";

// Formular erstellen
const form = document.createElement("form");
form.id = "loginForm";                // ID setzen
form.name = "loginForm";              // Name setzen (optional)
form.method = "POST";                 // Methode (z.B. POST)
form.action = "/login";               // Ziel (z.B. Server-Route)

// Input: Username
const inputUser = document.createElement("input");
inputUser.type = "text";
inputUser.name = "username";


// Input: Passwort
const inputPassword = document.createElement("input");
inputPassword.type = "password";
inputPassword.name = "password";
//

// Button
const btn = document.createElement("button");
btn.type = "submit";
btn.textContent = "Login";

// Elemente einfügen
form.append(inputUser, inputPassword, btn);
template.append(form);





export default template;
