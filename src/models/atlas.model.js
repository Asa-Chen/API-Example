const Pool = require('pg').Pool;


class atlasModel {

    constructor() {

    }
    createConnection(){
        return new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'mysecretpassword',
            port: 5432,
        });
    }

    createData(request, response) {
        let pool = this.createConnection();
        let pingID = request.body.pingnum;
        let pingTest = request.body.pingtest;
        let query = 'INSERT INTO atlasThree(pingid, pingtest) VALUES (' + pingID + ', \'' + pingTest + '\' )';
        pool.query(query, (error, result) => {
            if (error) {
                console.log(error);
                console.log("Invalid DATACREATE!");
                response.status(500).json({status: "failure"});
            } else {
                response.status(200).json({status: "success"});
            }
        });
        pool.end();
    }

    getData(request, response){
        let pool = this.createConnection();
        pool.query('SELECT * FROM atlasThree', (error, result) => {
            if (error) {
                throw error;
            }
            response.status(200).json(result.rows);
        });
        pool.end();
    }

    async getDataSocket(options) {
        let pool = this.createConnection();
        const client = await pool.connect(options)
        const result = await client.query({
            rowMode: 'json',
            text: 'SELECT * FROM atlasThree;',
        })
        //console.log(result);
        let data = result.rows;
        await pool.end();
        return data;
    }

}


module.exports = {atlasModel};