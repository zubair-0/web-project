const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addRestaurant: function(req, res) {
        title = req.body.title;
        location = req.body.location;
        imgUrl = req.body.imgUrl;
        features = req.body.features;
        cuisine = req.body.cuisine;
        rating = req.body.rating;

        model.addRestaurant(title, location, imgUrl, features, cuisine, rating)
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

    updateRestaurant: function(req, res) {
        id = req.query.id
        
        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl,
            'features': req.body.features;
            'cuisine': req.body.cuisine;
            'rating': req.body.rating;
        }

        model.updateRestaurant(id, obj)
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

    getAllRestaurants: function(req, res) {
        model.getAllRestaurants()
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