<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        <v-btn color="black" flat icon @click="close">
          <v-icon>close</v-icon></v-btn>
        <span class="headline">New Portfolio</span>
        <v-spacer></v-spacer>
        <v-btn flat icon color="blue" @click="save">
        <v-icon large >check</v-icon></v-btn>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>

        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data (){
    return{
      dialog: true
    }
  },
  methods : {
    save(){
      this.$emit('close')
    },
    close(){
      this.$emit('close', false);
    }
  }
}
</script>

<style>
</style>
