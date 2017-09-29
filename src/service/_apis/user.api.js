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
app.post('/usuarios', function(req, res) {
    var obj = new user(req.body);
    obj.save(function(err, obj) {
        if(err) return console.error(err);
        res.status(200).json(obj);
    });
});

// find by id
app.get('/usuarios/:id', function(req, res) {
    user.findOne({_id: req.params.id}, function (err, obj) {
        if(err) return console.error(err);
        res.json(obj);
    })
});

// update by id
app.put('/usuarios/:id', function(req, res) {
    user.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    })
});

// delete by id
app.delete('/usuarios/:id', function(req, res) {
    user.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    });
});