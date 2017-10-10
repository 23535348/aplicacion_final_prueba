var mongoose = require('mongoose');

var coordenadasSchema = mongoose.Schema({
    nombre_punto_titulo: {type: String},
    punto_latitude: {type: String},
    punto_longitude: {type: String},
    usuario: {type: String},
    usuarioNombre: {type: String},
    favoritos: {type: Number},
    foto_ranking: {type: String},
    ranking: {type: String},
    direccion_comentario: {type: String},
    categoria: {type: String},
    creado: { type: Date, default: Date.now }
});
var Coordenadas = mongoose.model('puntos', coordenadasSchema);

module.exports = Coordenadas;