var express = require('express');
var Router = express.Router();
var Medication = require('../models/Medication');
Router.post('/i/medication', function (req, res) {
    var newmedication = new Medication(req.body);
    newmedication.createdAT = new Date();
    newmedication.updatedAT = new Date();
    newmedication.save(function (err, Medication) {
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
            res.send({ success: true, message: " Details Created Successfully", data: Medication });
        }

    });
})
Router.get('/r/medication', (req, res) => {
    Medication.find(req.query, function (err, Medication) {
        if (err) {
            res.send({message:"internal error ocuured"});
        }

        else if (Medication.length == 0) {
            res.send({ success: false, messgae: " Details not Found" });
        }
        else {
            res.send({ success: true, messgae: " Details Found Successfully", data: Medication });
        }
    })

});
Router.put('/u/medication', function (req, res) {
    req.body.updatedAT = new Date();
    Medication.updateOne({

        _id: req.body._id
    },
    { $set: req.body }
    , function (err, Medication) {
        if (err) {

            res.send({ success: false, message: "internal error occurred" });

        }
        else {
            res.send({ success: true, message: "Details Updated Successfully" });
        }

    });
});
Router.delete('/d/medication', function (req, res) {
    Medication.findOneAndRemove({
        _id: req.query._id
    }, function (err, Medication) {
        if (err) {

            res.send({ success: false, message: "No details deleted ", error: err });
        }
        else {
            res.send({ success: true, message: " Details Deleted Successfully" });

        }

    });
});
module.exports = Router;