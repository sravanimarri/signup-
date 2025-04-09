const express = require('express');
const router=express.Router();
const db=require('../config/db');
const bcrypt=require('bcrypt');

router.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;

    //here making sure that the values should not be null
    if(!username || !email || !password){
        return res
                .status(400)
                .json({message:'All fields are required'});
    }

        //here mail should follow the pattern like a@example.com
    if(!email.match(/^\S+@\S+\.\S+$/)){
        return res
                .status(400)
                .json({message:'the format of the email is incorrect'});
    }
    //here trying to check the password follows that miminum 6 characters 
    if(password.length <6){
        return res  
                .status(400)
                .json({message:'the length of the password should contain atleast 6 characters'});
    }

    db.query('SELECT * FROM users WHERE email=?',[email], async(err,results)=>{
        if(err)
            return res
                    .status(500)
                    .json({
                        message:'Database error',
                        error:err
                    });

        if(results.length>0){
            return res
                    .status(400)
                    .json({
                        message:'Email already exists'
                    });            
        }

    const  hashedpassword=await bcrypt.hash(password,10);

    const user={username, email, password:hashedpassword};
    db.query('INSERT INTO users set ?',user,(err,result)=>{
        if(err)
            return res
                    .status(500)
                    .json({message:'unable to save the user',error:err});

                    res
                        .status(201)
                        .json({message:'successfully registered the user',userId:result.insertId});
    });
    });

});

module.exports=router;