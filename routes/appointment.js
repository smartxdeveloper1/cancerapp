var express = require('express');
var Router = express.Router();
var Appointment = require('../models/Appointment');
Router.post('/i/appoitment', function (req, res) {
    var newappoitment = new Appointment(req.body);
    newappoitment.createdAT = new Date();
    newappoitment.updatedAT = new Date();
    newappoitment.save(function (err, Appointment) {
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
            res.send({ success: true, message: " Details Created Successfully", data: Appointment });
        }

    });
})
Router.get('/r/appointment', (req, res) => {
    Appointment.find(req.query, function (err, Appointment) {
        if (err) {
            res.send({message:"internal error ocuured"});
        }

        else if (Appointment.length == 0) {
            res.send({ success: false, messgae: " Details not Found" });
        }
        else {
            res.send({ success: true, messgae: " Details Found Successfully", data: Appointment });
        }
    })

});
Router.put('/u/appoitment', function (req, res) {
    req.body.updatedAT = new Date();
    Appointment.updateOne({

        _id: req.body._id
    },
    { $set: req.body }
    , function (err, Appointment) {
        if (err) {

            res.send({ success: false, message: "internal error occurred" });

        }
        else {
            res.send({ success: true, message: "Details Updated Successfully" });
        }

    });
});
Router.delete('/d/appointment', function (req, res) {
    Appointment.findOneAndRemove({
        _id: req.query._id
    }, function (err, Appointment) {
        if (err) {

            res.send({ success: false, message: "No details deleted ", error: err });
        }
        else {
            res.send({ success: true, message: " Details Deleted Successfully" });

        }

    });
});
module.exports = Router;