import dom from "./dom.js";
import ajax from "./ajax.js";
import render from "./render.js";
import elements from "./elements.js";

let allJobs=[] ;
let applicantsdata=[] ;

const init = () => {
    // Load applicants first
    fetch('/getApplicants')
        .then(res => res.json())
        .then(data => {
            applicantsdata = data;
            console.log("Applicants:", data);
            return ajax.loadAlljobs();
        })
        .then((payload) => {
            allJobs = payload;
            render.contents(allJobs, elements.main, applicantsdata);
        })
        .catch(console.warn);

    dom.dommapping();

    const input = document.querySelector("#jobSearch");
    input.addEventListener("input", (evt) => {
        const query = evt.target.value.toLowerCase();
        const filteredJobs = allJobs.filter(job =>
            job.jobname.toLowerCase().includes(query)
        );

        elements.main.innerHTML = "";
        render.contents(filteredJobs, elements.main, applicantsdata);

    });
};

init();
setTimeout(()=>{
    console.log("AFTER INIT Applicants:", applicantsdata);
    console.log("AFTER INIT ALL JOBS:", allJobs);

},3000)


