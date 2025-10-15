// Container erstellen
const template = document.createElement("div");
template.className = "container";

// Formular erstellen
const form = document.createElement("form");
form.className = "form";
form.id = "loginForm";
form.method = "POST";
form.action = "/login";

// Input: Username
const inputUser = document.createElement("input");
inputUser.className = "inputUser"; // ✅ Match case
inputUser.type = "text";
inputUser.name = "username";

// Input: Passwort
const inputPassword = document.createElement("input");
inputPassword.className = "inputPassword";
inputPassword.type = "password";
inputPassword.name = "password";

// Button
const btn = document.createElement("button");
btn.className = "btn";
btn.type = "submit";
btn.textContent = "Login";

// Elemente einfügen
form.append(inputUser, inputPassword, btn);
template.append(form);

// Style
const elStyle = document.createElement("style");
let localURL = new URL(import.meta.url).pathname;
let indexLastSlash = localURL.lastIndexOf("/");
localURL = localURL.substring(0, indexLastSlash + 1);
localURL += "styles.css";
elStyle.innerHTML = `@import '${localURL}'`;
template.append(elStyle);

export default template;
