const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = mongoose.connect('mongodb+srv://charshit166:MeraJootaJapani@cluster0.cthvobn.mongodb.net/motorq?retryWrites=true&w=majority');
        console.log('connection established');
    }
    catch (error) {
        console.log('Error occured');
    }

}
module.exports = connectDb;