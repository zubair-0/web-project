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
                        <span class="grey--text">{{hotel.location}}</span>
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
var axios = require('axios');

export default {
    data() {
        return {
            accomodationPics: [
                {
                    src: 'https://imgur.com/DZslkfj',
                    title: "Wanna See Snow?",
                    text: "Stay In Cold Areas Of The World, But In Warm Places"
                },
                {
                    src: 'https://imgur.com/VxPVziG',
                    title: "Luxurious Living",
                    text: "We Make The Most Luxurious Hotels Affordable Just For You"
                },
                {
                    src: 'https://imgur.com/FTZ1kPp',
                    title: "Great Views",
                    text: "We Recommend The Hotels With The Most Amazing Views"
                },
                {
                    src: 'https://imgur.com/iv8o4Ep',
                    title: "Islands",
                    text: "Experience The Amazing Life On An Island"
                }
            ],
            accomodations: [],
            accomodationFilters: {
                price: 5000,
                types: [],
                features: []
            },
            accomodationTypes: ['Hotel', 'Rental House'],
            filteredAccomodations: [],
            search: ''
        };
    },
    asyncData () {
        return new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:3000/accomodations').then(res => {
                resolve({
                    filteredAccomodations: res.data,
                    accomodations: res.data
                })
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
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

                            if (resultant.location.toLowerCase().includes(this.search.toLowerCase())) {
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
