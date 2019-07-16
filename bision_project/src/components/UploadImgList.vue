<template>
  <v-card flat>
   <v-container grid-list-sm fluid>
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

     <v-layout row wrap>
       <v-flex v-for="img in imgList" xs4 sm 3 md2 d-flex>
         <v-card flat tile class="d-flex">
           <v-img :src="img" :lazy-src="img" aspect-ratio="1" class="grey lighten-2">

             <template v-slot:placeholder>
               <v-layout fill-height align-center justify-center ma-0>
                 <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
               </v-layout>
            </template>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
   </v-container>
  </v-card>
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
      imgList:[]
    }
  },
  methods: {
    processImg(event) {
       var input = event.target;
       if (input.files && input.files[0]) {
           var reader = new FileReader();
           reader.onload = (e) => {
               this.imgList.push(e.target.result);
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
