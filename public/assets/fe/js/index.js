'use strict'

import dom from "./dom.js";
import ajax from "./ajax.js";
import render from "./render.js";
import elements from "./elements.js";

let allJobs = [];
let applicantsdata = [];

const init = () => {
    // Load applicants immediately
    const searchInput = document.querySelector("#jobSearch");
    searchInput.style.display = "none";
    fetch('/getApplicants')
        .then(res => res.json())
        .then(data => {
            applicantsdata = data;
            console.log("Applicants:", data);
        })
        .catch(console.warn);

    dom.dommapping();

    // Job search filter (works after jobs are loaded)

    searchInput.addEventListener("input", (evt) => {
        const query = evt.target.value.toLowerCase();
        const filteredJobs = allJobs.filter(job =>
            job.jobname.toLowerCase().includes(query)
        );

        elements.main.innerHTML = "";
        render.contents(filteredJobs, elements.main, applicantsdata);
    });

    // Custom login event
    const customlogin = document.querySelector('user-login');
    customlogin.addEventListener("login-submit", (evt) => {
        console.log("Login event:", evt.detail);

        fetch("/getUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(evt.detail)  // evt.detail = { username: "vadim" }
        })
            .then(res => res.json())
            .then(user => {
                if (user.user === evt.detail.username) {
                    // Disable login component after successful login
                    customlogin.disable();
                    console.log("Candidate correct:", user.user);
                    searchInput.style.display = "block";

                    // Load jobs after successful login
                    ajax.loadAlljobs()
                        .then(payload => {
                            allJobs = payload;
                            render.contents(allJobs, elements.main, applicantsdata);
                        })
                        .catch(console.warn);

                } else {
                    console.log("Candidate not found:", evt.detail.username);
                }
            })
            .catch(err => console.error("Fetch error:", err));
    });
};

init();
