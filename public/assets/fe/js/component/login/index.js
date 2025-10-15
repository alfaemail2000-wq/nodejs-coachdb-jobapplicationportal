"use strict";
import template from "./template.js";

class UserLogin extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.root.append(template.cloneNode(true));

        this.payload={};
        this.elements = {};
        this.mapping();
        this.appendEventListeners();
    }

    mapping() {
        this.elements.form = this.root.querySelector(".form");
        //this.elements.user = this.root.querySelector(".inputUser");
        //this.elements.password = this.root.querySelector(".inputPassword");
    }

    appendEventListeners() {
        this.elements.form.addEventListener("submit", (evt) => {
            evt.preventDefault(); // prevent page reload
            console.log("Form submit event:", evt);

            // Optional: collect form data
             const formData = new FormData(this.elements.form);
            // console.log("Username:", formData.get("username"));
            // console.log("Password:", formData.get("password"));

            // You can also dispatch a custom event upwards
            this.dispatchEvent(new CustomEvent("login-submit", {
                detail: Object.fromEntries(formData),
                bubbles: true,
                composed: true
            }));
        });
    }

    // ✅ Disable login component
    disable() {
        this.elements.form.disabled = true;
        this.style.display = "none";
    }


}

customElements.define("user-login", UserLogin);

