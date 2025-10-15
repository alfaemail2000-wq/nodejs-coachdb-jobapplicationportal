import bewerberformular from "./bewerberformular.js";

const ajax = {
    submitNewContent(evt) {
        evt.preventDefault();
        console.log("Submit");

        // 🟡 DAS ist der Trick: Formular direkt vom Event holen
        const form = evt.target;

        const body = new FormData(form);


        console.log("Ausgewählte Job ID:", body.get("jobId"));

        fetch("/addContent", {
            method: "POST",
            body
        })
            .then(res => res.json())
            .then(data => {
                //bewerberformular.renderResult(data);
                console.log("Response from router:", data);
                document.querySelector('.modal-overlay')?.remove();
            })

            .catch(console.warn);
    }
};

export default ajax;
