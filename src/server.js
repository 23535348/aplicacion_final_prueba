var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var app = express();


app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Cat = require('./service/_models/cat.model.js');
// Models
var user = require('./service/_models/user.model.js');
var coordM = require('./service/_models/coordenadas.model.js');
var coordMV = require('./service/_models/valoracion.coordenadas.model');
var datos_login ="";

module.export = app;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');



    //Usuarios api servidor
// select all
    app.get('/usuarios', function(req, res) {
        user.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

// count all
    app.get('/usuarios/count', function(req, res) {
        user.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

// create
    app.post('/usuario', function(req, res) {
        var obj = new user(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

// find by id
    app.get('/usuario/:id', function(req, res) {
        user.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

// update by id
    app.put('/usuario/:id', function(req, res) {
        user.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

// delete by id
    app.delete('/usuario/:id', function(req, res) {
        user.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });



// Coordenadas api servidor
// select all
    app.get('/coordenadas', function(req, res) {
        coordM.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

// count all
    app.get('/coordenadas/count', function(req, res) {
        coordM.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

// create
    app.post('/coordenadas', function(req, res) {
        var obj = new coordM(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

// find by id
    app.get('/coordenadas/:id', function(req, res) {
        coordM.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

// update by id
    app.put('/coordenadas/:id', function(req, res) {
        coordM.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

// delete by id
    app.delete('/coordenadas/:id', function(req, res) {
        coordM.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });


    //Valoracion coordenadas api servidor
// select all
    app.get('/coordenadas/valoracion', function(req, res) {
        coordMV.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

// count all
    app.get('/coordenadas/valoracion/count', function(req, res) {
        coordMV.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

// create
    app.post('/coordenadas/valoracion', function(req, res) {
        var obj = new coordMV(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

// find by id
    app.get('/coordenadas/valoracion/:id', function(req, res) {
        coordMV.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

// update by id
    app.put('/coordenadas/valoracion/:id', function(req, res) {
        coordMV.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

// delete by id
    app.delete('/coordenadas/valoracion/:id', function(req, res) {
        coordMV.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });


    //Login api servidor
// Autenticar usuarios
    app.post('/api/autenticacion', function(req, res) {

        var body = req.body;
        user.findOne({ "nombre" : body.username ,
                    "contrasenia" : body.password  }, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
            //console.log(docs);
           });
    });


    //Dashboard inicial
    // select all
    app.get('/puntos', function(req, res) {
        coordM.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // count all
    app.get('/puntos/count', function(req, res) {
        coordM.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/punto', function(req, res) {
        var obj = new coordM(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/punto/:id', function(req, res) {
        coordM.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    //update by id
    app.put('/punto/:id', function(req, res) {
        coordM.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/punto/:id', function(req, res) {
        coordM.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });
    // Gestion de favoritos
    // find by id
    app.get('/favoritos/:id/:user', function(req, res) {
        // usuario punto
        coordMV.findOne({"coordenada_id" : req.params.id ,
                         "usuario" :  req.params.user }, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    app.get('/favorito', function(req, res) {
        coordMV.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        }).sort({coordenada_id:1});
    });

    app.post('/favorito/Add/:id/:user', function(req, res) {
        var datosInsert={
            coordenada_id :  req.params.id,
            coordenada_nombre: req.body.nombre_punto_titulo,
            usuario: req.params.user,
            usuarioNombre: req.body.usuarioNombre

        };
       // console.log(datosInsert);
        var obj = new coordMV(datosInsert);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });


    });

    app.put('/favorito/voto/:id', function(req, res) {
        var contador_punto = req.body.favoritos + 1;
        var datosUpdate={
            _id :  req.params.id,
            favoritos: contador_punto
        };
        coordM.findOneAndUpdate({_id: req.params.id}, datosUpdate, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });


// select all
    app.get('/cats', function(req, res) {
        Cat.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });


    // select all
    app.get('/cats', function(req, res) {
        Cat.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // count all
    app.get('/cats/count', function(req, res) {
        Cat.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/cat', function(req, res) {
        var obj = new Cat(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/cat/:id', function(req, res) {
        Cat.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/cat/:id', function(req, res) {
        Cat.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/cat/:id', function(req, res) {
        Cat.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });





















    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });
});


