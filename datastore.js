const dataStore={

    contents:[],

    extractInputData(formdata){
        let data={};
        Object.entries(formdata)
            .forEach(([key,value])=>data[key]=value[0]

    )
        return data;

    },
    addContent(data){
        let formData=dataStore.extractInputData(data)
        dataStore.contents.push(formData)


    }


}

export default dataStore;