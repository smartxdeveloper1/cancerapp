var express = require('express');
var Router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;


const Schema = mongoose.Schema;

const skinSchema = new Schema({}, { strict: false });
const skin = mongoose.model('skin', skinSchema, 'skin');

Router.post('/i/skin', function(req, res) {
  req.body.createdAT=new Date()
  req.body.updatedAT=new Date()
    db.collection('skin').insertOne(req.body, function(err, collection) {
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
Router.get('/r/skin',  function(req, res) {
    skin.find(req.query, function(err, collection) {
        if (err) {
            res.send(err)
        } else {
            res.send({ success: true, data: collection });
        }
    })
});


Router.put('/u/skin', function (req, res) {
    req.body.updatedAT = new Date();
    skin.updateOne({

        
        _id: req.body._id
    
    },
        { $set: req.body }
        , function (err, aids) {
            if (err) {

                res.send({ success: false, message: "internal error occurred" });

            } 
                else {
                    res.send({ success: true, message: "details updated successfully" });
                }
            
        });
});

Router.delete('/d/skin', function (req, res) {
    skin.findOneAndRemove({
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