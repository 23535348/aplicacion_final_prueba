var mongoose = require('mongoose');

var usuariosSchema = mongoose.Schema({
    nombre: {type: String},
    contrasenia: {type: String},
    email: {type: String},
    foto: {type: String},
    creado: { type: Date, default: Date.now }
});
var Usuarios = mongoose.model('usuarios', usuariosSchema);

module.exports = Usuarios;