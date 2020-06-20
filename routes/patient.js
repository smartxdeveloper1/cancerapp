var express = require('express');
var Router = express.Router();
var Patient = require('../models/Patient');
Router.post('/i/patient', function (req, res) {
    var newpatient = new Patient(req.body);
    newpatient.createdAT = new Date();
    newpatient.updatedAT = new Date();
    newpatient.save(function (err, Patient) {
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
            res.send({ success: true, message: "Patient Details Created Successfully", data: Patient });
        }

    });
})
Router.get('/r/patient', (req, res) => {
    Patient.find(req.query, function (err,Patient) {
        if (err) {
            res.send({message:"internal error ocuured"});
        }

        else if (Patient.length == 0) {
            res.send({ success: false, messgae: " Details not Found" });
        }
        else {
            res.send({ success: true, messgae: "Patient Details Found Successfully", data: Patient });
        }
    })

});
Router.put('/u/patient', function (req, res) {
    req.body.updatedAT = new Date();
    Patient.updateOne({

        _id: req.body._id
    },
    { $set: req.body }
    , function (err, Patient) {
        if (err) {

            res.send({ success: false, message: "internal error occurred" });

        }
        else {
            res.send({ success: true, message: "Details Updated Successfully" });
        }

    });
});
Router.delete('/d/patient', function (req, res) {
    Patient.findOneAndRemove({
        _id: req.query._id
    }, function (err, Patient) {
        if (err) {

            res.send({ success: false, message: "No details deleted ", error: err });
        }
        else {
            res.send({ success: true, message: " Details Deleted Successfully" });

        }

    });
});
module.exports = Router;