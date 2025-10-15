const ajax = {

    // loadAllContent() {
    //
    //     return fetch('/loadAllContent').then(
    //         res => {
    //             console.log("2nd res before parsing", res)
    //            return res.json()
    //         }
    //     ).then(data => {
    //         console.log("3nd res after parsing", data)
    //         return data
    //     })
    // },

    loadAlljobs(){
        return fetch('/loadAlljobs').then(
            res=>{
                console.log("jobs from /loadAlljobs", res)
                return res.json()
            }).then(jobs=>{
            console.log("json jobs",jobs)
            return jobs

        })

    }


}

export default ajax