// creating server
var express = require("express");// importing express
var mdb = require("mongoose");
var User = require("./login.js")
var Sell = require("./sell.js")
var View = require("./viewInterest.js")
var bodyParser = require("body-parser");
var cors = require("cors")   // cors is a package to refer all urls 
var app = express();
var allowedOrigin = ["http://localhost:3000"]
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST"]
  })
);
app.use(bodyParser.json());
// var login = require("./login.js")
mdb.connect("mongodb+srv://aravindan2701:passwordamma@mern.v8tmc.mongodb.net/ReusedProducts", {})
var db = mdb.connection;
db.once('open', function () {
  console.log("Connection to MongoDb is successful")
})
app.get("/", (req, res) => {
  res.send("Backend  connected  { { {")
})
app.post("/signup", (req, res) => {
  try {
    var { name, email, password, number } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      number: number,
    });
    newUser.save().then(() => {
      console.log("User Added");
    });
    res.json({ message: "User Added" });
  } catch (error) {
    console.log(error);
    res.json({ error: "User unable to add" });
  }
});
app.post("/login", async (req, res) => {

  try {
    var { email, password } = req.body;
    var existingUser = await User.findOne({ email: email })
    if (existingUser) {
      if (password === existingUser.password) {
        return res.json({ loggedIn: true, message: "Login Successful" })
      }
      else {
        return res.json({ loggedIn: false, message: "Invalid Cred" })
      }
    }
    else {
      return res.json({ loggedIn: false, message: "User Does not exists" })
    }
  } catch (error) {
    console.log(error);
    return res.json({ loggedIn: false, message: "Internal Server Error" })
  }
});

app.post("/sell", (req, res) => {
  try {
    var { user, category, type, name, describe, age, quantity, image, price, location, offer } = req.body;
    const newSell = new Sell({
      user: user,
      category: category,
      type: type,
      name: name,
      describe: describe,
      age: age,
      quantity: quantity,
      image: image,
      price: price,
      location: location,
      offer: offer,
    });
    newSell.save().then(() => {
      console.log("Product added");
    });
    res.json({ message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Product unable to add" });
  }


});

app.get("/display", async (req, res) => {
  const q = req.query.q;
  const keys = ['category', 'type', 'name']
  const displayData = await Sell.find({});
  const filteredData = displayData.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(q))
  );

  res.json(filteredData);

})
app.get("/mine", async (req, res) => {
  const q = req.query.q;
  console.log(q);

  const keys = ["user"];

  const displayData = await Sell.find({});

  const filteredData = displayData.filter((item) =>
    keys.some((key) => item[key].includes(q))
  );

  res.json(filteredData);

});

app.post("/viewInterest", (req, res) => {
  try {
    var { owner, viewer, p_name, describe } = req.body;
    const newUser = new View({
      owner: owner,
      viewer: viewer,
      p_name: p_name,
      describe: describe,
    });
    newUser.save().then(() => {
      console.log("User Added");
    });
    res.json({ message: "User Added" });
  } catch (error) {
    console.log(error);
    res.json({ error: "User unable to add" });
  }
});

app.get("/view", async (req, res) => {
  const interests = await View.find({});
  res.send({ status: "ok", infos: interests });

})
app.post("/delete",(req, res) => {

  try {
    var { describe, user } = req.body;
     Sell.deleteOne({ describe:describe , user:user })
  } catch (error) {
    console.log(error);
    return res.json({ loggedIn: false, message: "Internal Server Error" })
  }
});



app.listen(3002)
console.log("backend connected")


