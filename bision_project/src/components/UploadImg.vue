<template>
<div>
  <v-hover>
    <v-img v-if="imgUrl" slot-scope="{hover}" v-on="on" class="addImg" v-bind:class="{ main: isMain }" :src="imgUrl"  @click='pickFile'>
      <v-fade-transition>
        <div v-if="hover" class="d-flex transition-fast-in-fast-out white v-card--reveal black--text" style="height: 100%;">
            이미지 변경
        </div>
      </v-fade-transition>
    </v-img>
  </v-hover>

  <v-text-field v-if="!imgUrl" label="Select Main Image" @click='pickFile' prepend-icon='attach_file'></v-text-field>

  <input type="file" ref="image" style="display: none" @change="processImg" accept="image/*" >

</div>
</template>

<script>
import './UploadImg.css'

export default {
  name: 'UploadImg',
  props : {
    imgUrl: String,
    isMain: Boolean,
  },
  data (){
    return{
    }
  },
  methods: {
    processImg(event) {
       var input = event.target;
       if (input.files && input.files[0]) {
           var file = input.files[0]
           var reader = new FileReader();
           reader.onload = (e) => {
             var formData = new FormData()
             formData.append("image", file)
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
               "data": formData
             };
             this.$http(settings).then(res=>{
               this.imgUrl = res.data.data.link
               this.$emit('getMain',this.imgUrl)
              // this.imgUrl = res.data.data.link
           }).catch(err=>{
             this.$emit('getMain',false)
           })
         }
         reader.readAsDataURL(file);
       }
    },
    pickFile () {
           this.$refs.image.click ()
     },
  }

}
</script>
