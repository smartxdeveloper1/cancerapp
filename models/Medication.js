let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
let medicationSchema = new Schema({
    type: { type: String},
    
    name: { type: String },
    pills:{type:String},
    timesConsumed:{type:String},
  
    createdAT: { type: Date },
    updatedAT: { type: Date }

});

module.exports = mongoose.model('Medication', medicationSchema);
