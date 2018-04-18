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
            res.json({
                'message': 'Added Successfully',
                'obj': err
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

    updateAttraction: function(req, res) {
        id = req.params.id
        var obj = {
            'title': req.body.title,
            'location': req.body.location,
            'imgUrl': req.body.imgUrl
        }

        model.updateAttraction(id, obj)
        .then((result) => {
            res.status = 200;
            res.json({
                'message': 'Updated Successfully',
                'obj': err
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

    getAttraction: function(req, res) {
        id = req.params.id
        model.getAttraction(id)
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

    getAllAttractions: function(req, res) {
        model.getAllAttractions()
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