const mysql = require('mysql2');
//create a conncetion
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kalol@123',
    port:3306,
    database:'react_movie_app'
});


//connect to database
connection.connect((err) => {
    if(err){
        console.error('Error Connecting to MYSQL server ' + err);
        return;
    }
    console.log('Connected to server');
})

//export default connection;
module.exports= connection; //in CommonJS