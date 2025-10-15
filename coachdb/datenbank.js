'use strict'
import nano from "nano";





const datenbank={

    dbName:["applicants","jobs"],
    dbUser:"alfa",
    dbPass:"alfa",
    dbUrl: "127.0.0.1:5984",


    databaseinit(){
        //console.log("c,onnection started")
        const connection =nano(`http://${this.dbUser}:${this.dbPass}@${this.dbUrl}`)

        return connection.db
    }


}

export default datenbank