const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv= require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if(err) return console.log("Error connecting to the mysql db" ,err);

    console.log("Connected to mysql successfullly as id : " , db.threadId);


    app.set('view engine' , 'ejs');
    app.set('views ' , __dirname + '/views');

    
    app.get('/data' , (req,res) => {
        const getPatients = "SELECT * FROM patients"
        db.query(getPatients , (err ,data) => {
            if(err){
                return res.status(400).send("Failed to get patients" , err)
            }else{
               res.render('data' , {results : results});
            }
         
        })
       
    });

    app.get('/providerData' ,(req , res) => {
        const getProviders = "SELECT  first_name,last_name , provider_specialty FROM  providers "
        db.query(getProviders , (err , data) => {
            if(err){
                return res.status(400).send('Error retrieving data');
            }else{
                res.render('data' , {results : results});
            }
        })
    });

    app.get('/data' ,(req , res) => {
        const getPatientsFirst = "SELECT  * FROM patients order by first_name"
        db.query(getPatientsFirst , (err , data) => {
            if(err){
                return res.status(400).send('Error retrieving data');
            }else{
                res.render('data' , {results : results});
            }
        })
    });

    app.get('/providerData' ,(req , res) => {
        const getProvidersSpeciality = "SELECT  * FROM providers order by provider_speciality "
        db.query(getProvidersSpeciality , (err , data) => {
            if(err){
                return res.status(400).send('Error retrieving data');
            }else{
                res.render('data' , {results : results});
            }
        })
    });


});
        app.listen(process.env.PORT , () =>{
            console.log(`Server listening on port ${process.env.PORT}`);
            
            console.log('Sending message to browser.....');
    
        })


