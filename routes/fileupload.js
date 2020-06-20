const express = require("express")
const router = express.Router()

const multer = require("multer")
const helpers = require("./helper")
const path = require("path")
const Upload = require("../models/Fileupload")

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      // var randomno = Math.floor(Math.random() * 90000) + 10000
      // req.body.fileName = req.body.logoName
      cb(null, req.body.logoName + "_logo" + path.extname(file.originalname))
    },
  }),
  fileFilter: helpers.imageFilter,
})

//create api
router.post("/i/upload",
  [ upload.single("file")],
  (req, res) => {
   
    //   var requestedObject = new file(req.body)
    //   requestedObject.save((err, success) => {
    //     if (err) {
    //       res.send({
    //         success: false,
    //         message: "Organization Unit not saved",
    //         err: err,
    //       })
    //     } else {
    //       if (req.fileValidationError) {
    //         return res.send(req.fileValidationError)
    //       } else if (!req.file) {
    //         return res.send("Please select an image to upload")
    //       } else if (err instanceof multer.MulterError) {
    //         return res.send(err)
    //       } else if (err) {
    //         return res.send(err)
    //       }

          // console.log(req.file)
          req.body.fileName = req.body.logoName
          req.body.uploadedFileName = req.file.originalname
          req.body.path = req.file.path
          req.body.fileType = path.extname(req.file.originalname)
          // req.body.path = req.file.path
          // req.body.fileType = path.extname(req.file.originalname)
          var uploadData = new Upload(req.body)
          uploadData.save((err, success) => {
            if (err) {
              res.send({
                success: false,
                message: "Error while saving file data",
                err: err,
              })
            } else {
              res.send({
                success: true,
                message:
                  "Records uploaded successfully",
                success: success,
              })
            }
          })
        }
)
    
        module.exports = router;