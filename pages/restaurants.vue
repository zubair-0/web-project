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
                      v-bind:src="restaurant.image"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{restaurant.title}}</div>
                        <span class="grey--text">{{restaurant.city}}, {{restaurant.country}}</span>
                        <br>
                        <span class="grey--text">Cuisine: {{restaurant.cuisine}}</span>
                        <star-rating :star-size="20" :rating="restaurant.rating" :read-only="true" :increment="0.01"></star-rating>
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
        <v-parallax :src="require('@/static/mainpage.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Guaranteed The Best Quality Food</div>
            <h2>Start Your Food Hunt Today</h2>
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
    data() {
        return {
            restaurantPics: [
                {
                    src: require('@/static/restaurants/rest1.jpg'),
                    title: "Indoor",
                    text: "We Recommend The Best Indoor Restaurants"
                },
                {
                    src: require('@/static/restaurants/rest2.jpg'),
                    title: "Outdoor",
                    text: "In Mood For Outdoor Sitting? We Got You Covered"
                },
                {
                    src: require('@/static/restaurants/rest3.jpg'),
                    title: "Cheaper",
                    text: "Running Low On Budget? We Got Just The Places For You"
                },
                {
                    src: require('@/static/restaurants/rest4.jpg'),
                    title: "Royalty",
                    text: "Experience The Most Luxurious Restaurants Around The World"
                }
            ],
            restaurants: [
                {
                    title: 'Burj Khalifa',
                    city: 'Dubai',
                    country: 'UAE',
                    features: ['Buffet', 'Event Organizers', 'Takeout', 'Event Organizers'],
                    cuisine: ['Arabic', 'English', 'Japanese'],
                    image: require('@/static/restaurants/bkrestaurant.jpg'),
                    rating: 4.8
                },
                {
                    title: 'Salt N Pepper',
                    city: 'London',
                    country: 'UK',
                    features: ['Buffet', 'Takeout', 'Event Organizers'],
                    cuisine: ['Pakistani', 'Chinese', 'Italian'],
                    image: require('@/static/restaurants/snp.jpg'),
                    rating: 4.2
                },
                {
                    title: 'Papa John\'s',
                    city: 'New York',
                    country: 'USA',
                    features: ['Delivery', 'Takeout', 'Bulk Order'],
                    cuisine: ['Italian', 'English'],
                    image: require('@/static/restaurants/pjs.jpg'),
                    rating: 4.5
                },
                {
                    title: 'Okonomiyaki Kiji',
                    city: 'Osaka',
                    country: 'Japan',
                    features: ['Delivery', 'Takeout'],
                    cuisine: ['Japanese', 'Chinese'],
                    image: require('@/static/restaurants/oko.jpg'),
                    rating: 5
                },
                {
                    title: 'Biryani House',
                    city: 'Karachi',
                    country: 'Pakistan',
                    features: ['Delivery', 'Takeout', 'Bulk Order'],
                    cuisine: ['Pakistani', 'Chinese'],
                    image: require('@/static/restaurants/biryani.jpg'),
                    rating: 3.6
                },
                {
                    title: 'Prego',
                    city: 'Kuala Lumpur',
                    country: 'Malaysia',
                    features: ['Event Organizers'],
                    cuisine: ['Arabic', 'English', 'Japanese'],
                    image: require('@/static/restaurants/kuala.jpg'),
                    rating: 4.7
                },
                {
                    title: 'Ziafat',
                    city: 'Lahore',
                    country: 'Pakistan',
                    features: ['Buffet'],
                    cuisine: ['Pakistani', 'Chinese', 'Arabic'],
                    image: require('@/static/restaurants/ziafat.jpg'),
                    rating: 3.8
                }
            ],
            restaurantFilters: {
                cuisines: [],
                features: []
            },
            cuisine: ['Italian', 'Chinese', 'English'],
            filteredRestaurants: [
                {
                    title: 'Burj Khalifa',
                    city: 'Dubai',
                    country: 'UAE',
                    features: ['Buffet', 'Event Organizers', 'Takeout', 'Event Organizers'],
                    cuisine: ['Arabic', 'English', 'Japanese'],
                    image: require('@/static/restaurants/bkrestaurant.jpg'),
                    rating: 4.8
                },
                {
                    title: 'Salt N Pepper',
                    city: 'London',
                    country: 'UK',
                    features: ['Buffet', 'Takeout', 'Event Organizers'],
                    cuisine: ['Pakistani', 'Chinese', 'Italian'],
                    image: require('@/static/restaurants/snp.jpg'),
                    rating: 4.2
                },
                {
                    title: 'Papa John\'s',
                    city: 'New York',
                    country: 'USA',
                    features: ['Delivery', 'Takeout', 'Bulk Order'],
                    cuisine: ['Italian', 'English'],
                    image: require('@/static/restaurants/pjs.jpg'),
                    rating: 4.5
                },
                {
                    title: 'Okonomiyaki Kiji',
                    city: 'Osaka',
                    country: 'Japan',
                    features: ['Delivery', 'Takeout'],
                    cuisine: ['Japanese', 'Chinese'],
                    image: require('@/static/restaurants/oko.jpg'),
                    rating: 5
                },
                {
                    title: 'Biryani House',
                    city: 'Karachi',
                    country: 'Pakistan',
                    features: ['Delivery', 'Takeout', 'Bulk Order'],
                    cuisine: ['Pakistani', 'Chinese'],
                    image: require('@/static/restaurants/biryani.jpg'),
                    rating: 3.6
                },
                {
                    title: 'Prego',
                    city: 'Kuala Lumpur',
                    country: 'Malaysia',
                    features: ['Event Organizers'],
                    cuisine: ['Arabic', 'English', 'Japanese'],
                    image: require('@/static/restaurants/kuala.jpg'),
                    rating: 4.7
                },
                {
                    title: 'Ziafat',
                    city: 'Lahore',
                    country: 'Pakistan',
                    features: ['Buffet'],
                    cuisine: ['Pakistani', 'Chinese', 'Arabic'],
                    image: require('@/static/restaurants/ziafat.jpg'),
                    rating: 3.8
                }
            ],
            search: ''
        };
    },
    methods: {
        filterResults: function () {
            this.filteredRestaurants = this.restaurants.filter(resultant => {
                if (this.restaurantFilters.cuisines.some(resultArray => resultant.cuisine.includes(resultArray)) || this.restaurantFilters.cuisines.length === 0) {
                    if (this.restaurantFilters.features.some(resultArray => resultant.features.includes(resultArray)) || this.restaurantFilters.features.length === 0) {
                        if (resultant.title.toLowerCase().includes(this.search.toLowerCase())) {
                            return true;
                        }

                        if (resultant.city.toLowerCase().includes(this.search.toLowerCase())) {
                            return true;
                        }

                        if (resultant.country.toLowerCase().includes(this.search.toLowerCase())) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
    }
}
</script>

