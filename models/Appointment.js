let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let appointmentSchema = new Schema({
    dateTime: { type: Date},
    appSought: { type: String},
    appApproved: { type: String },
    
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Appointment', appointmentSchema);
