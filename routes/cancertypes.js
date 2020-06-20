var express = require('express');
var Router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;


const Schema = mongoose.Schema;

const cancertypeSchema = new Schema({}, { strict: false });
const cancertype = mongoose.model('cancertype', cancertypeSchema, 'cancertype');

Router.post('/i/cancertype', function(req, res) {
  req.body.createdAT=new Date()
  req.body.updatedAT=new Date()
    db.collection('cancertype').insertOne(req.body, function(err, collection) {
        if (err) {
            console.log(err);
            res.send('error occured');
        } else {
            console.log("data inserted");
            res.send({ message: 'Details Saved Successfully' });
            console.log(req.body);
        }
    });
});
Router.get('/r/cancertype',  function(req, res) {
    cancertype.find(req.query, function(err, collection) {
        if (err) {
            res.send(err)
        } else {
            res.send({ success: true, data: collection });
        }
    })
});


Router.put('/u/cancertype', function (req, res) {
    req.body.updatedAT = new Date();
    cancertype.updateOne({

        
        _id: req.body._id
    
    },
        { $set: req.body }
        , function (err, cancertype) {
            if (err) {

                res.send({ success: false, message: "internal error occurred" });

            } 
                else {
                    res.send({ success: true, message: "details updated successfully" });
                }
            
        });
});

Router.delete('/d/cancertype', function (req, res) {
    cancertype.findOneAndRemove({
        _id: req.query._id
    }, function (err, cancertype) {
        if (err) {

            res.send({ success: false, message: "no details deleted ", error: err });
        }
    else {
                res.send({ success: true, message: " details deleted successfully" });

            }
        
    });
});
module.exports = Router;