<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
    <v-card tile>
      <v-toolbar card dark color="blue">
         <v-btn icon dark @click="checkClose">
           <v-icon>close</v-icon>
         </v-btn>
         <v-toolbar-title>{{this.title}}</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-toolbar-items>
           <v-btn dark flat @click="checkSave">Save</v-btn>
         </v-toolbar-items>
       </v-toolbar>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex mt-3 xs12>
                <v-text-field height="80px" style="font-weight:bold; font-size: 2rem;"
                v-model="tourProgram.title" label="제목을 입력해주세요." solo></v-text-field>
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
                <v-select prepend-icon="fa-globe-asia" label="나라 선택*" v-model="tourProgram.nation_kor" :items="nation"></v-select>
              </v-flex>
              <v-flex xs12 sm8 d-flex>
                <v-select prepend-icon="map" label="도시 선택(다수 가능)*" v-model="tourProgram.city_kor" :items="city" attach small-chips multiple></v-select>
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

              <!-- 환불 정책 -->
              <v-flex xs12>
                <h2>환불 가능 기간 설정</h2>
              </v-flex>
              <v-flex xs12 md3 align-self-center>
                <v-switch color="success" v-model="tourProgram.refund.refund100" :label="`환불 ${tourProgram.refund.refund100? '가능':'불가'}`"></v-switch>
              </v-flex>
              <v-flex xs12 md9>
                  <v-container>
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >100% 환불 : {{tourProgram.cost}}원</v-chip>
                    <v-text-field class="refund-text" :min="tourProgram.refund.refund50" max="365" suffix="일 까지 가능" v-model="tourProgram.refund.refund100" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                    <v-slider :disabled="!tourProgram.refund.refund100" min="0" max="365" v-model="tourProgram.refund.refund100"
                    always-dirty color="red" track-color="grey"></v-slider>
                  </v-container>
                  <v-container>
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >50% 환불 : {{tourProgram.cost*0.5}}원</v-chip>
                    <v-text-field class="refund-text" :min="tourProgram.refund.refund30" :max="tourProgram.refund.refund100" suffix="일 까지 가능" v-model="tourProgram.refund.refund50" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                     <v-slider :disabled="!tourProgram.refund.refund100" min="0" :max="tourProgram.refund.refund100" v-model="tourProgram.refund.refund50"
                      always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund100/365) *100}%`"></v-slider>
                  </v-container>
                  <v-container>
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >30% 환불 : {{tourProgram.cost*0.3}}원</v-chip>
                    <v-text-field class="refund-text" suffix="일 까지 가능" v-model="tourProgram.refund.refund30" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                      <v-slider :disabled="!tourProgram.refund.refund50" min="0" :max="tourProgram.refund.refund50" v-model="tourProgram.refund.refund30"
                       always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund50/365) *100}%`"></v-slider>
                  </v-container>
              </v-flex>

              <!-- Tags -->
              <v-flex xs12>
                <h2>태그 추가</h2>
              </v-flex>
              <v-flex xs12>
                <multiselect v-model="tourProgram.tags" tag-placeholder="태그 추가하기" placeholder="새로운 태그를 추가하세요"
                             :options="dbTags" :multiple="true" :taggable="true" @keyup.enter="tag" @tag="addTag"></multiselect>
              </v-flex>

              <!-- 상세 정보 Editor -->
              <v-flex xs12>
                <h2>상세 정보 입력</h2>
              </v-flex>
              <v-flex>
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="tourProgram.detail"> </vue-editor>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="check" max-width="290">
      <v-card>
         <v-card-title v-html="checkText"></v-card-title>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="green darken-1" flat="flat" @click="check = false">아니요</v-btn>
           <v-btn color="green darken-1" flat="flat" @click="closePW">예</v-btn>
         </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>

</template>


<script>
import UploadImg from '@/components/UploadImg'
import UploadImgList from '@/components/UploadImgList'
import { VueEditor } from "vue2-editor"
import Multiselect from 'vue-multiselect'
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
    Multiselect,
    UploadImg,
    UploadImgList,
  },
  data (){
    return{
      dbTags:['액티비티', '공연관람'],
      showTags:[],
      checkText:'',
      check : false,
      validate: false,
      tempMain:'https:\/\/i.imgur.com\/9ge6Osc.jpg',
      nation: ['대한민국'],
      city: ['서울', '부산', '대전'],
      dialog: true,
      fromMenu: false,
      toMenu: false,
      complete: false,
      tourProgram:{
        title:'',
        mainImg:'',
        nation_kor: '',
        city_kor:[],
        fromDate:'',
        toDate:'',
        duration: '',
        cost:'',
        refund: {
          refund100: 1,
          refund50: 0,
          refund30: 0
        },
        minTrav:'',
        maxTrav: '',
        desc:'',
        tags: [],
        detail:''
      }
    }
  },
  methods : {
    addTag(newTag) {
      this.dbTags.push(newTag)
      this.tourProgram.tags.push(newTag)
    },
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
    checkSave(){
      console.log(this.tourProgram)
      for(var item in this.tourProgram){
        if(item != "tags" && !this.tourProgram[item]) {
          console.log(this.tourProgram[item])
          return alert('빈 칸을 모두 작성해주세요.')
        }
      }
      this.check = true
      this.validate=true
      this.checkText="작성을 완료하시겠습니까?"
    },
    checkClose(){
      for(var item in this.tourProgram){
        if(item != "tags" && this.tourProgram[item]) {
          this.check=true
          this.checkText="이 페이지를 나가시겠습니까?<br>변경사항이 저장되지 않을 수 있습니다."
          return true
        }
      }
    },
    closePW(){
      if(this.validate){
        this.$http.post('/api/createGuideService', this.tourProgram)
          .then( res => {
            console.log(res.status)
          })
      }
      // this.$http.post('/api/createGuideService', this.tourProgram)
      //   .then( res => {
      //     console.log(res.status)
      //   })
      const navBarZIndex = document.querySelector('#navbox')
      const footerZIndex = document.querySelector('#footer')
      navBarZIndex.style.zIndex = 1000;
      footerZIndex.style.zIndex = 1000;
      this.$emit('close', false);
    },
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
.refund-act {
  background-color: white !important;
  color: lightcoral !important;
  border: 1.5px solid lightcoral !important;
}
.refund-dis {
  background-color: white !important;
  color: lightgrey !important;
  border: 1.5px solid lightgrey !important;
}
fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}

.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41b883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}

.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}

.multiselect * {
  box-sizing: border-box;
}

.multiselect:focus {
  outline: none;
}

.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}

.multiselect--active {
  z-index: 50;
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}

.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}

.multiselect__input::placeholder {
  color: #35495e;
}

.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}

.multiselect__tags-wrap {
  display: inline;
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #41b883;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}

.multiselect__tag-icon:after {
  content: "×";
  color: #266d4d;
  font-size: 14px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #369a6e;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}

.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #999999 transparent transparent transparent;
  content: "";
}

.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}

.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}

.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}

.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__element {
  display: block;
}

.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}

.multiselect__option--highlight {
  background: #41b883;
  outline: none;
  color: white;
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #41b883;
  color: white;
}

.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}

.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}

.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}

.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}

.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}

.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}

.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}

*[dir="rtl"] .multiselect {
  text-align: right;
}

*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}

*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}

*[dir="rtl"] .multiselect__content {
  text-align: right;
}

*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}

*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}

*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>
