<template>
  <!-- <v-layout row justify-center> -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-alert transition dismissible v-if="imgurErr" :value="true" type="warning">
      잠시 후 다시 시도해주세요.
    </v-alert>
      <v-card-title>
        <span class="headline">Upload Image</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <img :src="imageUrl" height="150" v-if="imageUrl && !random"/>
          <v-text-field :disabled="random" label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
          <input type="file" ref="image" style="display: none" @change="processImg" accept="image/*" >
          <img :src="random" height="150" v-if="random"/>
          <v-switch v-model="random" value = "https://source.unsplash.com/random/200x200" label="랜덤 이미지 사용"></v-switch>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="uploadImg">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!-- </v-layout> -->


</template>

<script>

export default {
  name: 'UploadImgModal',
  data: function(){
    return {
      dialog: true,
      random: false,
      imageName: '',
      imageFile: '',
      imageUrl: '',
      imgurErr: false

    }
  },
  methods: {
    pickFile () {
           this.$refs.image.click ()
     },
    processImg(e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    uploadImg: function(){
      if(this.random){
        this.$emit('close',  this.random)
      }
      else{
        delete this.$http.defaults.headers["x-access-token"]
        let form = new FormData();
        form.append('image', this.imageFile);

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
          this.$emit('close',  res.data.data.link)

        }).then(()=> {
          this.$http
        .get("/api/auth/check", config)
        .then(res => {
          console.log(res.data)
          if (res.status == 200) {
            this.$store.commit("setIsLoggedIn");
            this.$store.commit("setUserInfo", {
              userId: res.data.info._id,
              userName: res.data.info.username,
              isGuideNow: res.data.info.isGuide
            });
            this.$http.defaults.headers.common["x-access-token"] = token
          }
        })
        }).catch(err=>{
          alert('잠시 후 다시 시도해주세요')
          console.log(err)
        })
      }
    },
    close(){
      this.$emit('close', false);
    }
  }
}
</script>
