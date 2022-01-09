const express = require('express');
const app = express();
const path = require('path');

var router = express.Router();
//app.use(router);
var bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, '/')));


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/',function(req, res){
        res.sendFile(path.resolve( __dirname + '/index.html'))
         
});



const port = process.env.WEB_PORT || 3001;
const server = app.listen(port, console.log(`Listening on port ${port}`));
module.expports=server;

