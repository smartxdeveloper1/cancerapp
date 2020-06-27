let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let doctorSchema = new Schema({
    firstName: { type: String,required:true},
    lastName:{type:String},
    age:{type:String},
    phoneNo: { type: Number,unique:true },
    emailId: { type: String },
    gender:{type:String},
    qualification:{type:String},
    experience:{type:Number},
    medicalPractice:{type:String},
    expertise:{type:String},
    mciNo:{type:String},
    mciState:{type:String},
    address:{type:String},
    bloodGroup:{type:String},
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Doctor', doctorSchema);
