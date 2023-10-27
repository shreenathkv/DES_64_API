const express = require('express');
const app = express();
const serverless = require('serverless-http');
//const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DES = require('./Cipher/DESrouter');

app.use(DES);

app.get('/api/hello',(req,res)=>{
    res.send("Hello there! general Kenobi");
});

module.exports.handler = serverless(app);

//app.listen(port, () => {console.log(" Hello there running on port ",port);});

