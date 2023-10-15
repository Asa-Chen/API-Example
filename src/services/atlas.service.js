let AtlasDB =  require('../models/atlas.model.js');

class atlasService {
    constructor() {

    }
    storeData(request, response){
        let database = new AtlasDB.atlasModel();
        database.createData(request, response);
    }
    getData(request, response){
        let database = new AtlasDB.atlasModel();
        database.getData(request, response);
    }

    async getDataSocket(){
        let database = new AtlasDB.atlasModel();
        console.log("getdatasocket()")
        return database.getDataSocket();
    }
}

module.exports = {atlasService};