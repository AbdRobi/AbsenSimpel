const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/absen.html')
});

router.get('/todo',(req,res)=>{
    res.sendFile(__dirname+'/public/info.html')
});

module.exports = router;