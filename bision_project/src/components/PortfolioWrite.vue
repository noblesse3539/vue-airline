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
                    <v-text-field :min="tourProgram.refund.refund50" max="365" suffix="일 까지 가능" v-model="tourProgram.refund.refund100" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                    <v-slider :disabled="!tourProgram.refund.refund100" min="0" max="365" v-model="tourProgram.refund.refund100"
                    always-dirty color="red" track-color="grey" :rules="refund_rule1" ></v-slider>
                  </v-container>
                  <v-container>
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >50% 환불 : {{tourProgram.cost*0.5}}원</v-chip>
                    <v-text-field :min="tourProgram.refund.refund30" :max="tourProgram.refund.refund100" suffix="일 까지 가능" v-model="tourProgram.refund.refund50" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                    <!-- <v-slider :disabled="!tourProgram.refund.refund100" min="0" max="365" v-model="tourProgram.refund.refund50"
                     always-dirty color="red" track-color="grey" :rules="refund_rule2"></v-slider> -->
                     <v-slider :disabled="!tourProgram.refund.refund100" min="0" :max="tourProgram.refund.refund100" v-model="tourProgram.refund.refund50"
                      always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund100/365) *100}%`"></v-slider>
                  </v-container>
                  <v-container>
                    <v-chip disabled :class="`${tourProgram.refund.refund100? 'refund-act':'refund-dis'}`" >30% 환불 : {{tourProgram.cost*0.3}}원</v-chip>
                    <v-text-field suffix="일 까지 가능" v-model="tourProgram.refund.refund30" solo flat
                                  :disabled="!tourProgram.refund.refund100" hide-details single-line type="number"></v-text-field>
                    <!-- <v-slider :disabled="!tourProgram.refund.refund100" min="0" max="365" v-model="tourProgram.refund.refund30"
                      always-dirty color="red" track-color="grey" :rules="refund_rule3" ></v-slider> -->
                      <v-slider :disabled="!tourProgram.refund.refund50" min="0" :max="tourProgram.refund.refund50" v-model="tourProgram.refund.refund30"
                       always-dirty color="red" track-color="grey" :style="`width: ${(tourProgram.refund.refund50/365) *100}%`"></v-slider>
                  </v-container>
              </v-flex>

              <!-- Tags -->
              <v-flex xs12>
                <h2>태그 추가(아직안대여..)</h2>
              </v-flex>
              <v-flex xs12>
                <v-combobox v-model="tourProgram.tags" :filter="filter" :hide-no-data="!search" :items="items"
                            :search-input.sync="search"  hide-selected label="태그를 추가해주세요"
                            multiple small-chips solo >
                  <template v-slot:no-data>
                    <v-list-tile>
                      <span class="subheading">추가</span>
                      <v-chip :color="`green lighten-3`" label>{{ search }}</v-chip>
                    </v-list-tile>
                  </template>
                  <template v-slot:selection="{ item, parent, selected }">
                    <v-chip v-if="item === Object(item)" :color="`green lighten-3`" :selected="selected" label>
                      <span class="pr-2">{{ item.text }}</span>
                      <v-icon small @click="parent.selectItem(item)">close</v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ index, item }">
                    <v-list-tile-content>
                      <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat
                        background-color="transparent" hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
                      <v-chip v-else :color="`green lighten-3`" dark label>
                        {{ item.text }}
                      </v-chip>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action @click.stop>
                      <v-btn icon @click.stop.prevent="edit(index, item)">
                        <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </template>
                </v-combobox>
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
      refund_rule1:[v => this.tourProgram.refund.refund50 < v  || '환불 기간을 확인해주세요.'],
      refund_rule2:[v => (this.tourProgram.refund.refund30 < v && v < this.tourProgram.refund.refund100) || '환불 기간을 확인해주세요.'],
      refund_rule3:[v => ( v && v < this.tourProgram.refund.refund50 ) || '환불 기간을 확인해주세요.'],
      activator: null,
      attach: null,
      editing: null,
      index: -1,
      items: [
        { header: '선택하거나 추가해주세요.' },
        {
          text: '액티비티',
        },
        {
          text: '공연관람',
        },
        {
          text: '쇼핑',
        },
        {
          text: '문화체험',
        }
      ],
      menu: false,
      x: 0,
      search: null,
      y: 0,
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
        tags: ['시티투어'],
        detail:''
      }
    }
  },
  watch: {
   tourProgram: function(val, prev) {
     if (val.length === prev.length) return

     this.tourProgram.tags = val.map(v => {
       if (typeof v === 'string') {
         v = {
           text: v,
         }
         this.items.push(v)
        }
        return v
      })
    }
  },
  methods : {
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        this.editing = null
        this.index = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1

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
      // for(var item in this.tourProgram){
      //   if(item != "tags" && !this.tourProgram[item]) {
      //     console.log(this.tourProgram[item])
      //     return alert('빈 칸을 모두 작성해주세요.')
      //   }
      // }
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
      // if(this.validate){
      //   this.$http.post('/api/createGuideService', this.tourProgram)
      //     .then( res => {
      //       console.log(res.status)
      //     })
      // }
      this.$http.post('/api/createGuideService', this.tourProgram)
        .then( res => {
          console.log(res.status)
        })
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
</style>
