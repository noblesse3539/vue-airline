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
              <h2>제목 입력</h2>
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

              <!-- Tags -->
              <v-flex xs12>
                <h2>태그 추가</h2>
              </v-flex>
              <v-flex xs12>
                <multiselect v-model="tourProgram.tags" tag-placeholder="새로운 태그 추가하기" placeholder="새로운 태그를 추가하세요"
                             :options="dbTags" :multiple="true" :taggable="true" @keyup.enter="tag" @tag="addTag"
                             selectLabel="태그 추가하기" selectedLabel="태그 삭제하기" deselectLabel="태그 삭제하기"></multiselect>
              </v-flex>

              <!-- 상세 정보 Editor -->
              <v-flex xs12>
                <h2>상세 정보 입력</h2>
              </v-flex>
              <v-flex>
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="tourProgram.detail"> </vue-editor>
              </v-flex>

              <!-- 환불 정책 -->
              <v-flex xs12>
                <h2>환불 가능 기간 설정</h2>
              </v-flex>
              <v-flex xs12 sm3 md3 align-self-center>
                <v-switch color="#41b883" v-model="tourProgram.refund.refund100" :label="`환불 ${tourProgram.refund.refund100? '가능':'불가'}`"></v-switch>
              </v-flex>
              <v-flex xs12 sm9 md9>
                  <v-container style="height:150px;">
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >100% 환불 : {{tourProgram.cost}}원</v-chip>
                    <v-text-field class="refund-text" :min="tourProgram.refund.refund50" max="365" suffix="일 까지 가능" v-model="tourProgram.refund.refund100" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                    <v-slider :disabled="!tourProgram.refund.refund100" min="0" max="365" v-model="tourProgram.refund.refund100"
                    always-dirty color="red" track-color="grey"></v-slider>
                  </v-container>
                  <v-container style="height:150px;">
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >50% 환불 : {{tourProgram.cost*0.5}}원</v-chip>
                    <v-text-field class="refund-text" :min="tourProgram.refund.refund30" :max="tourProgram.refund.refund100" suffix="일 까지 가능" v-model="tourProgram.refund.refund50" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                     <v-slider :disabled="!tourProgram.refund.refund100" min="0" :max="tourProgram.refund.refund100" v-model="tourProgram.refund.refund50"
                      always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund100/365) *100}%`"></v-slider>
                  </v-container>
                  <v-container style="height:170px;">
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >30% 환불 : {{tourProgram.cost*0.3}}원</v-chip>
                    <v-text-field class="refund-text" suffix="일 까지 가능" v-model="tourProgram.refund.refund30" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                      <v-slider :disabled="!tourProgram.refund.refund50" min="0" :max="tourProgram.refund.refund50" v-model="tourProgram.refund.refund30"
                       always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund50/365) *100}%`"></v-slider>
                  </v-container>
              </v-flex>

              <!-- ================================================================================================================ -->
              <v-flex xs12 d-flex>
                <h2>결제 옵션 추가(다수 가능)</h2>
              </v-flex>
              <v-flex xs12 d-flex>
                <v-text-field height="80px" style="font-weight:bold; font-size: 2rem;"
                v-model="option.title" label="결제 옵션의 제목을 입력해주세요. 예) 4인 1실|3월~6월(비수기)|투어(점심포함)" solo></v-text-field>
              </v-flex>
              <!-- 시작날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="optionFromMenu" v-model="optionFromMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="option.fromDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="option.fromDate" label="시작 날짜*" :value="option.fromDate" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :max="option.toDate" v-model="option.fromDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="optionFromMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.optionFromMenu.save(option.fromDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <!-- 종료날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="optionToMenu" v-model="optionToMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="option.toDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="option.toDate" :value="option.toDate" label="종료 날짜*" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :min="option.fromDate" v-model="option.toDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="optionToMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.optionToMenu.save(option.toDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <!-- 요일 선택 -->
              <v-flex xs12 sm6 d-flex>
                <v-select prepend-icon="map" label="요일 선택(다수 가능)*" v-model="option.dayOfWeek" :items="dayOfWeek" attach small-chips multiple></v-select>
              </v-flex>
              <!-- 시간대 선택 -->
              <v-flex xs12 sm6 d-flex>
                <v-select prepend-icon="map" label="시간대 선택(다수 가능)*" v-model="option.times" :items="times" attach small-chips multiple></v-select>
              </v-flex>

              <!-- 인원 -->
              <v-flex xs6>
                <v-text-field prepend-icon="far fa-user" suffix="명" v-model.number="option.refPeople.num" label="최소 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>
              <!-- 기준 선택 -->
              <v-flex xs6 d-flex>
                <v-select prepend-icon="map" label="기준 선택*" v-model="option.refPeople.opt" :items="refPeopleOpt" attach small-chips></v-select>
              </v-flex>
              <!-- 서비스 종료 최대 인원 -->
              <v-flex xs6>
                <v-text-field prepend-icon="fa-users" suffix="명" v-model.number="option.maxPeople" label="서비스 종료 최대 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>

              <!-- 인원 구분 -->
              <v-flex xs6 d-flex>
                <v-select prepend-icon="fa-users" label="인원 구분 선택*" v-bind:items="peopleType" v-model="option.peopleTypeOpt" item-text="name_kor" item-value="name_eng" attach small-chips multiple>
                </v-select>
              </v-flex>

              <template v-if="option.peopleTypeOpt.indexOf('infant')!==-1">
                <v-flex xs3>
                  <h3 style="text-align:center">유아</h3>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.infant.cost" placeholder="1인당 가격"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.infant.minAge" placeholder="최소 나이 제한"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.infant.maxAge" placeholder="최대 나이 제한"/>
                </v-flex>
              </template>

              <template v-if="option.peopleTypeOpt.indexOf('child')!==-1">
                <v-flex xs3>
                  <h3 style="text-align:center">아동</h3>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.child.cost" placeholder="1인당 가격"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.child.minAge" placeholder="최소 나이 제한"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.child.maxAge" placeholder="최대 나이 제한"/>
                </v-flex>
              </template>

              <template v-if="option.peopleTypeOpt.indexOf('adult')!==-1 || option.peopleTypeOpt.indexOf('none')!==-1">
                <v-flex xs3>
                  <h3 style="text-align:center">성인</h3>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.adult.cost" placeholder="1인당 가격"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.adult.minAge" placeholder="최소 나이 제한"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.adult.maxAge" placeholder="최대 나이 제한"/>
                </v-flex>
              </template>

              <template xs12 v-if="option.peopleTypeOpt.indexOf('senior')!==-1">
                <v-flex xs3>
                  <h3 style="text-align:center">고령자</h3>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.senior.cost" placeholder="1인당 가격"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.senior.minAge" placeholder="최소 나이 제한"/>
                </v-flex>
                <v-flex xs3>
                  <input style="width:120px;font-size:1rem!important" type="number" v-model="option.senior.maxAge" placeholder="최대 나이 제한"/>
                </v-flex>
              </template>

              <!-- 상세설명 -->
              <v-flex xs12 sm9 d-flex>
                <v-text-field height="50px" style="font-weight:bold; font-size: 2rem;"
                v-model="desc" label="상세 설명 추가 예) 최소 2인이상|점심 불포함" solo></v-text-field>
              </v-flex>

              <v-flex xs12 sm3 d-flex>
                <div style="text-align:center">
                  <v-btn @click="OptionDescAdd">상세 설명 추가</v-btn>
                </div>
              </v-flex>

              <v-flex xs12>
                <v-card>
                  <ul>
                    <li style="font-weight:bold;font-size:1.5rem;" v-for="(item,index) in option.desc">
                      {{item}}
                      <v-btn @click="OptionDescDelete(index)">삭제</v-btn>
                    </li>
                  </ul>
                </v-card>
              </v-flex>

              <div style="margin:auto">
                <v-btn @click="OptionAdd()" color="light-blue" class="white--text">결제 옵션 추가</v-btn>
              </div>


              <v-flex xs12>
                <v-card>
                  <ul>
                    <li style="font-weight:bold;font-size:1.5rem;" v-for="(item,key) in tourProgram.options">
                      <div>
                        title : {{item.title}}<br />
                        fromDate : {{item.fromDate}}<br />
                        toDate : {{item.toDate}}<br />
                        dayOfWeek : {{item.dayOfWeek}}<br />
                        times : {{item.times}}<br />
                        desc : {{item.desc}}<br />
                        num : {{item.refPeople.num}}<br />
                        opt : {{item.refPeople.opt}}<br />
                        <div v-if="item.peopleTypeOpt.indexOf('senior')!==-1">
                          senior :<br />
                          <span style="padding:20px">cost : {{item.senior.cost}}</span>
                          <span style="padding:20px">minAge : {{item.senior.minAge}}</span>
                          <span style="padding:20px">maxAge : {{item.senior.maxAge}}</span>
                        </div>
                        <div v-if="item.peopleTypeOpt.indexOf('adult')!==-1">
                          adult :<br />
                          <span style="padding:20px">cost : {{item.adult.cost}}</span>
                          <span style="padding:20px">minAge : {{item.adult.minAge}}</span>
                          <span style="padding:20px">maxAge : {{item.adult.maxAge}}</span>
                        </div>
                        <div v-if="item.peopleTypeOpt.indexOf('child')!==-1">
                          child :<br />
                          <span style="padding:20px">cost : {{item.child.cost}}</span>
                          <span style="padding:20px">minAge : {{item.child.minAge}}</span>
                          <span style="padding:20px">maxAge : {{item.child.maxAge}}</span>
                        </div>
                        <div v-if="item.peopleTypeOpt.indexOf('infant')!==-1">
                          infant :<br />
                          <span style="padding:20px">cost : {{item.infant.cost}}</span>
                          <span style="padding:20px">minAge : {{item.infant.minAge}}</span>
                          <span style="padding:20px">maxAge : {{item.infant.maxAge}}</span>
                        </div>
                        costType : {{item.costType}}<br />
                        maxPeople : {{item.maxPeople}}
                      </div>
                    </li>
                  </ul>
                </v-card>
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
import './PortfolioWrite.css'
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
      dayOfWeek:['월','화','수','목','금','토','일'],
      times:[
        '00:00','00:15','00:30','00:45','01:00','01:15','01:30','01:45','02:00','02:15','02:30','02:45','03:00','03:15','03:30','03:45',
        '04:00','04:15','04:30','04:45','05:00','05:15','05:30','05:45','06:00','06:15','06:30','06:45','07:00','07:15','07:30','07:45',
        '08:00','08:15','08:30','08:45','09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45',
        '12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45',
        '16:00','16:15','16:30','16:45','17:00','17:15','17:30','17:45','18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45',
        '20:00','20:15','20:30','20:45','21:00','21:15','21:30','21:45','22:00','22:15','22:30','22:45','23:00','23:15','23:30','23:45'
      ],
      refPeopleOpt:['More','Multiple'],
      peopleType:[{name_kor:'없음',
                  name_eng:'none'},
                  {name_kor:'유아',
                  name_eng:'infant'},
                  {name_kor:'아동',
                  name_eng:'child'},
                  {name_kor:'성인',
                  name_eng:'adult'},
                  {name_kor:'고령자',
                  name_eng:'senior'}],
      desc:'',
      dialog: true,
      fromMenu: false,
      toMenu: false,
      optionFromMenu: false,
      optionToMenu: false,
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
        options:[],
        tags: [],
        detail:'',
      },
      option:{
          guideservice: '',
          title: '',
          fromDate: '',
          toDate: '',
          dayOfWeek:[],
          times: [],
          desc: [],
          refPeople: {
            num: '',
            opt: ''
          },
          senior: {
            cost: '',
            minAge: '',
            maxAge: ''
          },
          adult: {
            cost: '',
            minAge: '',
            maxAge: ''
          },
          child: {
            cost: '',
            minAge: '',
            maxAge: ''
          },
          infant: {
            cost: '',
            minAge: '',
            maxAge: ''
          },
          peopleTypeOpt:[],
          costType: '',
          maxPeople: ''
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
      console.log(this.option)
      console.log(this.option.peopleTypeOpt);
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
        this.$http.post('/api/guideservice/create', this.tourProgram)
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
    OptionDescAdd(){
      this.option.desc.push(this.desc)
      this.desc=''
    },
    OptionDescDelete(index){
      this.option.desc.splice(index,1)
    },
    OptionAdd(){
      // const a=new Object(this.option)
      this.tourProgram.options = [...this.tourProgram.options, JSON.parse(JSON.stringify(this.option))]
      this.OptionClear()

    },
    OptionDelete(index){
      this.tourProgram.options.splice(index,1)
    },
    OptionClear(){
      this.option.title= ''
      this.option.fromDate= ''
      this.option.toDate= ''
      this.option.dayOfWeek=[]
      this.option.times= []
      this.option.desc= []
      this.option.refPeople.num=''
      this.option.refPeople.opt= ''
      this.option.senior.cost= ''
      this.option.senior.minAge= ''
      this.option.senior.maxAge= ''
      this.option.adult.cost= ''
      this.option.adult.minAge= ''
      this.option.adult.maxAge= ''
      this.option.child.cost= ''
      this.option.child.minAge= ''
      this.option.child.maxAge= ''
      this.option.infant.cost= ''
      this.option.infant.minAge= ''
      this.option.infant.maxAge= ''
      this.option.costType= ''
      this.option.maxPeople= ''
      this.option.peopleTypeOpt= ''
    }
  }
}
</script>
