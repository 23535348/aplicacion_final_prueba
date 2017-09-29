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