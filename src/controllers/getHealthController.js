async function getHealthController(req, res){
    const mongoose = require('mongoose');
    try{
        await mongoose.connect(process.env.DB_URL);
        res.status(200).send("OK");
    }
    catch{
        res.status(500).send("Server Error");
    }
}

module.exports = getHealthController;