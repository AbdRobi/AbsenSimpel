const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/absen.html')
});

router.get('/admin',(req,res)=>{
    res.sendFile(__dirname+'/public/admin.html')
});

router.get('/todo',(req,res)=>{
    res.sendFile(__dirname+'/public/todo.html')
});

module.exports = router;