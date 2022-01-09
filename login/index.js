const url = require('url');
const proxy = require('express-http-proxy');
const express = require('express');
const bcrypt=require('bcrypt');
const app = express();
var User = require("./model/user");
const path = require('path');
const { threadId } = require('worker_threads');
const WEB_PORT=process.env.WEB_PORT || 3001;
const WEBSITE_HOST=process.env.WEB_IP || "localhost";

const myemail = "a@a.com";
const my_pass = "123";
const enc_pass=bcrypt.hashSync(my_pass,10);
User.insertMany([{ "email": 'i@i.com' , "password": enc_pass}], function(err) {

});
app.use(express.static(path.join(__dirname, '/')));
app.use(express.urlencoded({extended: true}));

async function createUser(email, password) {
        User.create({
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: password,
        });
}

app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/index.html'))
        console.log(res.body);
});
app.get('/', function (req, res) {
        let username = res.body.email;
        console.log(username);
});

app.post('/auth', async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
         if (email == myemail) {
                return   res.redirect(`http://${WEBSITE_HOST}:${WEB_PORT}`);
        }
        
        await User.findOne({ "email": email }, function (err, data) {
                console.log(data);
               if (data&&data.email) {
                return  res.redirect(`http://${WEBSITE_HOST}:${WEB_PORT}`);
                }
                else{
                        return res.status(409).send("User not Exist.");
                }
        }).clone();
        //return false;
        });

const port = process.env.LOGIN_PORT || 3000;
const server = app.listen(port, console.log(`Listening on port ${port}`));
module.expports = server;

