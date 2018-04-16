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
    <v-toolbar
      app
      :clipped-left="clipped"
      :scroll-off-screen=false
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom offset-y>
        <v-btn slot="activator"><v-icon left dark>add_box</v-icon>Add</v-btn>
        <v-list>
          <v-list-tile v-for="adder in adders" :key="adder.title" @click="adder.call">
            <v-list-tile-title><v-icon left dark class="mr-2" v-html="adder.icon"></v-icon>{{ adder.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-items v-for="button in buttons" :key="button.title">
        <v-btn v-on:click="button.call" flat><v-icon left dark v-html="button.icon"></v-icon>{{button.title}}</v-btn>
      </v-toolbar-items>
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
                  <v-text-field label="Name" hint="Example: Burj Khalifa" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="City" hint="Example: Dubai" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Country" hint="Example: UAE" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="addAttractionDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addAttractionDialog = false">Add</v-btn>
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
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Name" hint="Example: Pearl Continental" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="City" hint="Example: Lahore" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
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

    <v-layout row justify-center>
      <v-dialog v-model="loginDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field name="email" label="Email" hint="Example: john.doe@mail.com" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field name="password" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="signupDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">SignUp</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Full Name"
                    hint="Example: John Doe"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name="username" label="Username" hint="Example: jdk" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name="email" label="Email" hint="Example: john.doe@mail.com" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name="password" label="Password" type="password" required></v-text-field>
                </v-flex>
                <!-- <v-flex xs12>
                  <v-text-field name="confirmPassword" label="Confirm Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    label="Age"
                    required
                    :items="['0-17', '18-29', '30-54', '54+']"
                  ></v-select>
                </v-flex> -->
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="signupDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signupDialog = false">SignUp</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-footer :fixed="fixed" app>
      <span>&copy; CruiseAide 2017-Present</span>
    </v-footer>
  </v-app>
</template>

<script>
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
        cuisine: ['Italian', 'Chinese', 'English'],
        accomodationTypes: ['Hotel', 'Rental House'],
        flightClasses: ['First', 'Business', 'Economy'],
        addAttractionDialog: false,
        addRestaurantDialog: false,
        addAccomodationDialog: false,
        addTravelDialog: false,
        loginDialog: false,
        signupDialog: false,
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'CruiseAide'
      }
    },
    methods: {
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
