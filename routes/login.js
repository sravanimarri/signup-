const express=require('express');
const db=require('../config/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();

const router=express.Router();
const JWT_SECRET=process.env.SECRETKEY;

router.post('/login',(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res
                .status(400)
                .json({
                    message:'email and password are required'
                });

    }

    db.query('select * from users where email=?',[email],async(err,results)=>{
        if(err)
            return res
                    .status(500)
                    .json({
                        message:'Database error',
                        err:error
                    });

        if(results.length===0){
                return res
                        .status(401)
                        .json({
                            message:'Invalid email and password'
                        })
        }

        const user=results[0];

        const passwordMatch= await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res  
                    .status(401)
                    .json({
                        message:'Invalid email and password'
                    });
        }
        const token=jwt.sign({
            id:user.id,
            email:user.email
        }, JWT_SECRET,{expiresIn:'10h'});


        res.status(200)
            .json({
                message:'login successfull',
                userId:user.id,
                username:user.username,
                email:user.email,
                token:token
            });       
    });
});

module.exports=router;