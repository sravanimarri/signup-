const sql=require('mysql2');

const db=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ramu1234@',
    database:'signup'
})

db.connect((err)=>{
    if (err) throw err;
    console.log('connected to mysql database');
    
})

module.exports=db;