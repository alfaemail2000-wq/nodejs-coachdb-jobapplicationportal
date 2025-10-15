'use strict'


import cors from "cors";
import express from 'express';
import router from "./router.js"
import datenbank from "./coachdb/datenbank.js";
import jobsdataset from "./coachdb/jobsdataset.json" with {type:"json"}



const server = express();

server.use(express.json());
server.use(cors())

// Log every incoming request
server.use((req, res, next) => {
    console.log(`🌐 Incoming request: ${req.method} ${req.url}`);
    next();
});

server.use(express.static('public', {
    extensions:['html']
}));



server.use(router)

const init = () => {
    server.listen(80, err => {
		if (err) console.log(err);
	    else console.log('Server läuft');
    });
    const db=datenbank.databaseinit();



    //list bei start

    let dbName=datenbank.dbName;
    dbName.forEach((item)=>{

        db.list().then(

            result=>{
                if(!result.includes(item)){
                    return db.create(item);
                }
            }).then(
            ()=> {
                const jobs = db.use("jobs");
                return jobs.list()

            }).then(
            (list)=>{
                const jobs = db.use("jobs");
                console.log(list)
                if(list.rows.length==0){

                    return Promise.all(jobsdataset.map(jobsitem=>{
                        jobsitem.bewerber=[]
                        jobs.insert(jobsitem)

                    }))
                }
                else
                console.log("the jobs is already filled")
            }
        )



            .then(
            console.log
        ).catch(
            console.warn
        )

    })




    console.log("DBTEST",db)
}

init();




