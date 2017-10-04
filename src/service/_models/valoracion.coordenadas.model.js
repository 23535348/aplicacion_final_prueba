var mongoose = require('mongoose');

var valoracionCoordenadasSchema = mongoose.Schema({
    coordenada_id: {type: String},
    coordenada_nombre: {type: String},
    usuario: {type: String},
    usuarioNombre: {type: String},
    creado: { type: Date, default: Date.now }
});
var ValoracionCoordenadas = mongoose.model('valoracionCoordenadas', valoracionCoordenadasSchema);

module.exports = ValoracionCoordenadas;