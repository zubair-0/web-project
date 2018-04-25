<template>
  <v-content> <!-- Content Of Restaurants Page Start From Here -->
      <section>
        <v-carousel hide-controls style="height:550">
          <v-carousel-item v-for="(pic,i) in restaurantPics" :src="pic.src" :key="i">
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
          <v-flex xs6 offset-xs4 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Popular Restaurants Around The World</h2>
              <span class="subheading">
                Become A Foodie
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
                <v-flex xs8 offset-xs2 v-model="showFilters">
                  <v-expansion-panel expand>
                    <v-expansion-panel-content>
                      <div slot="header">Cuisine</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Italian"
                          v-model="restaurantFilters.cuisines"
                          @change="filterResults"
                          value="Italian"
                        ></v-checkbox>
                        <v-checkbox
                          label="Chinese"
                          v-model="restaurantFilters.cuisines"
                          @change="filterResults"
                          value="Chinese"
                        ></v-checkbox>
                        <v-checkbox
                          label="English"
                          v-model="restaurantFilters.cuisines"
                          @change="filterResults"
                          value="English"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div slot="header">Features</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Delivery"
                          v-model="restaurantFilters.features"
                          @change="filterResults"
                          value="Delivery"
                        ></v-checkbox>
                        <v-checkbox
                          label="Buffet"
                          v-model="restaurantFilters.features"
                          @change="filterResults"
                          value="Buffet"
                        ></v-checkbox>
                        <v-checkbox
                          label="Takeout"
                          v-model="restaurantFilters.features"
                          @change="filterResults"
                          value="Takeout"
                        ></v-checkbox>
                        <v-checkbox
                          label="Bulk Order"
                          v-model="restaurantFilters.features"
                          @change="filterResults"
                          value="Bulk Order"
                        ></v-checkbox>
                        <v-checkbox
                          label="Event Organizers"
                          v-model="restaurantFilters.features"
                          @change="filterResults"
                          value="Event Organizers"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
                <v-flex class="my-3" xs12 sm6 md4 lg3 v-for="restaurant in filteredRestaurants" :key="restaurant.title">
                  <v-card>
                    <v-card-media
                      v-bind:src="restaurant.imgUrl"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{restaurant.title}}</div>
                        <span class="grey--text">{{restaurant.location}}</span>
                        <br>
                        <span class="grey--text">Cuisine: {{restaurant.cuisine}}</span>
                        <star-rating :star-size="20" :rating="restaurant.rating" :read-only="true" :increment="0.01"></star-rating>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn @click="rateTitle = restaurant.title; rateDialog = true;" v-if="$store.state.loggedIn" flat> Review </v-btn>
                      <nuxt-link :to="'/restaurants/' + camelify(restaurant.title)">
                        <v-btn flat color="primary">Details</v-btn>
                      </nuxt-link>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
      </section>
        <v-dialog v-model="rateDialog" max-width="800">
    <v-card>
      <v-card-title>
        <span class="headline">Provide Review</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <p>Select Rating</p>
              <v-icon v-for="i in rateRating" :key="i">star</v-icon>
              <v-slider v-model="rateRating" min="1" max="5" thumb-label step="1" ticks></v-slider>
            </v-flex>
            <v-flex xs12>
              <v-card-text>
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Review" v-model="rateReview" textarea></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="rateDialog = false">Cancel</v-btn>
        <v-btn color="primary" flat @click="rate">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
      <section>
        <v-parallax :src="require('@/static/mainpage.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Guaranteed The Best Quality Food</div>
            <h2>Start Your Food Hunt Today</h2>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
</template>

<script>
var axios = require('axios');
var camelCase = require('camel-case');

export default {
    data() {
        return {
            restaurantPics: [
                {
                    src: 'https://imgur.com/WQTxeH4.jpg',
                    title: "Indoor",
                    text: "We Recommend The Best Indoor Restaurants"
                },
                {
                    src: 'https://imgur.com/oQzKLgR.jpg',
                    title: "Outdoor",
                    text: "In Mood For Outdoor Sitting? We Got You Covered"
                },
                {
                    src: 'https://imgur.com/8WF7aRf.jpg',
                    title: "Cheaper",
                    text: "Running Low On Budget? We Got Just The Places For You"
                },
                {
                    src: 'https://imgur.com/vSQdKt1.jpg',
                    title: "Royalty",
                    text: "Experience The Most Luxurious Restaurants Around The World"
                }
            ],
            restaurants: [],
            restaurantFilters: {
                cuisines: [],
                features: []
            },
            cuisine: ['Italian', 'Chinese', 'English', 'Japanese'],
            filteredRestaurants: [],
            search: '',
            rateDialog: false,
            rateTitle: '',
            rateRating: 1,
            rateReview: ''
        };
    },
    asyncData () {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/fetchRestaurants').then(res => {
                resolve({
                    filteredRestaurants: res.data,
                    restaurants: res.data
                })
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
    },
    methods: {
        filterResults: function () {
            this.filteredRestaurants = this.restaurants.filter(resultant => {
                if (this.restaurantFilters.cuisines.some(resultArray => resultant.cuisine.includes(resultArray)) || this.restaurantFilters.cuisines.length === 0) {
                    if (this.restaurantFilters.features.some(resultArray => resultant.features.includes(resultArray)) || this.restaurantFilters.features.length === 0) {
                        if (resultant.title.toLowerCase().includes(this.search.toLowerCase())) {
                            return true;
                        }

                        if (resultant.location.toLowerCase().includes(this.search.toLowerCase())) {
                            return true;
                        }
                    }
                }
                return false;
            });
        },
        camelify: function(str) {
          return camelCase(str);
        },
        rate: function() {
          var fd = {
            title: this.rateTitle,
            user: this.$store.state.username,
            rating: this.rateRating,
            review: this.rateReview
          };
          axios.post('http://localhost:3000/addRestaurantRating', fd).then((res) => {
            console.log(res.status);
            if (res.data.message != null) {
              if (res.data.message.toLowerCase().indexOf('error') !== -1) {
                this.errorMessage = res.data.obj.message;
                this.errorflag = true;
              }
            }
            this.rateDialog = false;
          });
        }
    }
}
</script>

