const express=require('express');
const bodyParser=require('body-parser');
const registerRoute=require('./routes/register')

//creating a server application with express
const app=express();

//using bodyparser to parse the req body in the format
app.use(bodyParser.json());

//with this help we are trying to navingate to the registered route
app.use('/api',registerRoute);

//testing wheather the setup is established or not
app.get('/',(req,res)=>{
    res.send('i am able to complete step 1');
})


//making the server to listen to this port actively to accept the requests coming 
app.listen(3000,()=>{
    console.log('server is running');
})

//akash@growhut.in