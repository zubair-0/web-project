var admin = require('firebase-admin');
var firebase = require('firebase');
var camelCase = require('camelcase');

var db;

module.exports = {
	initialize: function() {
		var adminAccount = require('./admin.json');
		var clientAccount = require('./client.json');

		admin.initializeApp({
		  credential: admin.credential.cert(adminAccount)
		});

		var config = clientAccount;
		firebase.initializeApp(config);

		db = admin.firestore();

		console.log('model online');
	},

	addUser: function (username, email, password) {
		return new Promise((resolve, reject) => {
			admin.auth().createUser({
			email: email,
			emailVerified: false,
			password: password,
			displayName: username,
			disabled: false
			}).then(function(userRecord) {
				resolve(userRecord);
			}).catch(function(error) {
				reject(error);
			});
		});
	},

	loginUser: function (email, password) {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				reject(errorCode + errorMessage);
			}).then((cred) => {
				resolve(cred)
			});
		});
	},

	addAttraction: function (title, location, imgUrl) {
		return new Promise((resolve, reject) => {
			var id = camelCase(title);
			var docRef = db.collection('attractions').doc(id);

			var setRef = docRef.set({
				title: title,
				location: location,
				imgUrl: imgUrl
			}).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	addAccomodation: function (title, location, imgUrl, price, features, type, rating) {
		return new Promise((resolve, reject) => {
			var id = camelCase(title);
			var docRef = db.collection('accomodation').doc(id);

			var setRef = docRef.set({
				title: title,
				location: location,
				imgUrl: imgUrl,
				price: price,
				features: features,
				type: type,
				rating: rating
			}).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	addRestaurant: function (title, location, imgUrl, features, cuisine, rating) {
		return new Promise((resolve, reject) => {
			var id = camelCase(title);
			var docRef = db.collection('restaurant').doc(id);

			var setRef = docRef.set({
				title: title,
				location: location,
				imgUrl: imgUrl,
				features: features,
				cuisine: cuisine,
				rating: rating
			}).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	addTravel: function (title, source, destination, cls, price, imgUrl) {
		return new Promise((resolve, reject) => {
			var id = camelCase(title);
			var docRef = db.collection('travel').doc(id);

			var setRef = docRef.set({
				title: title,
				source: source,
				imgUrl: imgUrl,
				destination: destination,
				class: cls,
				price: price
			}).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	updateAttraction: function (id, obj) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('attractions').doc(id);
			var updateRef = docRef.update(obj).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	updateAccomodation: function (id, obj) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('accomodation').doc(id);
			var updateRef = docRef.update(obj).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	updateRestaurant: function (id, obj) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('restaurant').doc(id);
			var updateRef = docRef.update(obj).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	updateTravel: function (id, obj) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('travel').doc(id);
			var updateRef = docRef.update(obj).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	getAttraction: function (id) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('attractions').doc(id);
			var getRef = docRef.get().then((data) => {
				if (data.exists) {
					resolve(data.data());
				} else {
					reject('error fetching data');
				}
			});
		})
	},

	getAccomodation: function (id) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('accomodation').doc(id);
			var getRef = docRef.get().then((data) => {
				if (data.exists) {
					resolve(data.data());
				} else {
					reject('error fetching data');
				}
			});
		})
	},

	getRestaurant: function (id) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('restaurant').doc(id);
			var getRef = docRef.get().then((data) => {
				if (data.exists) {
					resolve(data.data());
				} else {
					reject('error fetching data');
				}
			});
		})
	},

	getTravel: function (id) {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('travel').doc(id);
			var getRef = docRef.get().then((data) => {
				if (data.exists) {
					resolve(data.data());
				} else {
					reject('error fetching data');
				}
			});
		})
	},

	getAllAttractions: function () {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('attractions');
			var data = []
			var getRef = docRef.get().then(snapshot => {
		      
		      snapshot.forEach(doc => {
		      	var entry = doc.data();
		      	entry.id = doc.id;
		        data.push(entry)
		      });

		      resolve(data);
		    }).catch(err => {
		      reject(err);
		    });
		})
	},

	getAllAccomodations: function () {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('accomodation');
			var data = []
			var getRef = docRef.get().then(snapshot => {
		      
		      snapshot.forEach(doc => {
		      	var entry = doc.data();
		      	entry.id = doc.id;
		        data.push(entry)
		      });

		      resolve(data);
		    }).catch(err => {
		      reject(err);
		    });
		})
	},

	getAllRestaurants: function () {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('restaurant');
			var data = []
			var getRef = docRef.get().then(snapshot => {
		      
		      snapshot.forEach(doc => {
		      	var entry = doc.data();
		      	entry.id = doc.id;
		        data.push(entry)
		      });

		      resolve(data);
		    }).catch(err => {
		      reject(err);
		    });
		})
	},

	getAllTravels: function () {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('travel');
			var data = []
			var getRef = docRef.get().then(snapshot => {
		      
		      snapshot.forEach(doc => {
		      	var entry = doc.data();
		      	entry.id = doc.id;
		        data.push(entry)
		      });

		      resolve(data);
		    }).catch(err => {
		      reject(err);
		    });
		})
	},

	addFacebookUser: function(userid, email, name, accessToken, friends) {
		return new Promise((resolve, reject) => {
			
			var id = camelCase(userid);
			var docRef = db.collection('facebookUsers').doc(id);
	
			var setRef = docRef.set({
				userid: userid,
				email: email,
				name: name,
				accessToken: accessToken,
				friends: friends
			}).then((ref) => {
				resolve(ref);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	getFacebookUser: function(userid) {
		return new Promise((resolve, reject) => {
		  db.collection("facebookUsers").where("userid", "==", userid)
			.get()
			.then(function(querySnapshot) {
						var data = []
			  querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				data.push(doc.data());
			  });
						resolve(data);
			})
			.catch(function(error) {
			  reject(error);
			});
		});
	},
	
	getAllFacebookUsers: function () {
		return new Promise((resolve, reject) => {
			var docRef = db.collection('facebookUsers');
			var data = []
			var getRef = docRef.get().then(snapshot => {
		      
		      snapshot.forEach(doc => {
		      	var entry = doc.data();
		      	entry.id = doc.id;
		        data.push(entry)
		      });

		      resolve(data);
		    }).catch(err => {
		      reject(err);
		    });
		})
	},

	addRestaurantRating: function(title, user, rating, review, userid) {
			return new Promise((resolve, reject) => {
				var id = camelCase(title) + '-' + camelCase(user);
				var docRef = db.collection('restaurantRating').doc(id);
		
				var setRef = docRef.set({
				title: title,
				user: user,
				rating: rating,
				review: review,
				userid: userid
				}).then((ref) => {
				resolve(ref);
				}).catch((err) => {
				reject(err);
				});
			});
	  },
	
	  getRestaurantRating: function(title) {
			return new Promise((resolve, reject) => {
				db.collection("restaurantRating").where("title", "==", title)
				.get()
				.then(function(querySnapshot) {
							var data = []
					querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					data.push(doc.data());
					});
							resolve(data);
				})
				.catch(function(error) {
					reject(error);
				});
			});
	  },
	
	  addAccomodationRating: function(title, user, rating, review) {
			return new Promise((resolve, reject) => {
				var id = camelCase(title) + '-' + camelCase(user);
				var docRef = db.collection('accomodationRating').doc(id);
		
				var setRef = docRef.set({
				title: title,
				user: user,
				rating: rating,
				review: review
				}).then((ref) => {
				resolve(ref);
				}).catch((err) => {
				reject(err);
				});
			});
	  },
	
	  getAccomodationRating: function(title) {
			return new Promise((resolve, reject) => {
				db.collection("accomodationRating").where("title", "==", title)
				.get()
				.then(function(querySnapshot) {
							var data = []
					querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					data.push(doc.data());
					});
							resolve(data);
				})
				.catch(function(error) {
					reject(error);
				});
			});
	  }
}

// model.addAttraction('Mount Fuji', 'Tokyo, Japan', 'https://i.imgur.com/dAof5Vy.jpg')
// model.loginUser('ali60351@gmail.com','password');

// model.getAttraction('mountFuji').then((data) => {
// 	console.log(data);
// });

// model.getAllAttractions().then((data) => {
// 	console.log(data);
// })

// model.updateAttraction('mountFuji', {title: 'Fujix'}).then((ref) => {
// 	console.log(ref);
// }).catch((err) => {
// 	console.log(err);
// })