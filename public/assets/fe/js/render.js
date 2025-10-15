'use strict'

import dom from "./dom.js";
import bewerberformular from "./component/bewerberformular.js";

const pastelColors = [
    '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb',
    '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8'
];

const render = {
    //applicants: [],

    contents(payload, parent, applicantsdata) {
        parent.innerHTML = "";  // clear before rendering new content
        render.applicants = applicantsdata;
        console.log("THIS APPLICANTS ", this.applicants)

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

        // ✅ Anzahl Bewerber aus payload oder aus applicants array
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
