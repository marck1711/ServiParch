const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskDispositivo = Schema({
        rut:String,
        numero:String,
        nombreCorto: String, 
        estado: {type: Boolean, default: true}
});

module.exports = mongoose.model('parch', TaskDispositivo);
