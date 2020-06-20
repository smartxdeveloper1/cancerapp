var express = require('express');
var Router = express.Router();
var Doctor = require('../models/Doctor');
Router.post('/i/doctor', function (req, res) {
    var newdoctor = new Doctor(req.body);
    newdoctor.createdAT = new Date();
    newdoctor.updatedAT = new Date();
    newdoctor.save(function (err, Doctor) {
        if (err) {
            console.log(err)
            if (err.errmsg) {
                var z = err.errmsg;
                var re = z.split(" ");
                console.log(re);

                res.send({ success: false, message: "unique " + re[7] + " id required " });
            }
            else {
                var y = Object.keys(err.errors)[0];
                if (y) {

                    res.send({ success: false, message: "custom error " + y + " is required" });
                }
            }

        }
        else {
            res.send({ success: true, message: "Doctor Details Created Successfully", data: Doctor });
        }

    });
})
Router.get('/r/doctor', (req, res) => {
    Doctor.find(req.query, function (err, Doctor) {
        if (err) {
            res.send({message:"internal error ocuured"});
        }

        else if (Doctor.length == 0) {
            res.send({ success: false, messgae: " Details not Found" });
        }
        else {
            res.send({ success: true, messgae: "Doctor Details Found Successfully", data: Doctor });
        }
    })

});
Router.put('/u/doctor', function (req, res) {
    req.body.updatedAT = new Date();
    Doctor.updateOne({

        _id: req.body._id
    },
    { $set: req.body }
    , function (err, Doctor) {
        if (err) {

            res.send({ success: false, message: "internal error occurred" });

        }
        else {
            res.send({ success: true, message: "Details Updated Successfully" });
        }

    });
});
Router.delete('/d/doctor', function (req, res) {
    Doctor.findOneAndRemove({
        _id: req.query._id
    }, function (err, Doctor) {
        if (err) {

            res.send({ success: false, message: "No details deleted ", error: err });
        }
        else {
            res.send({ success: true, message: " Details Deleted Successfully" });

        }

    });
});
module.exports = Router;