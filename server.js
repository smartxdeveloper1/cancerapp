const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const dbDetails = require('./config/db');

const PORT = dbDetails.port;
const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect( 
    dbDetails.dbUrl, {  useUnifiedTopology: true , socketTimeoutMS: 0,
        connectTimeoutMS: 0,useNewUrlParser: true},
    (err) => {
        if (err) throw err;
        else {
            console.log('Mongodb connected successfully');
        }
    })
mongoose.set('useCreateIndex', true);


app.use('/cancerapp', require('./routes/doctor'));
app.use('/cancerapp', require('./routes/patient'));
app.use('/cancerapp', require('./routes/connections'));
app.use('/cancerapp', require('./routes/medication'));
app.use('/cancerapp', require('./routes/appointment'));
app.use('/cancerapp', require('./routes/cancertypes'));
app.use('/cancerapp', require('./routes/treatmenttype'));
app.use('/cancerapp', require('./routes/vitalparameters'));
app.use('/cancerapp', require('./routes/symptoms'));
app.use('/cancerapp', require('./routes/fileupload'));
app.listen(PORT, (err) => {
    if (err) {
        console.log('Error occured while listening');
        console.log(err);
    } else {
        console.log('server is running on port no : ' + PORT);
    }
})