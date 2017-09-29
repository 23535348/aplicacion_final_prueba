

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