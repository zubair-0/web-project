const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addAttraction: function(req, res) {
        title = req.body.title;
        location = req.body.location;
        imgUrl = req.body.imgUrl;

        model.addAttraction(title, location, imgUrl)
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

    updateAttraction: function(req, res) {
        id = req.query.id
        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl
        }

        model.updateAttraction(id, obj)
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

    getAllAttractions: function(req, res) {
        model.getAllAttractions()
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