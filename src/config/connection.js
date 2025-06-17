const mongoose = require('mongoose');
require('dotenv').config();

class Connection {
    static #connect = null

    static async connect(){
        if(Connection.#connect === null){
            try {
                const conn = await mongoose.connect(process.env.CONNECTSTRING)
                console.log('Connected to mongoDB');
                Connection.#connect = conn; 
            }catch(error){
                console.error(error);
                throw error
            }
        }
        return Connection.#connect;
    }
}

module.exports = Connection