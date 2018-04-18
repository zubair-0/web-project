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

    updateTravel: function(req, res) {
        id = req.params.id
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

    getTravel: function(req, res) {
        id = req.params.id
        model.getTravel(id)
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

    getAllTravels: function(req, res) {
        model.getAllTravels()
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