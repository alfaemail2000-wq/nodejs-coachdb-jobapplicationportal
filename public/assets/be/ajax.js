import elements from "./elements.js";


const ajax = {



    submitNewContent(evt) {
        evt.preventDefault();
        console.log("Submit");

        const body = new FormData(elements.formAddContent);


        fetch("/addContent", {
            method: "POST",
            body
        })
            //das bekommt man über nettzwerk ubertragen von raouter post aus form.parse beim submitten
            .then(res => res.json())
            .then(data => {
                // db.use("applicants")
                // db.insert(data)
                console.log("Response from from over router:", data);
            })
            .catch(console.warn);
    }}


    export default ajax;