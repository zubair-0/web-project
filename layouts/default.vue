<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="loggedIn && isBusinessUser" bottom offset-y>
        <v-btn slot="activator"><v-icon left dark>add_box</v-icon>Add</v-btn>
        <v-list>
          <v-list-tile v-for="adder in adders" :key="adder.title" @click="adder.call">
            <v-list-tile-title><v-icon left dark class="mr-2" v-html="adder.icon"></v-icon>{{ adder.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-items v-for="button in buttons" :key="button.title">
        <v-btn v-if="!loggedIn" v-on:click="button.call" flat><v-icon left dark v-html="button.icon"></v-icon>{{button.title}}</v-btn>
      </v-toolbar-items>
      <v-menu v-if="loggedIn" bottom offset-y>
        <v-btn slot="activator" flat><v-icon left dark>person</v-icon>{{ username }}</v-btn>
        <v-list>
          <v-list-tile @click="logOut">
            <v-icon style="margin-right: 10px" dark>cloud_off</v-icon><v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    
    <nuxt />

    <v-layout row justify-center>
      <v-dialog v-model="addAttractionDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Attraction Place</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newAttractionName" label="Name" hint="Example: Burj Khalifa" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newAttractionLocation" label="Location" hint="Example: Dubai, UAE" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <input @change="onImageUpload" type="file" hint="Select Image" required/>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addAttractionDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addAttraction">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="addRestaurantDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Restaurant</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newRestaurantName" label="Name" hint="Example: Salt N Pepper" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newRestaurantLocation" label="Location" hint="Example: London, UK" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="cuisine"
                    label="Select Cuisine"
                    single-line
                    v-model="newRestaurantCuisines"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <input @change="onImageUpload" type="file" hint="Select Image" required/>
                </v-flex>
              </v-layout>
              <star-rating :star-size="20" :increment="0.01"></star-rating>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addRestaurantDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addRestaurant">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="addAccomodationDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Accomodation</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field v-model="newAccomodationName" label="Name" hint="Example: Pearl Continental" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field v-model="newAccomodationLocation" label="Location" hint="Example: Lahore, PK" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="input"
                    label="Price"
                    id="price"
                    mask="#####"
                    v-model="newAccomodationPrice"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="accomodationTypes"
                    label="Select Type"
                    single-line
                    v-model="newAccomodationType"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-expansion-panel expand>
                    <v-expansion-panel-content>
                      <div slot="header" >Select Features</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Gym"
                          v-model="restaurantFilters.features"
                          value="Gym"
                        ></v-checkbox>
                        <v-checkbox
                          label="Spa"
                          v-model="restaurantFilters.features"
                          value="Spa"
                        ></v-checkbox>
                        <v-checkbox
                          label="Swimming Pool"
                          v-model="restaurantFilters.features"
                          value="SwimmingPool"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <input @change="onImageUpload" type="file" hint="Select Image" required/>
                </v-flex>
              </v-layout>
              <star-rating :star-size="20" :increment="0.01"></star-rating>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addAccomodationDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addAccomodation">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="addTravelDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Ticket</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newTravelSource" label="Source Location" hint="Example: Dubai, UAE" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="newTravelDestination" label="Destination Location" hint="Example: London, UK" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="airlines"
                    label="Select Airline"
                    single-line
                    v-model="newTravelAirline"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="flightClasses"
                    label="Flight Class"
                    single-line
                    v-model="newTravelClass"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="input"
                    label="Price"
                    id="ticketPrice"
                    mask="#####"
                    v-model="newTravelPrice"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <input @change="onImageUpload" type="file" hint="Select Image" required/>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addTravelDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addTravel">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-dialog v-model="loginDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn fab dark large color="purple"  @click="signInWithFacebook">
                  <v-icon dark>android</v-icon>
                </v-btn>
                <span class="headline">Login with Facebook</span>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="signinEmail"
                    type="email"
                    hint="Example: john.doe@mail.com"
                    :rules="emailRules"
                    required
                  >
                  </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="signinPassword"
                    type="password"
                    required
                  >
                  </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="signIn">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="signupDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="name"
                    label="Username"
                    id="name"
                    v-model="name"
                    hint="Example: john.doe"
                    :rules="nameRules"
                    :counter="10"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    hint="Example: john.doe@mail.com"
                    :rules="emailRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[confirmPasswordRule]"
                  >
                  </v-text-field>
                </v-flex>
                <v-alert type="error" :value="errorFlag">
                  {{ errorMessage }}
                </v-alert>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
             <v-flex xs12>
                <v-btn color="blue darken-1" flat @click.native="signupDialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="signUp">Sign Up</v-btn>
              </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-footer :fixed="fixed" app>
      <span>&copy; CruiseAide 2017-Present</span>
    </v-footer>
  </v-app>
</template>

<script>
  var axios = require('axios');
  var firebase = require('firebase');

  var clientAccount = require('../server/models/client.json');
    

  export default {
    data() {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'favorite_border', title: 'Attractions', to: '/attractions' },
          { icon: 'restaurant', title: 'Restaurants', to: '/restaurants' },
          { icon: 'hotel', title: 'Accomodotions', to: '/accomodations' },
          { icon: 'flight_takeoff', title: 'Travels', to: '/travels' }
        ],
        adders: [
          {
            icon: 'favorite_border',
            title: 'Attractions',
            call: this.addAttractionDialogFunc
          },
          {
            icon: 'restaurant',
            title: 'Restaurants',
            call: this.addRestaurantDialogFunc
          },
          {
            icon: 'hotel',
            title: 'Accomodation',
            call: this.addAccomodationDialogFunc
          },
          {
            icon: 'flight_takeoff',
            title: 'Travel',
            call: this.addTravelDialogFunc
          }
        ],
        buttons: [
          {
            icon: 'input',
            title: 'Login',
            call: this.login
          },
          {
            icon: 'create',
            title: 'SignUp',
            call: this.signup
          }
        ],
        airlines: [
          'Emirates', 'Air France', 'Turkish Airlines', 'Japan Airlines', 'Air Blue', 'Shaheen Airlines', 'PIA', 'Air Canada'
        ],
        restaurantFilters: {
          cuisines: [],
          features: []
        },
        accomodationFilters: {
          price: 5000,
          types: [],
          features: []
        },
        travelFilters: {
          price: 5000,
          classes: [],
          airlines: []
        },
        cuisine: ['Italian', 'Chinese', 'English', 'Japanese'],
        accomodationTypes: ['Hotel', 'Rental House'],
        flightClasses: ['First', 'Business', 'Economy'],
        addAttractionDialog: false,
        addRestaurantDialog: false,
        addAccomodationDialog: false,
        addTravelDialog: false,
        loginDialog: false,
        signinEmail: '',
        signinPassword: '',
        loggedIn: false,
        signupDialog: false,
        miniVariant: true,
        right: true,
        title: 'CruiseAide',
        username: 'zubair.ejaz@gmail.com',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 50) || 'Name must be less than 50 characters'
        ],
        emailRules: [
          v => !!v || 'Email is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
        ],
        errorFlag: false,
        errorMessage: '',
        newAttractionName: '',
        newAttractionLocation: '',
        newRestaurantName: '',
        newRestaurantLocation: '',
        newRestaurantCuisines: [],
        newAccomodationName: '',
        newAccomodationLocation: '',
        newAccomodationPrice: '',
        newAccomodationType: '',
        newTravelSource: '',
        newTravelDestination: '',
        newTravelAirline: '',
        newTravelClass: '',
        newTravelPrice: '',
        selectedImage: '',
        isBusinessUser: false,
        businessUsers: ['zubair.ejaz@live.com', 'zubair.ejaz@gmail.com'],
        withFacebook: false,
        appInitialized: false,
        friendsList: [],
        total_friends: 0
      }
    },
    computed: {
      confirmPasswordRule () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      }
    },
    methods: {
      signUp: function () {
        this.errorFlag = false;

        if (this.password === this.confirmPassword) {
          var obj = {
            'username': this.name,
            'email': this.email,
            'password': this.password
          };

          axios.post('http://localhost:3000/signup', obj).then((res) => {
            console.log(res);
            
            if(res.data.message != null)
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
            }
            else
            {
              this.signUpDialog = false;
            }
          })
        }
      },
      signIn: function() {
        var obj = {
          email: this.signinEmail,
          password: this.signinPassword
        }
        axios.post('http://localhost:3000/login', obj).then((res) => {
            console.log(res);
            
            if(res.data.message != null) 
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
              else
              {
                this.loggedIn = true;
                this.username = this.signinEmail;
                this.loginDialog = false;

                this.$store.commit('update', this.signinEmail);
                this.$store.commit('setID', 0);
                this.$store.commit('setLogin');
                
                if (this.businessUsers.includes(this.signinEmail)) {
                  this.isBusinessUser = true;
                }
              }
            }
          })
      },
      promisesignInWithFacebook: function() {
        if (!this.appInitialized) {
          var config = clientAccount;
          firebase.initializeApp(config);
          this.appInitialized = true;
        }

        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_friends');  // need the list of friends to get their reviews and rating on our app

        return new Promise((resolve, reject) => {
          firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            // var user = result.user;
            // // ...

            // console.log(token);
            // console.log(user);
            resolve(result);
          }).catch(function(error) {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // // ...
            reject(error);
            // reject(errorCode + errorMessage + email + credential);
          });
	    	});
      },
      signInWithFacebook: function() {
        this.promisesignInWithFacebook()
        .then((res) => {

          var token = res.credential.accessToken;
          var user = res.user;
          var userInfo = res.additionalUserInfo.profile;

          this.loggedIn = true;
          this.username = user.displayName;
          this.loginDialog = false;
          this.withFacebook = true;

          this.$store.commit('update', user.displayName);
          this.$store.commit('setID', userInfo.id);
          this.$store.commit('setLogin');
          if (this.businessUsers.includes(user.email)) {
            // console.log("Business User");
            this.isBusinessUser = true;
          }
          else {
            // console.log("Normal User");
          }

          // console.log(token);
          // console.log(user);
          // console.log(userInfo);

          var id = userInfo.id;
          axios.get('https://graph.facebook.com/v3.0/' + id + '/friends?access_token=' + token)
          .then((result) => {
            console.log(result.data.data);

            result.data.data.forEach(element => {
              this.friendsList.push(element.id)
            });
            this.total_friends = result.data.summary.total_count;
            
            // console.log("Friend List with our App");
            console.log(this.friendsList);
            console.log(this.total_friends);
          })
          .catch((error) => {
            console.log(error);
          });

          // console.log(this.friendsList);
          // console.log(this.total_friends);
          var obj = {
            userid: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            accessToken: token,
            friends: this.friendsList
          }
          console.log("Object");
          console.log(obj);

          axios.post('http://localhost:3000/addFacebookUser', obj).then((resc) => {
            console.log(resc);
          })
          .catch((errc) => {
            console.log(errc);
          });

        })
        .catch((err) => {   
          console.log(err);
        })
      },
      signOutWithFacebook: function() {
        firebase.auth().signOut().then(function() {
          console.log("Signed Out Successfully");
        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });         
      },
      logOut: function() {
        if (this.withFacebook) {
          this.withFacebook = false;
          this.signOutWithFacebook();
        }

        this.loggedIn = false;
        this.isBusinessUser = false;
        this.$store.commit('unsetLogin');
      },
      readFile : function ()
      {
        return new Promise((resolve, reject) => {
          var reader = new FileReader();

          reader.onload = function() {
            var buffer = reader.result;
            //console.log(buffer);
            var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
            resolve(base64String);
          }

          reader.readAsArrayBuffer(this.selectedImage);
        })
      },
      addAttraction: function () {
        this.errorflag = false;

        this.readFile().then(enc => {
          var fd = {
            title: this.newAttractionName,
            location: this.newAttractionLocation,
            image: enc
          };

          axios.post('http://localhost:3000/addAttraction', fd).then((res) => {
            console.log(res.status);

            if(res.data.message != null)
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                console.log(res.data);
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
            }
          })
        })
      },
      addAccomodation: function () {
        this.errorflag = false;

        this.readFile().then(enc => {
          var fd = {
            title: this.newAccomodationName,
            location: this.newAccomodationLocation,
            price: this.newAccomodationPrice,
            type: this.newAccomodationType,
            image: enc
          };

          axios.post('http://localhost:3000/addAccomodation', fd).then((res) => {
            console.log(res.status);

            if(res.data.message != null)
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                console.log(res.data);
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
            }
          })
        })
      },
      addRestaurant: function () {
        this.errorflag = false;

        this.readFile().then(enc => {
          var fd = {
            title: this.newRestuarantName,
            location: this.newRestuarantLocation,
            newcuisines: this.newRestaurantCuisines,
            image: enc
          };

          axios.post('http://localhost:3000/addRestaurant', fd).then((res) => {
            console.log(res.status);

            if(res.data.message != null)
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                console.log(res.data);
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
            }
          })
        })
      },
      addTravel: function () {
        this.errorflag = false;

        this.readFile().then(enc => {
          var fd = {
            source: this.newTravelSource,
            destination: this.newTravelDestination,
            airline: this.newTravelAirline,
            class: this.newTravelClass,
            price: this.newTravelPrice,
            image: enc
          };

          axios.post('http://localhost:3000/addTravel', fd).then((res) => {
            console.log(res.status);

            if(res.data.message != null)
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                console.log(res.data);
                this.errorMessage = res.data.obj.message;
                this.errorFlag = true;
              }
            }
          })
        })
      },
      onImageUpload: function(event) {
        var buffer;
        this.selectedImage = event.target.files[0];
      },
      add: function () {
        this.addDialog = true;
      },
      login: function () {
        this.loginDialog = true;
      },
      signup: function () {
        this.signupDialog = true;
      },
      addAttractionDialogFunc: function () {
        this.addAttractionDialog = true;
      },
      addRestaurantDialogFunc: function () {
        this.addRestaurantDialog = true;
      },
      addAccomodationDialogFunc: function () {
        this.addAccomodationDialog = true;
      },
      addTravelDialogFunc: function () {
        this.addTravelDialog = true;
      }
    }
  }
</script>
