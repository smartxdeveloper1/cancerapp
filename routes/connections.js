var express = require('express');
var Router = express.Router();
var Connection = require('../models/Connections');
Router.post('/i/connection', function (req, res) {
    var newconnection = new Connection(req.body);
    newconnection.createdAT = new Date();
    newconnection.updatedAT = new Date();
    newconnection.save(function (err, Connection) {
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
            res.send({ success: true, message: " Details Created Successfully", data:Connection });
        }

    });
})
Router.get('/r/connection', (req, res) => {
    Connection.find(req.query, function (err,Connection) {
        if (err) {
            res.send({message:"internal error ocuured"});
        }

        else if (Connection.length == 0) {
            res.send({ success: false, messgae: " Details not Found" });
        }
        else {
            res.send({ success: true, messgae: " Details Found Successfully", data: Connection });
        }
    })

});
Router.put('/u/connection', function (req, res) {
    req.body.updatedAT = new Date();
    Connection.updateOne({

        _id: req.body._id
    },
    { $set: req.body }
    , function (err, Connection) {
        if (err) {

            res.send({ success: false, message: "internal error occurred" });

        }
        else {
            res.send({ success: true, message: "Details Updated Successfully" });
        }

    });
});
Router.delete('/d/connection', function (req, res) {
    Connection.findOneAndRemove({
        _id: req.query._id
    }, function (err, Connection) {
        if (err) {

            res.send({ success: false, message: "No details deleted ", error: err });
        }
        else {
            res.send({ success: true, message: " Details Deleted Successfully" });

        }

    });
});
module.exports = Router;