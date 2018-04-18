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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      <v-menu bottom offset-y>
        <v-btn v-if="loggedIn" slot="activator"><v-icon left dark>add_box</v-icon>Add</v-btn>
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
          <v-list-tile @click="loggedIn = false">
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
                  <v-text-field v-model="addAttractionName" label="Name" hint="Example: Burj Khalifa" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="addAttractionLocation" label="Location" hint="Example: Dubai, UAE" required></v-text-field>
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
                  <v-text-field label="Name" hint="Example: Salt N Pepper" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="City" hint="Example: London" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Country" hint="Example: UK" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="cuisine"
                    label="Select Cuisine"
                    single-line
                  ></v-select>
                </v-flex>
              </v-layout>
              <star-rating :star-size="20" :increment="0.01"></star-rating>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addRestaurantDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addRestaurantDialog = false">Add</v-btn>
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
                  <v-text-field label="Name" hint="Example: Pearl Continental" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field label="City" hint="Example: Lahore" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field label="Country" hint="Example: PK" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="input"
                    label="Price"
                    id="price"
                    mask="#####"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="accomodationTypes"
                    v-model="e1"
                    label="Select Type"
                    single-line
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
              <star-rating :star-size="20" :increment="0.01"></star-rating>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addAccomodationDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addAccomodationDialog = false">Add</v-btn>
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
                  <v-text-field label="Source City" hint="Example: Dubai" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Source Country" hint="Example: UAE" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Destination City" hint="Example: Lahore" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Destination Country" hint="Example: Pakistan" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="airlines"
                    label="Select Airline"
                    single-line
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    :items="flightClasses"
                    label="Flight Class"
                    single-line
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
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addTravelDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addTravelDialog = false">Add</v-btn>
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
                <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="loginEmail"
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
                    v-model="loginPassword"
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
            call: this.addAttraction
          },
          {
            icon: 'restaurant',
            title: 'Restaurants',
            call: this.addRestaurant
          },
          {
            icon: 'hotel',
            title: 'Accomodation',
            call: this.addAccomodation
          },
          {
            icon: 'flight_takeoff',
            title: 'Travel',
            disabled: false,
            call: this.addTravel
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
        e1: [],
        flightClasses: ['First', 'Business', 'Economy'],
        addAttractionDialog: false,
        addRestaurantDialog: false,
        addAccomodationDialog: false,
        addTravelDialog: false,
        loginDialog: false,
        loginEmail: '',
        loginPassword: '',
        loggedIn: true,
        signupDialog: false,
        miniVariant: true,
        right: true,
        title: 'CruiseAide',
        username: 'zubair',
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
        addAttractionName: '',
        addAttractionLocation: '',
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

          axios.post('http://127.0.0.1:3000/signup', obj).then((res) => {
            console.log(res.status);
            
            if(res.data.message.toLowerCase().indexOf('error') !== -1)
            {
              this.errorMessage = res.data.obj.message;
              this.errorflag = true;
            }
          })
        }
      },
      signIn: function() {
        var obj = {
          email: this.loginEmail,
          password: this.loginPassword
        }
        axios.post('http://127.0.0.1:3000/login', obj).then((res) => {
            console.log(res.status);
            
            if(res.data.message != null) 
            {
              if(res.data.message.toLowerCase().indexOf('error') !== -1)
              {
                this.errorMessage = res.data.obj.message;
                this.errorflag = true;
              }
              else
              {
                this.loggedIn = true;
                this.username = this.loginEmail;
                this.loginDialog = false;
              }
            }
          })
      },
      addAttraction: function () {
        this.errorflag = false;
        
        var obj = {
          name: this.addAttractionName,
          location: this.addAttractionLocation,
          image: this.selectedImage
        }
        axios.post('http://127.0.0.1:3000/fetchAttractions/new', obj).then((res) => {
          console.log(res.status);
          
          if(res.data.message.toLowerCase().indexOf('error') !== -1)
          {
            this.errorMessage = res.data.obj.message;
            this.errorflag = true;
          }
        })
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
      addAttraction: function () {
        this.addAttractionDialog = true;
      },
      addRestaurant: function () {
        this.addRestaurantDialog = true;
      },
      addAccomodation: function () {
        this.addAccomodationDialog = true;
      },
      addTravel: function () {
        this.addTravelDialog = true;
      }
    }
  }
</script>
