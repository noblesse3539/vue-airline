<template>
  <v-layout py-4 h-100>
    <v-flex row xs12>
      <div class="caption">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light truncate-title">{{title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading truncate-body">{{body}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
	name: 'Post',
	props: {
		date: {type: Date},
		title: {type: String},
		body: {type: String}
	},
  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
    }
  }
}
</script>
<style>
  .truncate-title {
		display: block;
		position: relative;
		text-overflow: ellipsis !important;
		-webkit-line-clamp: 3;

		 /* hide text if it more than N lines  */
		overflow: hidden;
		/* for set '...' in absolute position */
		position: relative; 
		/* use this value to count block height */
		line-height: 1.2em;
		/* max-height = line-height (1.2) * lines max number (3) */
		max-height: 3.6em; 
		/* fix problem when last visible word doesn't adjoin right side  */
		text-align: justify;  
		/* place for '...' */
		margin-right: -1em;
		padding-right: 1em;

	}
	.truncate-body {
		display: block;
		position: relative;
		text-overflow: ellipsis !important;
		-webkit-line-clamp: 3;
	}
  .color-666 {
    color: #666;
  }
  .color-333 {
    color: #333;
  }
  .h-100 {
    height: 100%;
  }
</style>

