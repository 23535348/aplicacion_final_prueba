var mongoose = require('mongoose');

var coordenadasSchema = mongoose.Schema({
    nombre_punto_titulo: {type: String},
    punto_x: {type: String},
    punto_y: {type: String},
    usuario: {type: String},
    foto_ranking: {type: String},
    direccion_comentario: {type: String},
    creado: { type: Date, default: Date.now }
});
var Coordenadas = mongoose.model('puntos', coordenadasSchema);

module.exports = Coordenadas;