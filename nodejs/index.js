const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/',function(req, res){
        res.sendFile(path.resolve( __dirname + '/../website/index.html'))

});


const port = process.env.PORT || 3000;
const server = app.listen(port, console.log(`Listening on port ${port}`));
module.expports=server;

