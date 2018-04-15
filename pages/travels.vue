<template>
  <v-content> <!-- Content Of Travel Page Start From Here -->
      <section>
        <v-carousel hide-controls>
          <v-carousel-item v-for="(pic,i) in travelPics" :src="pic.src" :key="i">
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
              <h2 class="headline">Airliners Available Around The World</h2>
              <span class="subheading">
                Look Above, Fly High
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
                  <h1 class="subheading left">Price Range</h1>
                </v-flex>
                <v-flex xs4 offset-xs2 v-model="showFilters">
                  <v-card>
                    <v-card-actions>
                      <v-slider @mouseup="filterResults" :max="5000" v-model="travelFilters.price" thumb-label step="500" ticks></v-slider>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs4 v-model="showFilters">
                  <v-text-field
                    name="input-1-3"
                    label="Hint Text"
                    single-line
                    prepend-icon="monetization_on"
                    v-model="travelFilters.price"
                    @keyup="filterResults"
                    disabled="true"
                  ></v-text-field>
                </v-flex>
                <v-flex class="mt-4" xs8 offset-xs2 v-model="showFilters">
                  <v-expansion-panel expand>
                    <v-expansion-panel-content>
                      <div slot="header" >Flight Class</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="First"
                          v-model="travelFilters.classes"
                          @change="filterResults"
                          value="First"
                        ></v-checkbox>
                        <v-checkbox
                          label="Business"
                          v-model="travelFilters.classes"
                          @change="filterResults"
                          value="Business"
                        ></v-checkbox>
                        <v-checkbox
                          label="Economy"
                          v-model="travelFilters.classes"
                          @change="filterResults"
                          value="Economy"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div slot="header" >Select Airlines</div>
                      <v-container fluid px-0>
                        <v-checkbox
                          label="Emirates"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Emirates"
                        ></v-checkbox>
                        <v-checkbox
                          label="Qatar Airways"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Qatar Airways"
                        ></v-checkbox>
                        <v-checkbox
                          label="Air France"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Air France"
                        ></v-checkbox>
                        <v-checkbox
                          label="Air Canada"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Air Canada"
                        ></v-checkbox>
                        <v-checkbox
                          label="Japan Airlines"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Japan Airlines"
                        ></v-checkbox>
                        <v-checkbox
                          label="Turkish Airlines"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Turkish Airlines"
                        ></v-checkbox>
                        <v-checkbox
                          label="Air Blue"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Air Blue"
                        ></v-checkbox>
                        <v-checkbox
                          label="Shaheen Airlines"
                          v-model="travelFilters.airlines"
                          @change="filterResults"
                          value="Shaheen Airlines"
                        ></v-checkbox>
                      </v-container>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>

                <v-flex class="my-3" xs12 sm6 md4 lg3 v-for="flight in filteredTravels" :key="flight.title">
                  <v-card>
                    <v-card-media
                      v-bind:src="flight.image"
                      height="200px"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div class="text-xs-left">
                        <div class="headline">{{flight.title}}</div>
                        <span class="grey--text">{{flight.srcCity}}, {{flight.srcCountry}} - {{flight.destCity}}, {{flight.destCountry}}</span>
                        <br>
                        <span class="grey--text">{{flight.class}} Class, Price: ${{flight.price}}</span>
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
        <v-parallax :src="require('@/static/china.jpg')" height="550">
          <v-layout column align-center justify-center>
            <div class="headline white--text display-1 mb-3 text-xs-center">Best Travelling Services</div>
            <h2>Get The Smooth Rides In Affordable Prices</h2>
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
            travelPics: [
                {
                    src: require('@/static/airlines/travel4.jpg'),
                    title: "Travel By Cruise",
                    text: "What Else Is CruiseAide For?"
                },
                {
                    src: require('@/static/airlines/travel2.jpg'),
                    title: "Travel By Air",
                    text: "We Got The Best Airline Ticket Prices"
                },
                {
                    src: require('@/static/airlines/travel3.jpg'),
                    title: "Travel By Vehicle",
                    text: "Want To Travel By Road? We Got Rentals For You"
                },
                {
                    src: require('@/static/airlines/travel1.jpg'),
                    title: "Travel By Train",
                    text: "PreBook And Get The Best Deals on Train Tickets"
                }
            ],
            travels: [
                {
                    title: 'Emirates',
                    srcCity: 'Dubai',
                    srcCountry: 'UAE',
                    destCity: 'Lahore',
                    destCountry: 'Pakistan',
                    class: 'Business',
                    price: 700,
                    image: require('@/static/airlines/emirates.png')
                },
                {
                    title: 'Air France',
                    srcCity: 'London',
                    srcCountry: 'UK',
                    destCity: 'Paris',
                    destCountry: 'France',
                    class: 'Business',
                    price: 200,
                    image: require('@/static/airlines/airfrance.png')
                },
                {
                    title: 'Turkish Airlines',
                    srcCity: 'Lahore',
                    srcCountry: 'Pakistan',
                    destCity: 'Istanbul',
                    destCountry: 'Turkey',
                    class: 'First',
                    price: 1000,
                    image: require('@/static/airlines/turkish.jpg')
                },
                {
                    title: 'Japan Airlines',
                    srcCity: 'Tokyo',
                    srcCountry: 'Japan',
                    destCity: 'Dubai',
                    destCountry: 'UAE',
                    class: 'Business',
                    price: 2800,
                    image: require('@/static/airlines/jal.png')
                },
                {
                    title: 'Qatar Airways',
                    srcCity: 'Abu Dhabi',
                    srcCountry: 'UAE',
                    destCity: 'Islamabad',
                    destCountry: 'Pakistan',
                    class: 'Economy',
                    price: 200,
                    image: require('@/static/airlines/qatar.png')
                },
                {
                    title: 'Air Blue',
                    srcCity: 'Dubai',
                    srcCountry: 'UAE',
                    destCity: 'Lahore',
                    destCountry: 'Pakistan',
                    class: 'Economy',
                    price: 150,
                    image: require('@/static/airlines/airblue.jpg')
                },
                {
                    title: 'Shaheen Airlines',
                    srcCity: 'Lahore',
                    srcCountry: 'Pakistan',
                    destCity: 'Karachi',
                    destCountry: 'Pakistan',
                    class: 'Business',
                    price: 180,
                    image: require('@/static/airlines/shaheen.jpg')
                },
                {
                    title: 'Air Canada',
                    srcCity: 'New York',
                    srcCountry: 'USA',
                    destCity: 'Toronto',
                    destCountry: 'Canada',
                    class: 'Business',
                    price: 300,
                    image: require('@/static/airlines/aircanada.jpg')
                }
            ],
            airlines: [
                'Emirates', 'Air France', 'Turkish Airlines', 'Japan Airlines', 'Air Blue', 'Shaheen Airlines', 'PIA', 'Air Canada'
            ],
            travelFilters: {
                price: 5000,
                classes: [],
                airlines: []
            },
            flightClasses: ['First', 'Business', 'Economy'],
            filteredTravels: [
                {
                    title: 'Emirates',
                    srcCity: 'Dubai',
                    srcCountry: 'UAE',
                    destCity: 'Lahore',
                    destCountry: 'Pakistan',
                    class: 'Business',
                    price: 700,
                    image: require('@/static/airlines/emirates.png')
                },
                {
                    title: 'Air France',
                    srcCity: 'London',
                    srcCountry: 'UK',
                    destCity: 'Paris',
                    destCountry: 'France',
                    class: 'Business',
                    price: 200,
                    image: require('@/static/airlines/airfrance.png')
                },
                {
                    title: 'Turkish Airlines',
                    srcCity: 'Lahore',
                    srcCountry: 'Pakistan',
                    destCity: 'Istanbul',
                    destCountry: 'Turkey',
                    class: 'First',
                    price: 1000,
                    image: require('@/static/airlines/turkish.jpg')
                },
                {
                    title: 'Japan Airlines',
                    srcCity: 'Tokyo',
                    srcCountry: 'Japan',
                    destCity: 'Dubai',
                    destCountry: 'UAE',
                    class: 'Business',
                    price: 2800,
                    image: require('@/static/airlines/jal.png')
                },
                {
                    title: 'Qatar Airways',
                    srcCity: 'Abu Dhabi',
                    srcCountry: 'UAE',
                    destCity: 'Islamabad',
                    destCountry: 'Pakistan',
                    class: 'Economy',
                    price: 200,
                    image: require('@/static/airlines/qatar.png')
                },
                {
                    title: 'Air Blue',
                    srcCity: 'Dubai',
                    srcCountry: 'UAE',
                    destCity: 'Lahore',
                    destCountry: 'Pakistan',
                    class: 'Economy',
                    price: 150,
                    image: require('@/static/airlines/airblue.jpg')
                },
                {
                    title: 'Shaheen Airlines',
                    srcCity: 'Lahore',
                    srcCountry: 'Pakistan',
                    destCity: 'Karachi',
                    destCountry: 'Pakistan',
                    class: 'Business',
                    price: 180,
                    image: require('@/static/airlines/shaheen.jpg')
                },
                {
                    title: 'Air Canada',
                    srcCity: 'New York',
                    srcCountry: 'USA',
                    destCity: 'Toronto',
                    destCountry: 'Canada',
                    class: 'Business',
                    price: 300,
                    image: require('@/static/airlines/aircanada.jpg')
                }
            ],
            search: ''
        };
    },
    methods: {
        filterResults: function () {
            this.filteredTravels = this.travels.filter(resultant => {
                if (this.travelFilters.price >= resultant.price) {
                    if (this.travelFilters.classes.includes(resultant.class) || this.travelFilters.classes.length === 0) {
                        if (this.travelFilters.airlines.includes(resultant.title) || this.travelFilters.airlines.length === 0) {
                            if (resultant.srcCity.toLowerCase().includes(this.search.toLowerCase())) {
                                return true;
                            }

                            if (resultant.srcCountry.toLowerCase().includes(this.search.toLowerCase())) {
                                return true;
                            }

                            if (resultant.destCity.toLowerCase().includes(this.search.toLowerCase())) {
                                return true;
                            }

                            if (resultant.destCountry.toLowerCase().includes(this.search.toLowerCase())) {
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
