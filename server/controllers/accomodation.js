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
            res.json({
                'message': 'Added Successfully',
                'obj': result
            });
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Adding',
                'obj': err
            });
        });
    },

    updateAccomodation: function(req, res) {
        id = req.params.id
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
            res.json({
                'message': 'Updated Successfully',
                'obj': result
            });
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Updating Data',
                'obj': err
            });
        });
    },

    getAccomodation: function(req, res) {
        id = req.params.id
        model.getAccomodation(id)
        .then((result) => {
            res.status = 200;
            res.json(result);
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Fetching Data',
                'obj': err
            });
        });
    },

    getAllAccomodations: function(req, res) {
        model.getAllAccomodations()
        .then((result) => {
            res.status = 200;
            res.json(result);
        })
        .catch((err) => {
            res.status = 777;
            res.json({
                'message': 'Error Fetching Data',
                'obj': err
            });
        });
    }
}