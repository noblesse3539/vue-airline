<template>
  <div>
    <input type="file" @change="processImg" accept="image/*" >
    <button @click="uploadImg">업로드</button>
  </div>
</template>

<script>

export default {
  name: 'UploadImg',
  methods: {
    processImg: function(event) {
      this.Imgfile = event.target.files[0]
    },
    uploadImg: function(){
      let formData = new FormData();
      formData.append('image', this.Imgfile);

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
      this.$http.get()
  }
}
</script>

<style>
</style>
