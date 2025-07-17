const express = require('express');
const app = express();
const api = require(__dirname+'/api');
const main = require(__dirname+'/main');

app.use(express.static('public'));
app.use(express.json());


app.use('/api', api);
app.use(main);

app.listen(3000,()=>{
    console.log('http://localhost:3000')
});