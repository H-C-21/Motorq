const carSchema = require("./models/Car.js");
const userSchema = require("./models/Customer.js");
const enrollmentSchema = require("./models/Enrollments.js");

const connectDb = require('./Data/db.js');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

connectDb();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
  
  
  app.use(cors({
    origin: true
}))


// Enable CORS for your frontend
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,  // This allows cookies to be sent cross-origin
// }));

app.post('/login', async (req,res, next) => {

    const user = userSchema.findOne({email: req.body.email})
    if(user){
        if(user.password = req.body.password){
            return res.json('logged in')
        }
    }


})


app.get('/getcars', async (req, res, next) => {

    const all = {}
    const data = await carSchema.find(all);
    console.log(data) 
    res.json(data);

});

app.get('/getuserorders', async (req, res, next) => {

    const enrollments = await enrollmentSchema.find({ user: 'harshit'})
    return res.json(enrollments)

});

app.post('/setstatus', async (req, res, next) => {


});


app.post('/newenrollment', async (req, res, next) => {
    const person = new enrollmentSchema({
        user: "harshit",
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        vin: req.body.vin,
        status: false
      });
      person.save();

      return res.json({message:"User Created"})
        
});





const PORT = 8000;
app.listen(PORT, (req, res) => {
        console.log(`server is listening on PORT number ${PORT}`);
})