const express=require('express');
const bodyParser=require('body-parser');
const registerRoute=require('./routes/register');
const loginRoute=require('./routes/login');
const profileRoute=require('./routes/profile');
const updateProfileRoute=require('./routes/updateProfile');
const dotenv =require('dotenv');
dotenv.config();

//creating a server application with express
const app=express();

//using bodyparser to parse the req body in the format
app.use(bodyParser.json());

//with this help we are trying to navingate to the registered route
app.use('/api',registerRoute);
app.use('/api',loginRoute);
app.use('/api',profileRoute);
app.use('/api',updateProfileRoute);

//testing wheather the setup is established or not
app.get('/',(req,res)=>{
    res.send('i am able to complete step 1');
})


//making the server to listen to this port actively to accept the requests coming 
app.listen(process.env.PORT,()=>{
    console.log('server is running');
})

