const stringify = require('json-stringify-safe')
const {Router} = require('express');
const router = Router();
const TaskPersona = require('../model/persona');
const TaskSolicitud = require('../model/solicitud');
const TaskDispositivo = require('../model/dispositivo');


//PERSONAS

//OBTENER TOLAS LAS PERSONAS
router.get('/persona', async function (req, res) {     
    const tasks = await TaskPersona.find();
    res.json(tasks);
});

//OBTENER UNA PERSONA POR SU RUT
router.get('/persona/:id', async (req, res) => {
    const task = await TaskPersona.find({rut: req.params.id});
    res.json(task);
});

//INSERTAR PERSONA
router.post('/persona', async (req, res) => {
    const {rut, nombre, paterno, materno, estado, pass } = req.query;
    const task = new TaskPersona();
    task.rut = rut;
    task.nombre = nombre;
    task.paterno = paterno;
    task.materno = materno;
    task.estado = estado;
    task.pass = pass;
    await task.save();
    res.send({exito:"INSERCION PERSONA EXITOSA"});
});

//LOGIN
router.post('/login', async (req, res) => {
    const { rut, pass } = req.body;
    const tasks = await TaskPersona.findOne({ rut: rut, pass: pass});
    res.json(tasks);
});

//DISPOSITIVO

//OBTENER DISPOSITIVOS POR RUT
router.post('/device', async (req, res) => {
    const { rut } = req.body;
    const tasks = await TaskDispositivo.find({ rut: rut});
    res.json(tasks);
});

//INSERTAR DISPOSITIVO DE UNA PERSONA
router.post('/insertdevice', async (req, res) => {
    const { rut, numero, nombreCorto, estado } = req.query;
    const task = new TaskDispositivo();
    task.rut = rut;
    task.numero = numero,
    task.nombreCorto = nombreCorto,
    task.estado = estado;
    await task.save();
    res.send({ exito: "INSERCION DISPOSITIVO EXITOSA" });
});

//SOLICITUDES

//OBTENER TODAS LAS SOLICITUDES
router.post('/getsolicitudbyestado', async (req, res) => {
    const { estado, numero } = req.body;
    const tasks = await TaskSolicitud.find({ estado: estado, numero:numero});
    res.json(tasks);
});

//OBTENER TODAS LAS SOLICITUDES
router.post('/getsolicitudbyfecha', async (req, res) => {
    const { estado, fecha, numero } = req.body;
    const tasks = await TaskSolicitud.find({ estado: estado, fecha: fecha, numero: numero });
    res.json(tasks);
});

// OBTENER SOLICITUDES POR RUT PERSONA
router.post('/getsolicitudbyrut', async (req, res) => {
    const { rut } = req.body;
    const tasks = await TaskSolicitud.find({ rut: rut });
    res.json(tasks);
});

//INSERTAR SOLICITUD 
router.post('/solicitud', async (req, res) => {
    const { fecha, rut, numero, estado, x, y } = req.body;
    const task = new TaskSolicitud();
    task.fecha = fecha;
    task.rut = rut;
    task.numero = numero;
    task.estado = estado;
    task.x = x;
    task.y = y;
    await task.save();
    res.send({ exito: "INSERCION SOLICITUD EXITOSA" });
});

//ACTUALIZAR SOLICITUD
router.post('/ubicacion', async (req, res) => {
    const { id,x,y,estado } = req.body;
    const filter = { _id: id };
    const update = {
        x: x,
        y: y,
        estado: estado };

    await TaskSolicitud.findOneAndUpdate(filter, update);

    res.send({ exito: "ACTUALIZACION SOLICITUD EXITOSA" });
});

module.exports = router;