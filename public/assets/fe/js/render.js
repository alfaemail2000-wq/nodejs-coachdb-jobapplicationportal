'use strict'

import dom from "./dom.js";
import bewerberformular from "./component/bewerberformular.js";

const pastelColors = [
    '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb',
    '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8'
];

const render = {
    contents(payload, parent, applicantsdata) {
        parent.innerHTML = "";  // clear before rendering new content
        render.applicants = applicantsdata;
        console.log("THIS APPLICANTS ", this.applicants)

        if (payload.length > 0) {
            const header = document.createElement("div");
            header.className = "jobs-header";

            const title = document.createElement("h1");
            title.textContent = "📢 Aktuelle Jobs";
            header.appendChild(title);

            const logoutbtn = document.createElement("button");
            logoutbtn.textContent = "Logout";
            logoutbtn.className = "logout-btn";
            header.appendChild(logoutbtn);

            parent.appendChild(header);

            logoutbtn.addEventListener("click", () => {
                parent.innerHTML = "";
                document.querySelector('user-login').style.display = "block";
                document.querySelector('#jobSearch').style.display = "none";
            });
        }

        payload.forEach(job => {
            render.content(job, parent);
        });
    },

    content(payload, parent) {
        const container = dom.create({
            parent,
            cssClassName: 'job-container'
        });

        const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];

        dom.create({
            parent: container,
            tagName: 'h2',
            content: payload.jobname,
            cssClassName: 'job-title',
            styles: { color }
        });

        dom.create({
            parent: container,
            tagName: 'p',
            content: payload.jobdescription,
            cssClassName: 'job-description'
        });

        dom.create({
            parent: container,
            tagName: 'p',
            content: payload.anforderungen,
            cssClassName: 'job-requirements'
        });

        dom.create({
            parent: container,
            tagName: 'p',
            content: payload.gehalt,
            cssClassName: 'job-requirements'
        });

        dom.create({
            parent: container,
            tagName: 'p',
            content: payload._id
        });

        const matchingApplicants = render.applicants.filter(a => a.jobId === payload._id);
        dom.create({
            parent: container,
            tagName: "p",
            content: `${matchingApplicants.length} Bewerber`
        });

        const btn = document.createElement("button");
        btn.textContent = "Bewerben";
        btn.className = "btn primary";
        container.appendChild(btn);

        btn.addEventListener('click', () => {
            bewerberformular.bewerberformular(payload._id);
        });
    }
};

export default render;
