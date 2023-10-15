let server = require("express/lib/router");
let AtlasService = require('../services/atlas.service.js');

    function getResponse(request, res){
        let payload = request.body;
        console.log(payload);
        let service = new AtlasService.atlasService();
        service.getData(request, res);
        //res.json( {message: "GET atlas"} );
    }
    function postResponse(request, res){
        let payload = request.body;
        console.log(payload);
        let service = new atlasService.constructor();
        service.storeData(request, res);
        //res.json( {message: "GET atlas"} );
    }


module.exports = {getResponse, postResponse};
