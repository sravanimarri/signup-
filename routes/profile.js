const express=require('express');
const router=express.Router();
const authenticateToken=require('../middleware/auth');


router.get('/profile',authenticateToken,(req,res)=>{
    res.json({
        message:'able to access the content after successful authenticate',
        user_id:req.user.id,
        user_name:req.user.email
    });
});

module.exports=router;