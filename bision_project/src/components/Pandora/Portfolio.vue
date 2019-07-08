<template>
  <v-card>
    <v-img :src="imgSrc" height="200px">
    </v-img>
    <v-card-title primary-title>
      <div >
        <div class="headline truncate-title">{{title}}</div>
        <span class="grey--text truncate-body">{{body}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
	name: 'Portfolio',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
	},
	data() {
		return {
			//
		}
	}
}
</script>
<style>
	.truncate-title {
		display: block;
		position: relative;
		height: 1.5em;
		line-height: 1.5em;
		overflow: hidden;
	}
	.truncate-body {;

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
	.truncate-body:before {
		/* points in the end */
		content: '...';
		/* absolute position */
		position: absolute;
		/* set position to right bottom corner of block */
		right: 0;
		bottom: 0;
	}
	.truncate-body:after {
		/* points in the end */
		content: '';
		/* absolute position */
		position: absolute;
		/* set position to right bottom corner of text */
		right: 0;
		/* set width and height */
		width: 1em;
		height: 1em;
		margin-top: 0.2em;
		/* bg color = bg color under block */
		background: white;
	}
</style>