const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const ejs=require("ejs")
const jquery=require("jquery");
var $=require("jquery")
//bring all routes
const auth = require("./routes/api/auth");


const app = express();

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//connect to db
mongoose.connect('mongodb://localhost:27017/covidtrack',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log("db not connected"))

app.use(express.static('./public'))
app.set('view engine',"ejs");
//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route

//actual routes
app.use("/api", auth);
//app.use("/api/questions", questions);
//app.use("/api/profile", profile);

const port = process.env.PORT || 3001;

app.get('/',(req,res)=>{
  res.render('form')
})
app.get('/api/signin',(req,res)=>{
  res.render('test')
})

app.listen(port, () => console.log(`App is running at ${port}`));


