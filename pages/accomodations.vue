<template>
  <v-content> <!-- Content Of Accomodation Page Start From Here -->
      <section>
        <v-carousel hide-controls style="height:550">
          <v-carousel-item v-for="(pic,i) in accomodationPics" :src="pic.src" :key="i">
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
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Popular Hotels Around The World</h2>
              <span class="subheading">
                Live Luxurious Life
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
                <v-flex xs8 offset-xs2>
                  <h1 class="subheading left">Price Range</h1>
                </v-flex>
                <v-flex xs4 offset-xs2>
                  <v-card>
                    <v-card-actions>
                      <v-slider @mouseup="filterResults" :max="5000" v-model="accomodationFilters.price" thumb-label step="500" ticks></v-slider>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    name="input-1-3"
                    label="Hint Text"
                    single-line
                    prepend-icon="monetization_on"
                    v-model="accomodationFilters.price"
                    @keyup="filterResults"
                    disabled="true"
                  ></v-text-field>
                </v-flex>
                <v-flex xs8 offset-xs2 v-model="showFilters">
                  <v-expansion-panel expand>
                    <v-expansion-panel-content>
                      <div slot="header">Type</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Hotel"
                          v-model="accomodationFilters.types"
                          @change="filterResults"
                          value="Hotel"
                        ></v-checkbox>
                        <v-checkbox
                          label="Rental Home"
                          v-model="accomodationFilters.types"
                          @change="filterResults"
                          value="RentalHome"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div slot="header">Features</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Gym"
                          v-model="accomodationFilters.features"
                          @change="filterResults"
                          value="Gym"
                        ></v-checkbox>
                        <v-checkbox
                          label="Spa"
                          v-model="accomodationFilters.features"
                          @change="filterResults"
                          value="Spa"
                        ></v-checkbox>
                        <v-checkbox
                          label="Swimming Pool"
                          v-model="accomodationFilters.features"
                          @change="filterResults"
                          value="Swimming Pool"
                        ></v-checkbox>
                        <v-checkbox
                          label="Penthouse"
                          v-model="accomodationFilters.features"
                          @change="filterResults"
                          value="Penthouse"
                        ></v-checkbox>
                        <v-checkbox
                          label="Golf Course"
                          v-model="accomodationFilters.features"
                          @change="filterResults"
                          value="Golf Course"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
                <v-flex class="my-3" xs12 sm6 md4 lg3 v-for="hotel in filteredAccomodations" :key="hotel.title">
                  <v-card>
                    <v-card-media
                      v-bind:src="hotel.image"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{hotel.title}}</div>
                        <span class="grey--text">{{hotel.city}}, {{hotel.country}}</span>
                        <br>
                        <span class="grey--text">{{hotel.type}}: ${{hotel.price}}</span>
                        <star-rating :star-size="20" :rating="hotel.rating" :read-only="true" :increment="0.01"></star-rating>
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
        </v-layout>
      </section>
      <section>
        <v-parallax :src="require('@/static/center.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Luxurious Living In Affordable Prices</div>
            <h2>Get Your Dream Shack Today</h2>
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
            accomodationPics: [
                {
                    src: require('@/static/accomodation/acomo1.jpg'),
                    title: "Wanna See Snow?",
                    text: "Stay In Cold Areas Of The World, But In Warm Places"
                },
                {
                    src: require('@/static/accomodation/acomo2.jpg'),
                    title: "Luxurious Living",
                    text: "We Make The Most Luxurious Hotels Affordable Just For You"
                },
                {
                    src: require('@/static/accomodation/acomo3.jpg'),
                    title: "Great Views",
                    text: "We Recommend The Hotels With The Most Amazing Views"
                },
                {
                    src: require('@/static/accomodation/acomo4.jpg'),
                    title: "Islands",
                    text: "Experience The Amazing Life On An Island"
                }
            ],
            accomodations: [
                {
                    title: 'Emirates Palace',
                    city: 'Abu Dhabi',
                    country: 'UAE',
                    features: ['Gym', 'Spa', 'Swimming Pool', 'Penthouse', 'Golf Course'],
                    price: 1500,
                    type: 'Hotel',
                    image: require('@/static/accomodation/ephotel.jpg'),
                    rating: 5
                },
                {
                    title: 'Burj Khalifa',
                    city: 'Dubai',
                    country: 'UAE',
                    features: ['Gym', 'Spa', 'Swimming Pool', 'Penthouse'],
                    price: 2000,
                    type: 'Hotel',
                    image: require('@/static/accomodation/bkhotel.jpg'),
                    rating: 4.5
                },
                {
                    title: 'The Plaza',
                    city: 'New York',
                    country: 'USA',
                    features: ['Gym', 'Swimming Pool', 'Penthouse'],
                    price: 1200,
                    type: 'Hotel',
                    image: require('@/static/accomodation/tphotel.jpg'),
                    rating: 4.2
                },
                {
                    title: 'The Westin Excelsior',
                    city: 'Rome',
                    country: 'Italy',
                    features: ['Spa', 'Swimming Pool', 'Golf Course'],
                    price: 950,
                    type: 'Hotel',
                    image: require('@/static/accomodation/twehotel.jpg'),
                    rating: 4.7
                },
                {
                    title: '25 Westwoord Drive',
                    city: 'Lahore',
                    country: 'Pakistan',
                    features: [],
                    price: 500,
                    type: 'RentalHome',
                    image: require('@/static/accomodation/wdroom.jpg'),
                    rating: 3.8
                },
                {
                    title: 'The Boulders',
                    city: 'Arizona',
                    country: 'USA',
                    features: ['Gym', 'Swimming Pool', 'Golf Course'],
                    price: 600,
                    type: 'Hotel',
                    image: require('@/static/accomodation/tbhotel.jpg'),
                    rating: 3.9
                }
            ],
            accomodationFilters: {
                price: 5000,
                types: [],
                features: []
            },
            accomodationTypes: ['Hotel', 'Rental House'],
            filteredAccomodations: [
                {
                    title: 'Emirates Palace',
                    city: 'Abu Dhabi',
                    country: 'UAE',
                    features: ['Gym', 'Spa', 'Swimming Pool', 'Penthouse', 'Golf Course'],
                    price: 1500,
                    type: 'Hotel',
                    image: require('@/static/accomodation/ephotel.jpg'),
                    rating: 5
                },
                {
                    title: 'Burj Khalifa',
                    city: 'Dubai',
                    country: 'UAE',
                    features: ['Gym', 'Spa', 'Swimming Pool', 'Penthouse'],
                    price: 2000,
                    type: 'Hotel',
                    image: require('@/static/accomodation/bkhotel.jpg'),
                    rating: 4.5
                },
                {
                    title: 'The Plaza',
                    city: 'New York',
                    country: 'USA',
                    features: ['Gym', 'Swimming Pool', 'Penthouse'],
                    price: 1200,
                    type: 'Hotel',
                    image: require('@/static/accomodation/tphotel.jpg'),
                    rating: 4.2
                },
                {
                    title: 'The Westin Excelsior',
                    city: 'Rome',
                    country: 'Italy',
                    features: ['Spa', 'Swimming Pool', 'Golf Course'],
                    price: 950,
                    type: 'Hotel',
                    image: require('@/static/accomodation/twehotel.jpg'),
                    rating: 4.7
                },
                {
                    title: '25 Westwoord Drive',
                    city: 'Lahore',
                    country: 'Pakistan',
                    features: [],
                    price: 500,
                    type: 'RentalHome',
                    image: require('@/static/accomodation/wdroom.jpg'),
                    rating: 3.8
                },
                {
                    title: 'The Boulders',
                    city: 'Arizona',
                    country: 'USA',
                    features: ['Gym', 'Swimming Pool', 'Golf Course'],
                    price: 600,
                    type: 'Hotel',
                    image: require('@/static/accomodation/tbhotel.jpg'),
                    rating: 3.9
                }
            ],
            search: ''
        };
    },
    methods: {
        filterResults: function () {
            this.filteredAccomodations = this.accomodations.filter(resultant => {
                if (this.accomodationFilters.price >= resultant.price) {
                    if (this.accomodationFilters.types.includes(resultant.type) || this.accomodationFilters.types.length === 0) {
                        if (this.accomodationFilters.features.some(resultArray => resultant.features.includes(resultArray)) || this.accomodationFilters.features.length === 0) {
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
                }
                return false;
            });
        }
    }
}
</script>
