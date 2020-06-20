let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let patientSchema = new Schema({
    name: { type: String,required:true},
    phoneNo: { type: Number,unique:true },
    emailId: { type: String },
    gender:{type:String},
    age:{type:Number},
    month:{type:Number},
    type:{type:String},
    address:{type:String},
    therapy:{type:String},
    primaryDoctor:{type:String},
    familyHistory:{type:String},
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Patient', patientSchema);
