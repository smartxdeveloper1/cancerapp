let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let patientSchema = new Schema({
    firstName: { type: String,required:true},
    lastName:{type:String},
    phoneNo: { type: Number,unique:true },
    emailId: { type: String },
    gender:{type:String},
    age:{type:Number},
    dateofDiagnosis:{type:Number},
    type:{type:String},
    previousHistory:{type:String},
    address:{type:String},
    therapy:{type:String},
    primaryDoctor:{type:String},
    familyHistory:{type:String},
    bloodGroup:{type:String},
    stage:{type:String},
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Patient', patientSchema);
