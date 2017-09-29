var mongoose = require('mongoose');

var usuariosSchema = mongoose.Schema({
    nombre: {type: String},
    contrasenia: {type: String},
    email: {type: String},
    foto: {type: String},
    creado: { type: Date, default: Date.now }
});
var Usuarios = mongoose.model('usuarios', usuariosSchema);


mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

module.exports = Usuarios;
module.exports = db;