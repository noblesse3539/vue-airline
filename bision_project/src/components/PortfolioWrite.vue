<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
    <v-card tile>
      <v-toolbar card dark color="blue">
         <v-btn icon dark @click="closePW">
           <v-icon>close</v-icon>
         </v-btn>
         <v-toolbar-title>{{this.title}}</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-toolbar-items>
           <v-btn dark flat @click="savePW">Save</v-btn>
         </v-toolbar-items>
       </v-toolbar>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex mt-3 xs12>
                <v-text-field height="80px" style="font-weight:bold; font-size: 2rem;"
                v-model="tourProgram.planTitle" label="제목을 입력해주세요." solo></v-text-field>
                <!-- <ckeditor :editor="titleEditor" v-model="titleData" :config="titleConfig"></ckeditor> -->
              </v-flex>

              <h2>메인 이미지 선택</h2>
              <v-flex xs12 d-flex>
                <UploadImg :imgUrl="tempMain" :isMain="true" @getMain="getMain"></UploadImg>
              </v-flex>

              <v-flex xs12 d-flex>
                <h2>기본 정보 입력</h2>
              </v-flex>

              <!-- 나라, 도시 선택 -->
              <v-flex xs12 sm4 d-flex>
                <v-select prepend-icon="fa-globe-asia" label="나라 선택*" v-model="tourProgram.Pnation" :items="nation"></v-select>
              </v-flex>
              <v-flex xs12 sm8 d-flex>
                <v-select prepend-icon="map" label="도시 선택(다수 가능)*" v-model="tourProgram.PCity" :items="city" attach small-chips multiple></v-select>
              </v-flex>

              <!-- 시작날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="fromMenu" v-model="fromMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="tourProgram.fromDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="tourProgram.fromDate" label="시작 날짜*" :value="tourProgram.fromDate" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :max="tourProgram.toDate" v-model="tourProgram.fromDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="fromMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.fromMenu.save(tourProgram.fromDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <!-- 종료날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="toMenu" v-model="toMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="tourProgram.toDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="tourProgram.toDate" :value="tourProgram.toDate" label="종료 날짜*" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :min="tourProgram.fromDate" v-model="tourProgram.toDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="toMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.toMenu.save(tourProgram.toDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <!-- 소요시간 -->
              <v-flex xs6>
                <v-text-field prepend-icon="schedule" v-model="tourProgram.duration" label="소요시간*" clearable
                              clear-icon="clear" hint="ex) 10시간, 1박2일" persistent-hint color="blue"></v-text-field>
              </v-flex>

              <!-- 통화 변환 구현필요 -->
              <v-flex xs6>
                <v-text-field prepend-icon="fa-wallet" label="가격*" prefix="₩" v-model.number="tourProgram.cost"  clearable
                              clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>

              <!-- 인원 -->
              <v-flex xs6>
                <v-text-field prepend-icon="far fa-user" suffix="명" v-model.number="tourProgram.minTrav" label="최소 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="fa-users" suffix="명" v-model.number="tourProgram.maxTrav" label="최대 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>

              <!-- description 글자수 제약?-->
              <v-flex xs12>
                <v-textarea label="상품 요약*" auto-grow solo v-model="tourProgram.desc" color="blue"></v-textarea>
              </v-flex>

              <!-- 상세 정보 Editor -->
              <v-flex xs12>
                <h2>상세 정보 입력</h2>
              </v-flex>
              <v-flex>
                <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import UploadImg from '@/components/UploadImg'
import UploadImgList from '@/components/UploadImgList'
import { VueEditor } from "vue2-editor"
// import Vue from 'vue'
// import vuenationRegionSelect from 'vue-nation-region-select'
// Vue.use(vuenationRegionSelect)

export default {
  name: 'tourProgramWrite',
  props : {
    // 무슨 form? Edit/Create/New/Past
    VueEditor,
    title: String,
  },
  components:{
    UploadImg,
    UploadImgList,
  },
  data (){
    return{
      complete: true,
      tempMain:'https:\/\/i.imgur.com\/9ge6Osc.jpg',
      htmlForEditor: "",
      nation: ['대한민국'],
      city: ['서울', '부산', '대전'],
      dialog: true,
      fromMenu: false,
      toMenu: false,
      complete: false,
      tourProgram:{
        planTitle:'',
        mainImg:'',
        Pnation:'',
        PCity:[],
        fromDate:'',
        toDate:'',
        duration: '',
        cost:'',
        refund:'',
        minTrav:'',
        maxTrav: '',
        desc:'',
        tags:[],
        detail:''
      }
    }
  },
  methods : {
    getMain(value) {
      if(value){
        this.tourProgram.mainImg = value
      } else{
        alert('잠시 후 다시 실행해주세요.')
      }
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
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
         let url = res.data.data.link
         Editor.insertEmbed(cursorLocation, "image", url);
         resetUploader();
         console.log("res.data.data.link")

       }).catch(err=>{
         console.log(err)
       })
    },
    savePW(){
      for(var item in this.tourProgram){
        if(!item.value) {
          return alert('빈 칸을 모두 작성해주세요.')
        }
      }
      // 보내는 함수 추가.
      alert('작성이 완료되었습니다.')
      console.log(this.tourProgram)
      this.$emit('close')
    },
    closePW(){
      for(var item in this.tourProgram){
        if(item.value) {
          alert('빈 칸을 모두 작성해주세요.')
        }
      }
      const navBarZIndex = document.querySelector('#navbox')
      const footerZIndex = document.querySelector('#footer')
      navBarZIndex.style.zIndex = 1000;
      footerZIndex.style.zIndex = 1000;
      this.$emit('close', false);
    }
  }
}
</script>

<style>
.imgUpdate:hover {
  cursor:pointer;
}
.ql-container {
    min-height: 700px;
}

</style>
