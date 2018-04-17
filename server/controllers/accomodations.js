const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addAccomodation: function(req, res) {
        title = req.body.title;
        location = req.body.location;
        imgUrl = req.body.imgUrl;
        price = req.body.price;
        features = req.body.features;
        type = req.body.type;
        rating = req.body.rating;

        model.addAccomodation(title, location, imgUrl, price, features, type, rating)
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

    updateAccomodation: function(req, res) {
        id = req.query.id
        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl,
            'price': req.body.price,
            'features': req.body.features,
            'type': req.body.type,
            'rating': req.body.rating
        }

        model.updateAccomodation(id, obj)
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

    getAllAccomodations: function(req, res) {
        model.getAllAccomodations()
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