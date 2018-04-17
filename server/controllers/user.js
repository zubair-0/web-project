const model = require('../models/model.js');

module.exports = {
    initialize: function() {
        model.initialize();
    },

    signup: function(req, res) {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;

        model.addUser(username, email, password)
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

    signin: function(req, res) {
        email = req.body.email;
        password = req.body.password;

        model.loginUser(email, password)
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