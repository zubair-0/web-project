const model = require('../models/model.js');

module.exports = {
    signup: function(req, res) {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;

        res.append('Access-Control-Allow-Origin', '*');
        
        model.addUser(username, email, password)
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

    signin: function(req, res) {
        email = req.body.email;
        password = req.body.password;

        model.loginUser(email, password)
        .then((result) => {
            res.status(201).json({
                message: 'SignedIn Successfully',
                obj: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error Signing In',
                obj: err
            })
        });
    }
}

// const model = require('../models/model.js');
// //model.initialize()

// module.exports = {
//     signup: function(req, res) {
//         username = req.body.username;
//         email = req.body.email;
//         password = req.body.password;

//         model.addUser(username, email, password)
//         .then((result) => {
//             res.status = 200;
//             res.json({});
//         })
//         .catch((err) => {
//             res.status = 777;
//             res.json({
//                 'message': 'Error Signing In',
//                 'obj': err
//             });
//         });
//     },

//     signin: function(req, res) {
//         email = req.body.email;
//         password = req.body.password;

//         model.loginUser(email, password)
//         .then((result) => {
//             res.status(201).json({
//                 message: 'SignedIn Successfully',
//                 obj: result
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: 'Error Signing In',
//                 obj: err
//             })
//         });
//     }
// }
    

// //     console.log(req.params)
// //     console.log(req.body)
// //     console.log(req.query)
    
// //     var obj = req.query;
// //       obj["error"] = "erroryo";
  
// //       console.log("Empty Params")
// //       console.log(obj)
  
// //     res.json(obj);
// //   });
  
  
  
// //   app.post('/login', (req, res) => {
  
// //     console.log(req.params)
// //     console.log(req.body)
// //     console.log(req.query)
  
// //     // email = req.body.email;
// //     // password = req.body.password;
  
// //     // loginUser(email, password)
// //     // .then((ans) => {
// //     //   res.send('root');
// //     // })
// //     // .catch((err) => {
// //     //   res.send('login');
// //     // });
    
// //     // res.status = 200;
// //     // res.json(obj);
// //   });
  
// //   app.get('/login', (req, res) => {
  
// //     console.log(req.params)
// //     console.log(req.body)
// //     console.log(req.query)
  
// //     // email = req.body.email;
// //     // password = req.body.password;
  
// //     // loginUser(email, password)
// //     // .then((ans) => {
// //     //   res.send('root');
// //     // })
// //     // .catch((err) => {
// //     //   res.send('login');
// //     // });
    
// //     // res.status = 200;
// //     // res.json(obj);
// //   });