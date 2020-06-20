let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let doctorSchema = new Schema({
    name: { type: String,required:true},
    phoneNo: { type: Number,unique:true },
    emailId: { type: String },
    gender:{type:String},
    qualification:{type:String},
    experience:{type:Number},
    medicalPractice:{type:String},
    expertise:{type:String},
    mciNo:{type:String},
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Doctor', doctorSchema);
