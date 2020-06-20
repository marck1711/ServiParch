const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskPersona = Schema({
    rut: String,
    nombre: String,
    paterno: String,
    materno: String,
    edad: Number,
    pass: String,
    estado: Boolean
});

module.exports = mongoose.model('persona', TaskPersona);
