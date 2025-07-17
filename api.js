const express = require('express');
const router = express.Router();
const db = require(__dirname+'/conn')
const cors = require("cors");


router.use(cors());

// Menampilkan berdasarkan a-z CL
router.get('/listcl-az',(req,res)=>{
    const sql = `SELECT * FROM absencl ORDER BY nama ASC`;
    db.query(sql,(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "dataCL": results});

    });
});

// Menampilkan berdasarkan z-a CL
router.get('/listcl-za',(req,res)=>{
    const sql = `SELECT * FROM absencl ORDER BY nama DESC`;
    db.query(sql,(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "dataCL": results});

    });
});

// Menampilkan berdasarkan bagian
router.get('/listcl-bg',(req,res)=>{
    const sql = `SELECT * FROM absencl ORDER BY bagian ASC;`;
    db.query(sql,(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "dataCL": results});

    });
});

// Menampilkan berdasarkan waktu
router.get('/listcl-wt',(req,res)=>{
    const sql = `SELECT * FROM absencl ORDER BY nama DESC`;
    db.query(sql,(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "dataCL": results});

    });
});

// Menambahkan anggota CL
router.post('/addcl',(req,res)=>{
    const {nama,bagian,status} = req.body;
    const sql = `INSERT INTO absencl (id, nama, bagian, status, tgl) VALUES (NULL, ?, ?, ?, current_timestamp())`;
    db.query(sql,[nama,bagian,status],(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "message": "Data Berhasil Di Tambahkan"});
    });
});

// Edit data CL
router.put('/editcl/:id',(req,res)=>{
    const id = req.params.id;
    const {nama,bagian,status} = req.body;
    
    const sql = `UPDATE absencl SET nama = ?, bagian = ?, status = ?, tgl = CURRENT_TIMESTAMP() WHERE absencl.id = ?`;
     db.query(sql,[nama,bagian,status,id],(err,results)=>{
        if(err){ 
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "message": "Data Berhasil Di Edit"});
    });
})

// Menghapus Data CL
router.delete('/deletecl/:id',(req,res)=>{
    const id = req.params.id;

    const sql = `DELETE FROM absencl WHERE absencl.id = ?`;
    db.query(sql,id,(err,results)=>{
        if (err){
            console.error("Querry Error :", err);
            return res.status(500).json({"status": 500, "error": true, "message": "Query Error"});
        }
        res.status(200).json({"status": 200, "error": false, "message": "Data Berhasil Di Hapus"});
    }); 
});






module.exports = router