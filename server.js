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
app.use('/cancerapp', require('./routes/aids'));
app.use('/cancerapp', require('./routes/breast'));
app.use('/cancerapp', require('./routes/blood'));
app.use('/cancerapp', require('./routes/endocrine'));
app.use('/cancerapp', require('./routes/eye'));
app.use('/cancerapp', require('./routes/genitourinary'));
app.use('/cancerapp', require('./routes/germcells'));
app.use('/cancerapp', require('./routes/gynecology'))
app.use('/cancerapp', require('./routes/head'))
app.use('/cancerapp', require('./routes/digestive'));
app.use('/cancerapp', require('./routes/muscoloskeletal'));
app.use('/cancerapp', require('./routes/neurologic'));
app.use('/cancerapp', require('./routes/respiratory'));
app.use('/cancerapp', require('./routes/skin'));



app.use('/cancerapp', require('./routes/treatmenttype'));
app.use('/cancerapp', require('./routes/radiotherapy'));
app.use('/cancerapp', require('./routes/chemotherapy'));
app.use('/cancerapp', require('./routes/targetedagents'));
app.use('/cancerapp', require('./routes/immunity'));
app.use('/cancerapp', require('./routes/procedure'));
app.use('/cancerapp', require('./routes/topicals'));
app.use('/cancerapp', require('./routes/others'));


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