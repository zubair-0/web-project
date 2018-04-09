<template>
  <v-content> <!-- Content Of Attractions Page Start From Here -->
      <section id="inspire">
        <v-carousel hide-controls style="height:535px;">
          <v-carousel-item v-for="(pic,i) in attractionPics" :src="pic.src" :key="i">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
              style="margin-top: 80px;"
            >
              <h1 class="white--text mb-2 display-3 text-xs-center" style="font-size: 50px;">{{pic.title}}</h1>
              <h2 class="white--text my-3 text-xs-center">{{pic.text}}</h2>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </section>
      <section>
        <v-flex xs6 offset-xs4 sm4 class="my-5">
            <div class="text-xs-center">
              <h2 class="headline">Popular Attractions Around The World</h2>
              <span class="subheading">
                Live Your Dream
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs8 offset-xs2>
                  <v-text-field
                  label="Search By Name or City"
                  single-line
                  append-icon="search"
                  v-model="search"
                  @keyup="filterResults"
                  ></v-text-field>
                </v-flex>
                <v-flex class="my-3" xs12 sm6 md4 lg3 v-for="place in filteredAttractions" :key="place.title">
                  <v-card>
                    <v-card-media
                      v-bind:src="place.image"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{place.title}}</div>
                        <span class="grey--text">{{place.city}}, {{place.country}}</span>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat>Share</v-btn>
                      <v-btn flat color="primary">Details</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
      </section>
      <section>
        <v-parallax :src="require('@/assets/flamingo.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Sightseeing Has Never Been More Fun</div>
            <h2>Don't Miss Out And Start Exploring Today</h2>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="#"
              @click="homeClicked"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
</template>

<script>
export default {
    data () {
    return {
      attractionPics: [
        {
          src: require('@/assets/attractions/uae.jpg'),
          title: "Dubai",
          text: "Visit The Tallest Building In The World"
        },
        {
          src: require('@/assets/attractions/turkey.jpg'),
          title: "Turkey",
          text: "Check Out The Heritage Of The Ottoman Empire"
        },
        {
          src: require('@/assets/attractions/italy.jpg'),
          title: "Italy",
          text: "See The Architectural Beauty Of The Romans"
        },
        {
          src: require('@/assets/attractions/greece.jpg'),
          title: "Greece",
          text: "We Provide You With The Great Views"
        }
      ],
      items: [
        {
          icon: 'home',
          title: 'Home',
          disabled: true,
          call: this.homeClicked
        },
        {
          icon: 'favorite_border',
          title: 'Attractions',
          disabled: false,
          call: this.attractionsClicked
        },
        {
          icon: 'restaurant',
          title: 'Restaurants',
          disabled: false,
          call: this.restaurantsClicked
        },
        {
          icon: 'hotel',
          title: 'Accomodation',
          disabled: false,
          call: this.accomodationClicked
        },
        {
          icon: 'flight_takeoff',
          title: 'Travel',
          disabled: false,
          call: this.travelClicked
        }
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
      attractions: [
        {
          title: 'Burj Khalifa',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/burj.jpg')
        },
        {
          title: 'Eiffel Tower',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/eiffel.jpg')
        },
        {
          title: 'Toronto Tower',
          city: 'Toronto',
          country: 'Canada',
          image: require('@/assets/attractions/tower.jpg')
        },
        {
          title: 'Palm Jumeirah',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/palm.jpg')
        },
        {
          title: 'Shibuya',
          city: 'Tokyo',
          country: 'Japan',
          image: require('@/assets/attractions/shibu.jpg')
        },
        {
          title: 'Niagara Falls',
          city: 'Toronto',
          country: 'Canada',
          image: require('@/assets/attractions/niagara.jpg')
        },
        {
          title: 'Mount Fuji',
          city: 'Honshu Island',
          country: 'Japan',
          image: require('@/assets/attractions/fuji.jpg')
        },
        {
          title: 'Atlantis',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/atlantis.jpg')
        },
        {
          title: 'Arc de Triomphe',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/arc.jpg')
        },
        {
          title: 'The Atsuta Shrine',
          city: 'Nagoya',
          country: 'Japan',
          image: require('@/assets/attractions/nagoya.jpg')
        },
        {
          title: 'Le Sacre Coeur',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/paris.jpg')
        },
        {
          title: 'Marché Bonsecours',
          city: 'Montreal',
          country: 'Canada',
          image: require('@/assets/attractions/montreal.jpg')
        }
      ],
      
      homePage: true,
      attractionsPage: false,
      restaurantsPage: false,
      accomodationPage: false,
      travelPage: false,
      
      addAttractionDialog: false,
      addRestaurantDialog: false,
      addAccomodationDialog: false,
      addTravelDialog: false,
      loginDialog: false,
      signupDialog: false,
      
      showFilters: false,
      filteredAttractions: [
          {
          title: 'Burj Khalifa',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/burj.jpg')
        },
        {
          title: 'Eiffel Tower',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/eiffel.jpg')
        },
        {
          title: 'Toronto Tower',
          city: 'Toronto',
          country: 'Canada',
          image: require('@/assets/attractions/tower.jpg')
        },
        {
          title: 'Palm Jumeirah',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/palm.jpg')
        },
        {
          title: 'Shibuya',
          city: 'Tokyo',
          country: 'Japan',
          image: require('@/assets/attractions/shibu.jpg')
        },
        {
          title: 'Niagara Falls',
          city: 'Toronto',
          country: 'Canada',
          image: require('@/assets/attractions/niagara.jpg')
        },
        {
          title: 'Mount Fuji',
          city: 'Honshu Island',
          country: 'Japan',
          image: require('@/assets/attractions/fuji.jpg')
        },
        {
          title: 'Atlantis',
          city: 'Dubai',
          country: 'UAE',
          image: require('@/assets/attractions/atlantis.jpg')
        },
        {
          title: 'Arc de Triomphe',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/arc.jpg')
        },
        {
          title: 'The Atsuta Shrine',
          city: 'Nagoya',
          country: 'Japan',
          image: require('@/assets/attractions/nagoya.jpg')
        },
        {
          title: 'Le Sacre Coeur',
          city: 'Paris',
          country: 'France',
          image: require('@/assets/attractions/paris.jpg')
        },
        {
          title: 'Marché Bonsecours',
          city: 'Montreal',
          country: 'Canada',
          image: require('@/assets/attractions/montreal.jpg')
        }
      ],
      search: '',
      clipped: true,
      drawer: true,
      fixed: false,
      
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'CruiseAide',
      
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
      ]
    };
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
    },
    disable: function () {
      this.items[0].disabled = false;
      this.items[1].disabled = false;
      this.items[2].disabled = false;
      this.items[3].disabled = false;
      this.items[4].disabled = false;
    },
    homeClicked: function () {
      this.disable();
      this.items[0].disabled = true;
      this.homePage = true;
      this.attractionsPage = false;
      this.restaurantsPage = false;
      this.accomodationPage = false;
      this.travelPage = false;
    },
    attractionsClicked: function () {
      this.disable();
      this.items[1].disabled = true;
      this.homePage = false;
      this.attractionsPage = true;
      this.restaurantsPage = false;
      this.accomodationPage = false;
      this.travelPage = false;
      this.filteredAttractions = this.attractions;
    },
    restaurantsClicked: function () {
      this.disable();
      this.items[2].disabled = true;
      this.homePage = false;
      this.attractionsPage = false;
      this.restaurantsPage = true;
      this.accomodationPage = false;
      this.travelPage = false;
      this.filteredRestaurants = this.restaurants;
    },
    accomodationClicked: function () {
      this.disable();
      this.items[3].disabled = true;
      this.homePage = false;
      this.attractionsPage = false;
      this.restaurantsPage = false;
      this.accomodationPage = true;
      this.travelPage = false;
      this.filteredAccomodations = this.accomodations;
    },
    travelClicked: function () {
      this.disable();
      this.items[4].disabled = true;
      this.homePage = false;
      this.attractionsPage = false;
      this.restaurantsPage = false;
      this.accomodationPage = false;
      this.travelPage = true;
      this.filteredTravels = this.travels;
    },
    filterResults: function () {
      this.filteredAttractions = this.attractions.filter(resultant => {
          if (resultant.title.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          }
          if (resultant.city.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          }
          if (resultant.country.toLowerCase().includes(this.search.toLowerCase())) {
            return true;
          }
          return false;
        });
    }
  },
  name: 'App'
}
</script>
