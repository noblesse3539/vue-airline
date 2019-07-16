<template>
<div>
  <v-hover>
    <!-- 크기 조정하기 -->
    <v-img v-if="imgUrl" slot-scope="{hover}" v-on="on" class="addImg" :src="imgUrl" max-width=100px height=auto @click='pickFile'>
      <v-fade-transition>
        <div v-if="hover" class="d-flex transition-fast-in-fast-out white v-card--reveal black--text" style="height: 100%;">
            이미지 추가
        </div>
      </v-fade-transition>
    </v-img>
  </v-hover>

  <v-text-field v-if="!imgUrl" label="Select Main Image" @click='pickFile' prepend-icon='attach_file'></v-text-field>

  <input type="file" ref="image" style="display: none" @change="processImg" accept="image/*" >

</div>
</template>

<script>
export default {
  name: 'UploadImg',
  props : {
    // true면 이미지, false면 텍스트필드
    imgUrl: String
  },
  data (){
    return{
    }
  },
  methods: {
    processImg(event) {
       var input = event.target;
       if (input.files && input.files[0]) {
           var reader = new FileReader();
           reader.onload = (e) => {
               this.imgUrl= e.target.result;
           }
           reader.readAsDataURL(input.files[0]);
           console.log(this.imgUrl);
       }
    },
    pickFile () {
           this.$refs.image.click ()
     },
  }

}
</script>

<style>
.addImg:hover{
  cursor: pointer;

}
</style>
