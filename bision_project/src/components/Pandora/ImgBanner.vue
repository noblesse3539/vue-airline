<template>
  <div>
    <div style="line-height:1.2em; font-family: roboto; color: black; font-weight: bold; font-size: 4vw;" 
        slot="text">
          <span class="slogan">You are only given a little spark of madness.</span>
          <br> <span class="slogan">You mustn't lose it.</span>
    </div>
    <v-img :src="imgSrc"
           aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text"/>
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>



<script>

export default {
	name: 'ImgBanner',
	props: {
		imgSrc: {type: String},
		text: {type: String}
	},
	methods: {
	},
}
</script>
<style>
  .text-shadow {
    text-shadow: 0 0 15px rgb(255,255,255);
  }
</style>
