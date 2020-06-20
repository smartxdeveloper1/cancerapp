let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let connectionSchema = new Schema({
    name: { type: String,required:true},
    phoneNo: { type: Number,unique:true },
    type: { type: String },
   
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Connection', connectionSchema);
