<template>
  <v-content> <!-- Content Of Attractions Page Start From Here -->
      <section>
        <v-carousel hide-controls style="height:535px;">
          <v-carousel-item v-for="item in attractionPics" :src="item.src" :key="item.title">
            <v-layout
              column
              align-center
              justify-center
              class="white--text"
              style="margin-top: 80px;"
            >
              <h1 class="white--text mb-2 display-3 text-xs-center" style="font-size: 50px;">{{item.title}}</h1>
              <h2 class="white--text my-3 text-xs-center">{{item.text}}</h2>
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
                      v-bind:src="place.imgUrl"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{place.title}}</div>
                        <span class="grey--text">{{place.location}}</span>
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
        <v-parallax :src="require('@/static/flamingo.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Sightseeing Has Never Been More Fun</div>
            <h2>Don't Miss Out And Start Exploring Today</h2>
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

export default {
    data () {
        return {
            attractionPics: [
                {
                    src: "https://imgur.com/3bQfmnB.jpg",
                    title: "Dubai",
                    text: "Visit The Tallest Building In The World"
                },
                {
                    src: 'https://imgur.com/SsWYf8G.jpg',
                    title: "Turkey",
                    text: "Check Out The Heritage Of The Ottoman Empire"
                },
                {
                    src: 'https://imgur.com/Ehp91pZ.jpg',
                    title: "Italy",
                    text: "See The Architectural Beauty Of The Romans"
                },
                {
                    src: 'https://imgur.com/679Btyc.jpg',
                    title: "Greece",
                    text: "We Provide You With The Great Views"
                }
            ],
            attractions: [],
            filteredAttractions: [],
            search: ''
        };
    },
    asyncData () {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/fetchAttractions').then(res => {
                console.log(res.data);
                resolve({
                    filteredAttractions: res.data,
                    attractions: res.data
                })
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
    },
    methods: {
        filterResults: function () {
            this.filteredAttractions = this.attractions.filter(resultant => {
                if (resultant.title.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                }
                if (resultant.location.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                }
                return false;
            });
        }
    }
}
</script>
