import ajax from "./ajax.js";
import elements from "./elements.js"

const dom={



    domMapping()
    {
        elements.formAddContent=document.querySelector('#formAddContent')
    },
    appendEventlisteners()
    {
        elements.formAddContent.addEventListener("submit", ajax.submitNewContent)
    }

}

export default dom;