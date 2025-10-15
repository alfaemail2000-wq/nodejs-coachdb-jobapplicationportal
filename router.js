'use strict'


import express, {request, response} from 'express';
import dataStore from "./datastore.js";
import formidable from 'formidable'
import datenbank from "../projectVadym/coachdb/datenbank.js"

const router = express.Router();

const db = datenbank.databaseinit()


function normalizeFields(fields) {
    const normalized = {};
    for (const key in fields) {
        // If the value is an array, take the first element
        normalized[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    }
    return normalized;
}

const fileList = [];

router.post('/addContent', (request, response) => {
    const form = formidable(
        {
            uploadDir: './public/uploads',
            keepExtensions: true,
            multiple: true,
        }
    );

    form.parse(request, (err, fields, files) => {


        const normalized = normalizeFields(fields);
        const dbhandler = db.use("applicants");

        // const jobsDB=db.use("jobs");
        // const jobDoc=db.get(jobId)


        dbhandler.insert(normalized).then(
            //applicant ID kriegt man hier muss noch zur jobs array verknuepfen!!!
            //result=>console.log("normalized", result)
            result => {
                return db.use("jobs")
                    .get(fields.jobId)
                    .then(
                        job => {
                            job.bewerber.push(result.id)
                            return job
                        }
                    ).then((job)=>db.use("jobs").insert(job))
            }
        );

        const fileList = [];

        files.CV_UPLOAD.forEach(file => {
            fileList.push({
                newFilename: file.newFilename,
                originalFilename: file.originalFilename
            });
        });

        // ✅ send both form data and file list together
        response.json({
            fields: normalized,
            files: fileList
        });

        console.log("FIELDS:", normalized);
        console.log("FILES:", fileList);
    });


})


router.get('/loadAllContent', (request, response) => {

    response.json(dataStore.contents)
})

router.get("/loadAlljobs", (request, response) => {
    const db = datenbank.databaseinit().use("jobs");


    //eventuel kann man mit keys und ids fetchen
    return db.list({include_docs: true}
    ).then(result => response.json(result.rows.map(row => row.doc))).then(
        console.log
    ).catch(
        console.warn
    )
})


router.get('/getApplicants', (req, res) => {
    const db = datenbank.databaseinit().use("applicants");
    db.list({include_docs: true})
        .then(result => res.json(result.rows.map(row => row.doc)))
        .catch(console.warn);
    //id jobs
});


export default router;