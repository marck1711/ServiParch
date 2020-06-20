const express = require("express");
const os = require('os');
const morgan = require("morgan");
const mongoose = require('mongoose');
const app = express();


var networkInterfaces = os.networkInterfaces();

console.log(networkInterfaces);

// Connexion
mongoose.connect('mongodb+srv://parch:marco979@cluster0-bxfkk.gcp.mongodb.net/parch-mongo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Metodos
app.use("/api",require('./routes/parch'));

//inicio servidor
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('Server puerto iniciado'+ app.get("port"));
});

