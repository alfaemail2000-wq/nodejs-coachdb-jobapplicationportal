"use strict";
import template from "./template.js";


class myComponent extends HTMLElement {
    constructor(
    ) {
        super();

        this.root=this.attachShadow({mode:"open"})

        this.root.append(template.cloneNode(true))



    }




}

customElements.define("my-component", myComponent)