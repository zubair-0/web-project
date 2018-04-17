<template>
  <v-content> <!-- Insert Main Content here -->
    <section>
      <v-parallax :src="require('@/static/swiss.jpg')" height="550">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <img :src="require('@/static/logo.png')" alt="CruiseAide">
          <h1 class="white--text mb-2 display-3 text-xs-center" style="font-size: 50px;">CruiseAide</h1>
          <div class="subheading mb-3 text-xs-center">We've Got You Covered</div>
          <v-btn
            class="blue lighten-2 mt-5"
            dark
            large
            href="#"
          >
            Get Started
          </v-btn>
        </v-layout>
      </v-parallax>
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
            <h2 class="headline">Best Platform For An Adventurer</h2>
            <span class="subheading">
              Check Out Our Services
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md3>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-btn fab dark color="indigo" href="/attractions">
                      <v-icon dark>place</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Famous Attractions</div>
                  </v-card-title>
                  <v-card-text>
                    We provide you the chance to see the famous places around the world.
                    We believe that every human should have the chance to travel the world.
                    That's why we provide the best services in the least possible rates so our every customer can enjoy and relax.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md3>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-btn fab dark color="indigo" href="/restaurants">
                      <v-icon dark>restaurant_menu</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Delicious Foods</div>
                  </v-card-title>
                  <v-card-text>
                    We believe in trying different foods of different cultures around the world. So, travel
                    with us to taste the most delicious foods among different restaurants around the world.
                    We will make the reservations, you sit back and relax.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md3>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-btn fab dark color="indigo" href="/accomodations">
                      <v-icon dark>hotel</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Affordable Reservations</div>
                  </v-card-title>
                  <v-card-text>
                    During travelling, one of the major hurdles is finding a suitable place in an affordable price.
                    Well, we are concerned about each and every one of our customers. So, we provide you with
                    affordable places where you can feel like home.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md3>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-btn fab dark color="indigo" href="/travels">
                      <v-icon dark>local_airport</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Luxurious Travel</div>
                  </v-card-title>
                  <v-card-text>
                    One must not be tired after travelling. That's why we provide you with only the best travelling services.
                    We provide all kinds of packages ranging from royal to affordable but smooth rides are
                    guaranteed. Travel with us and you shall see.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <section>
      <v-parallax :src="require('@/static/main.jpg')" height="550">
        <v-layout column align-center justify-center>
          <div class="white--text display-1 mb-3 text-xs-center">Going On A Tour Has Never Been Easier.</div>
          <h2>With CruiseAide, You Don't Need To Worry</h2>
          <v-btn
            class="blue lighten-2 mt-5"
            dark
            large
            href="#"
          >
            Get Started
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">About CruiseAide</div>
              </v-card-title>
              <v-card-text class="justify-space-between">
                CruiseAide, one of the smartest travel recommendation site, enables adventure seekers
                and tourists to enjoy each and every bit of all the journies. CruiseAide recommends the
                best attraction sites and also presents the travellers with the best deals of accomodation,
                restaurants and travel services, thus allowing them to decide by getting a clear idea
                and a better cost estimation. CruiseAide allows users to filter the results according
                to their needs so they can choose what's best for them. Our team is working hard each day
                to provide our customers with the best services possible. We aspire to become number one
                in the world with the help of our customers who review the services provided on our site.
              </v-card-text>
              <v-card-text class="layout justify-center">
                CruiseAide: Know, Pre-Book, Relax.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Contact Us</div>
              </v-card-title>
              <v-card-text>
                Feel free to get in touch in case of any queries.<br/>We are always happy to help.
              </v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  name="query"
                  label="Your Query"
                  multi-line
                ></v-text-field>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                >
                  CONTACT
                </v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>
