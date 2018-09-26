const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://ted:ted123@ds257851.mlab.com:57851/ted", { useNewUrlParser: true });


app.use(morgan('combined'));
app.use(bodyParser.json());

require('./routes')(app);


app.listen(3090, (err)=>{
    if(err){
       throw err;
    }
    console.log('serve ris running on port 3090');
})
