<template>
<v-content id="details" v-bind:style="{ backgroundImage: 'url(' + imgUrl + ')' }">
  <section>
    <v-container>
      <v-card flat>
        <v-card-text>
          <h1 class="text-xs-center" style="font-size: 3em"> {{ title }} </h1>
          <br/>
          <h1 class="text-xs-center" style="font-size: 1.5em"> {{ 'Location: ' + location }} </h1>
          <h1 class="text-xs-center" style="font-size: 1.5em"> {{ 'Cuisine: ' + cuisine }} </h1>
          <h1 class="text-xs-center" style="font-size: 1.5em"> {{ 'Rating: ' + rating }} </h1>
          <br/>
          <h1 class="text-xs-center" style="font-size: 1.5em">Details</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
            augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. </p>
          <p>Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. </p>
          <p>Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien.
            Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. </p>
          <p>Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit
            dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices
            enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. </p>
          <p>Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis
            ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam
            mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. </p>
        </v-card-text>
      </v-card>
      <br/>
      <v-card flat v-for="item in reviews" :key="item.user">
        <v-card-text>
          <p>{{item.user}}</p>
          <v-spacer></v-spacer>
          <p v-if="$store.state.userid != item.userid && $store.state.friends.includes(item.userid) && typeof(item.userid) !== 'undefined'">"Facebook Friend"</p>
          <v-icon v-for="i in item.rating" :key="i">star</v-icon>
          <br/>
          <br/>
          <p>{{item.review}}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</v-content>
</template>

<script>
var axios = require("axios");

export default {
  asyncData(context) {
    return new Promise((resolve, reject) => {
      var url = "http://localhost:3000/fetchRestaurants/" + context.params.id;
      axios
        .get(url)
        .then(res => {
          var fd = {
            title: res.data.title
          }

          axios.post('http://localhost:3000/getRestaurantRating', fd).then((resx) => {
            res.data.reviews = resx.data.obj;

            if(resx.data.obj.length > 0)
            {
              res.data.rating = 0;

              resx.data.obj.forEach(element => {
                res.data.rating += element.rating;
              })

              res.data.rating = res.data.rating / resx.data.obj.length;
            }

            resolve(res.data);
          }).catch(errx => {
            reject(errx)
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
</script>

<style>
#details {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

#details .card {
  background-color: #333333EE !important;
}
</style>