const mongoose = require("mongoose")

const fileUploadSchema = new mongoose.Schema({
  uploadedFileName: String,
  fileName: String,
  path: String,
  fileType: String,
})

module.exports = mongoose.model("upload", fileUploadSchema)
