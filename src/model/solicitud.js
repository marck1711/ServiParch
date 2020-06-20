const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSolicitud = Schema({
    fecha: String,
    rut: String,
    numero: String,
    estado: String,
    x: String,
    y: String
});

module.exports = mongoose.model('solicitud', TaskSolicitud);
