const mongo = require('mongoose');
require('dotenv').config();
const dbConnect = async()=>{
    try {
        mongo.connect(process.env.DB_CONN);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;