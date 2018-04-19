// jshint esversion:6

var imgur = require('imgur');
var imgurCred = require('./imgur-cred.json');

var albumId;

module.exports = {
    initialize: function() {
        imgur.setCredentials(imgurCred.username, imgurCred.password, imgurCred.clientId);
        albumId = 'NbE30rB';
    },
    uploadImage: function (encodedImage) {
        return new Promise ((resolve, reject) => {
            imgur.uploadBase64(encodedImage, albumId)
            .then(function (json) {
                resolve(json.data.link);
            }).catch(err => {
                reject(err);
            });
        });
      }
};