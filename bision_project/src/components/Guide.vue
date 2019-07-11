<template>
  <v-card>
    <v-layout>
      <v-flex xs12>
        <v-img :src="imgSrc" width="100%" height="250px" contain></v-img>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <div class="container">
      <div v-if="translateflag">
        <div class="headline mb-2">{{name}}</div>
        <div class="mb-2"><b>{{title}}</b></div>
        <div class="mb-2"><b>{{region}}</b></div>
        <div class="mb-2 cutfourline">{{content}}</div>
      </div>
      <div v-else>
        <div class="headline mb-2">{{translatedText.name}}</div>
        <div class="mb-2"><b>{{translatedText.title}}</b></div>
        <div class="mb-2"><b>{{translatedText.region}}</b></div>
        <div class="mb-2 cutfourline">{{translatedText.content}}</div>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <v-btn flat icon color="blue lighten-2" small to="/guidemypage">
          <v-img :src="require('../assets/movePage.png')" ></v-img>
        </v-btn>
        <v-btn flat icon color="blue lighten-2" small v-on:click="translateflag=!translateflag">
          <v-img :src="require('../assets/translate.png')" ></v-img>
        </v-btn>
      </div>
    </div>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      만족도
      <v-spacer></v-spacer>
      <div>
        <v-rating
          v-model="rating"
          color="yellow accent-4"
          dense
          half-increments
          hover
          size="18"
        ></v-rating>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Guide',
	props: {
    title: {type: String},
    name: {type: String},
    region: {type: String},
    content: {type: String},
    imgSrc: {type: String}
	},
	data() {
		return {
      translateflag: true,
      translatedText: {
        title: '',
        name: '',
        region: '',
        content: '',
      },
      rating: '',
		}
	},
  mounted() {
    try {
      this.translate();
    } catch (err) {
      console.log('translate error')
    }
  },
  methods: {
    async translate() {
      console.log(this._props)

      try {
        for (var gkey in this._props) {
          console.log(gkey)
          console.log(this._props[gkey])
          const taxios = await axios.create({
            baseURL: "https://translation.googleapis.com"
          });
          const getTranslate = await taxios.post("/language/translate/v2", null, {
            params: {
              source: "ko",
              target: "en",
              q: this._props[gkey],
              key: "AIzaSyD9-6TuS5C7IJVWPFv5i10l_Z2JjXyb9zw"
            }
          })
          ;
          this.translatedText[gkey] = getTranslate.data.data.translations[0].translatedText
          console.log(getTranslate)
        }
      } catch (err) {
      }
    }
  }
}
</script>

<style>
  .cutfourline {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
</style>
