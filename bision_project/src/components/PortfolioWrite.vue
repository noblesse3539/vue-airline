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
              <h2>메인 이미지 선택</h2>
              <v-flex xs12 d-flex>
                <UploadImg :imgUrl="getImgUrl('main.jpg')" :isMain="true"></UploadImg>
              </v-flex>

              <v-flex xs12 d-flex>
                <h2>기본 정보 입력</h2>
              </v-flex>
              <!-- 나라, 도시 선택 -->
              <v-flex xs12 sm4 d-flex>
                <v-select prepend-icon="fa-globe-asia" label="나라 선택*" v-model="Pnation" :items="nation"></v-select>
              </v-flex>
              <v-flex xs12 sm8 d-flex>
                <v-select prepend-icon="map" label="도시 선택(다수 가능)*" v-model="PCity" :items="city" attach small-chips multiple></v-select>
              </v-flex>

              <!-- 시작날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="fromMenu" v-model="fromMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="portfolio.fromDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="portfolio.fromDate" label="시작 날짜*" :value="portfolio.fromDate" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :max="toDate" v-model="portfolio.fromDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="fromMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.fromMenu.save(portfolio.fromDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <!-- 종료날짜 -->
              <v-flex xs12 sm6>
                <v-menu ref="toMenu" v-model="toMenu" :close-on-content-click="false"
                        :nudge-right="40" :return-value.sync="portfolio.toDate" lazy transition="scale-transition"
                        min-width="290px" offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field color="blue" v-model="portfolio.toDate" :value="portfolio.toDate" label="종료 날짜*" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker :min="portfolio.fromDate" v-model="portfolio.toDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="blue" @click="toMenu = false">Cancel</v-btn>
                    <v-btn flat color="blue" @click="$refs.toMenu.save(portfolio.toDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <!-- 소요시간 -->
              <v-flex xs6>
                <v-text-field prepend-icon="schedule" v-model="portfolio.duration" label="소요시간*" clearable
                              clear-icon="clear" hint="ex) 10시간, 1박2일" persistent-hint color="blue"></v-text-field>
              </v-flex>

              <!-- 통화 변환 구현필요 -->
              <v-flex xs6>
                <v-text-field prepend-icon="fa-wallet" label="가격*" prefix="₩" v-model.number="portfolio.cost"  clearable
                              clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>

              <!-- 인원 -->
              <v-flex xs6>
                <v-text-field prepend-icon="far fa-user" suffix="명" v-model.number="portfolio.minTrav" label="최소 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="fa-users" suffix="명" v-model.number="portfolio.maxTrav" label="최대 인원*"
                              clearable clear-icon="clear" type="number" color="blue"></v-text-field>
              </v-flex>

              <!-- description 글자수 제약?-->
              <v-flex xs12>
                <v-textarea label="상품 요약*" auto-grow solo v-model="portfolio.desc" color="blue"></v-textarea>
              </v-flex>

              <v-flex xs12>
                <h2>상세 정보 입력</h2>
              </v-flex>
              <v-flex>

              </v-flex>
            </v-layout>



        <!-- step2 -->
          <!-- <v-expansion-panel v-model="panel" expand flat>
            <v-expansion-panel-content>
              <template v-slot:header>상세 설명 작성 </template>
              <v-card>
                <v-card-text>
                  dlfjz[dlfjzpdlfjzl]
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel> -->
          </v-container>
      </v-card-text>


        <!-- step3 -->
        <!-- <v-window-item :value="3">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap >
                <!-- 대표 Img -->
                <!-- <v-flex xs6 align-self-center>
                  <p class="subheading">상세 설명 작성</p>
                </v-flex>
                <v-flex xs6 align-self-center>
                  <p class="subheading">미리보기 <i class="fas fa-external-link-alt"></i></p>
                </v-flex>
                <v-flex xs12 >
                  <div id="MDeditor">
                   <textarea class="MDTextArea":value="MDinput" @input="MDupdate"></textarea>
                   <div v-html="compiledMarkdown"></div>
                 </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-window-item>

      </v-window>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn icon flat color="warning" v-if="step !== 1" @click="step--"><v-icon large> keyboard_arrow_left </v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon flat color="warning" v-if="step !== 3" @click="step++"><v-icon large> keyboard_arrow_right </v-icon></v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>


<script>

import UploadImg from '@/components/UploadImg'
import UploadImgList from '@/components/UploadImgList'
// import Vue from 'vue'
// import vuenationRegionSelect from 'vue-nation-region-select'
// Vue.use(vuenationRegionSelect)

export default {
  name: 'PortfolioWrite',
  props : {
    // 무슨 form? Edit/Create/New/Past
    title: String,
  },
  components:{
    UploadImg,
    UploadImgList
  },
  data (){
    return{
      MDinput:'## 상세 여행 플랜을 입력해주세요.',
      Pnation:'',
      PCity:[],
      nation: ['대한민국'],
      city: ['서울', '부산', '대전'],
      dialog: true,
      fromMenu: false,
      toMenu: false,
      step: 1,
      complete: false,
      portfolio:{
        fromDate:'',
        toDate:'',
        duration: '',
        cost:'',
        minTrav:'',
        maxTrav: '',
        desc:'',
      }
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.MDinput, { sanitize: true })
    }
  },
  methods : {
    getImgUrl(img){
      return require('../assets/' + img)
    },
    MDupdate: _.debounce(function (e) {
      this.MDinput = e.target.value
    }, 300),
    savePW(){
      this.$emit('close')
    },
    closePW(){
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
#MDeditor {
  margin: 0;
  min-height:300px;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.MDTextArea, #MDeditor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

.MDTextArea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
