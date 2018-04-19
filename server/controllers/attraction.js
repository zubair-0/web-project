var model = require('../models/model.js');
var image = require('./image.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    addAttraction: function(req, res) {
        var title = req.body.title;
        var location = req.body.location;
        var encodedImage = req.body.image;

        // console.log(req.body);

        image.uploadImage(encodedImage).then((link) => {
            model.addAttraction(title, location, link)
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
        }).catch(err => {
            res.status = 777;
            res.json({
                'message': 'Error Uploading',
                'obj': err
            });
        });
    },

    // updateAttraction: function(req, res) {
    //     id = req.params.id
    //     var obj = {
    //         'title': req.body.title,
    //         'location': req.body.location,
    //         'imgUrl': req.body.imgUrl
    //     }

    //     model.updateAttraction(id, obj)
    //     .then((result) => {
    //         res.status = 200;
    //         res.json({
    //             'message': 'Updated Successfully',
    //             'obj': result
    //         });
    //     })
    //     .catch((err) => {
    //         res.status = 777;
    //         res.json({
    //             'message': 'Error Updating Data',
    //             'obj': err
    //         });
    //     });
    // },

    getAttraction: function(req, res) {
        var id = req.params.id;
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