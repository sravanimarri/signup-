const express=require('express');
const router=express.Router();

const db=require('../config/db');

const authenticationToken=require('../middleware/auth');

router.put('/profile',authenticationToken,(req,res) =>{
    const userId=req.user.id;
    const {username,email}=req.body;

    if(!username && !email){
        return res
                .status(400)
                .json({
                    message:'please provide a username or email to update'
                });

    }

    if(email){
        db.query('select * from users where email=? and id!=?',[email,userId],(err,results)=>{
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
                            message:'email already in use'
                        });
            }
            updateUser();
        });

      
    }
    else{
        updateUser();
    }

    function updateUser(){
        const fields=[];
        const values=[];

        if(username){
            fields.push('username=?');
            values.push(username);
        }

        if(email){
            fields.push('email=?');
            values.push(email);
        }
        
  if (fields.length === 0) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

        values.push(userId);

        const sql=`UPDATE users set ${fields.join(', ')} where id=?`;
        
        db.query(sql,values,(err,result)=>{
            if(err)
                return res
                        .status(500)
                        .json({
                            message:'failed to update user',
                            error:err
                        });


            res.json({
                message:'user profile updated successfully'
            });
        });
    }
});

module.exports=router;