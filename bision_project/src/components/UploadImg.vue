<template>
  <v-layout row justify-center>
  <v-dialog v-model="modal" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Upload Image</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
            <input type="file" @change="processImg" accept="image/*" >
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="uploadImg">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>

</template>

<script>

export default {
  name: 'UploadImg',
  data: function(){
    return {
      imgurl: '',
      modal: true
    }
  },
  methods: {
    processImg: function(event) {
      this.Imgfile = event.target.files[0]
    },
    uploadImg: function(){
      let form = new FormData();
      form.append('image', this.Imgfile);

      var settings = {
        "url": "https://api.imgur.com/3/image",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "Client-ID 6def70bd30a2e6a"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };
      this.$http(settings).then(res=>{
        // console.log(res.data.data.link)
        this.imgurl=res.data.data.link
        this.$emit('close',  this.imgurl)
      })
    },
    close(){
      this.$emit('close', false);
    }
  }
}
</script>
<style>
</style>
