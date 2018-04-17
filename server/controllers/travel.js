const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addTravel: function(req, res) {
        title = req.body.title;
        source = req.body.source;
        destination = req.body.destination;
        cls = req.body.cls;
        price = req.body.price;
        imgUrl = req.body.imgUrl;
        
        model.addTravel(title, source, destination, cls, price, imgUrl)
        .then((result) => {
            res.status = 200;
            res.json({});
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Signing Up',
                'obj': err
            });
        });
    },

    updateTravel: function(req, res) {
        id = req.query.id
        var obj = {
            'title': req.body.title,
            'source': req.body.source,
            'destination': req.body.destination,
            'cls': req.body.cls,
            'price': req.body.price,
            'imgUrl': req.body.imgUrl
        }

        model.updateTravel(id, obj)
        .then((result) => {
            res.status = 200;
            res.json({});
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Signing In',
                'obj': err
            });
        });
    },

    getAllTravels: function(req, res) {
        model.getAllTravels()
        .then((result) => {
            res.status = 200;
            res.json({});
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Signing In',
                'obj': err
            });
        });
    }
}