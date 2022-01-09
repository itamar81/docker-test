require("dotenv").config();
const bcrypt = require('bcrypt');
const express = require("express");
const app = express();
require("./config/database").connect();

//app.use(express.static(path.join(__dirname, '/')));
app.use(
        express.urlencoded({
          extended: true
        })
      );
app.use(express.json())
// importing user context
var User = require("./model/user");

// Login
app.post("/login", (req, res) => {
// our login logic goes here
});
app.post("/register", async (req, res) => {
  console.log("POST arrived");
  console.log(req.body);
    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
        
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
  // ...
app.listen(5004,()=>{

});
module.exports = app;