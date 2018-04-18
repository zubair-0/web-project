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

    updateRestaurant: function(req, res) {
        id = req.params.id
        
        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl,
            'features': req.body.features,
            'cuisine': req.body.cuisine,
            'rating': req.body.rating
        }

        model.updateRestaurant(id, obj)
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

    getRestaurant: function(req, res) {
        id = req.params.id
        model.getRestaurant(id)
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

    getAllRestaurants: function(req, res) {
        model.getAllRestaurants()
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