

//Login api servidor
// select all
app.get('/login/salir', function(req, res) {
    datos_login.find({}, function(err, docs) {
        if(err) return console.error(err);
        res.json(docs);
    });
});

// create
app.post('/login/ingresar', function(req, res) {
    var obj = new datos_login(req.body);
    obj.save(function(err, obj) {
        if(err) return console.error(err);
        res.status(200).json(obj);
    });
});
