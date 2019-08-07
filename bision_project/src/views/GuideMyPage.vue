<template>
  <div class="guidepage" v-if="getIsLoggedIn">
    <v-container>

    <!-- Profile 영역 -->
    <v-layout xs12 my-5 mx-5 align-center>

      <!-- ProfileImg -->
      <v-flex xs3 mr-5>
        
        <!-- if: 본인 아닐 때 -->
        <!-- <v-img fluid style="border-radius: 50%;" class="profileImg" :src="imgurl" aspect-ratio="1" alt="profile Img"></v-img> -->

        <!-- else: 본인 일 때 -->
          <v-hover>
            <v-img fluid style="border-radius: 50%;"  @click="showIU" slot-scope="{hover}" v-on="on" class="profileImg" :src="imgurl" aspect-ratio="1" alt="profile Img">
              <v-fade-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out white v-card--reveal  black--text" style="height: 100%;">
                    <!-- 이미지 변경 -->
                </div>
              </v-fade-transition>
            </v-img>
          </v-hover>
          <UploadImgModal v-model="imgurl" v-if="isIUVisible" @close="closeIU"/>
        <!-- else 끝 -->
      </v-flex>

      <!-- Introduction -->
      <v-flex xs6 class="gs-guidename-box">
        <!-- <div class="guide-country-flag">
          <img src="" alt="">
        </div> -->
        <h2 class="display-1 mb-3">
          <span class="gs-guidename">
            {{guideName}}</span>
          
          <!-- v-if: 본인일 때 -->
          <v-tooltip right v-if="guideId == getUserId">
            <template v-slot:activator="{ on }">
              <v-btn @click="showET" v-on="on" flat icon fab color="indigo" class="gs-edit-btn">
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
            <span>내 소개 수정하기</span>
          </v-tooltip>

          <form v-if="isETVisible">
            <v-textarea class="my-intro" clearable v-model = "introTemp" label="내 소개 수정" :value="introTemp"></v-textarea>
            <!-- intro 데이터에 수정여부 추가 -->
            <v-btn @click="doneET">submit</v-btn>
            <v-btn @click="cancelET">cancel</v-btn>
          </form>
          <!--  -->
        </h2>

        <p v-show="!isETVisible" class="title"> {{intro}}</p>
      </v-flex>

      <!--v-if 본인이면 -->
      <!-- <v-flex xs3 >
        <v-btn color="white">회원 탈퇴</v-btn>
      </v-flex> -->
    </v-layout>
    
    <!-- tab 영역 -->
    <v-sheet color="white" class="tab-section" >
      <v-tabs slider-color="#45CE30" color="white" fixed-tabs>
        <v-tab key="Now" class="tab-name">Now</v-tab>
        <v-tab key="ALL" class="tab-name" >ALL</v-tab>
        <v-tab key="Portfolio" class="tab-name" >RESERVATION</v-tab>

        <!-- 현재 상품 -->
        <v-tab-item key="Now" color="yellow">
          <v-flex xs12 >
            <v-card flat v-for="(service, idx) in guideServices" :key="idx">
              <!-- <v-card-title><h2>Plan Title</h2></v-card-title> -->
              <v-layout mt-4 class="gs-mypage-service-box"
              
              >
              <v-img class="gs-mypage-service-bg" :src="service.mainImg">
              </v-img>
              <div>

              </div>
                <div class="gs-mypage-service-content">
                  <div class="gs-mypage-service-content-title">
                    {{service.title}}
                  </div>
                  <hr>
                  <div class="gs-mypage-service-content-info">
                    {{service.desc}}
                  </div>
                  <div class="gs-mypage-service-content-date">
                    위치: {{service.city_kor[0]}}<br>
                    기간: {{service.fromDate}} ~ {{service.toDate}}<br>
                    가이드 시간: {{service.duration}}
                  </div>
                  <div class="gs-mypage-service-content-bottom">
                    <div class="gs-mypage-keyword-list">
                      <div class="gs-mypage-kyeword-each" v-for="tag in service.tags" :key="tag">
                        {{tag.tag}}
                      </div>
                    </div>
                    <div class="gs-mypage-service-content-bottom-reserve">
                      <button 
                        v-if="getUserId == guideId"
                        class="gs-mypage-service-content-bottom-reserve-btn gs-btn-revise"
                        style="margin-right: 10px;"
                        @click="editGuideService()"
                      >
                        수정하기
                      </button>
                      <!-- 수정 시 Portfoliowrite 컴포넌트에 props 넘겨줍니다. -->
                      <PortfolioWrite :class="portfilo-write-idx" :serviceInfo="guideServices[idx]" v-if="isPWEditVisible" title="여행 상품 등록" @close="closePW"></PortfolioWrite>
                      <button
                        v-if="getUserId !== guideId"
                        class="gs-mypage-service-content-bottom-reserve-btn"
                        @click="goToServiceDetail(service._id)"
                      >
                        예약하기
                      </button>
                    </div>
                  </div>
                </div>
              <Weather class="gs-mypage-weather" :city="service.city_kor[0]"></Weather>
                <!-- <v-flex xs12 md5 @click="goToServiceDetail">
                  <v-img :src="getImgUrl('logo.png')"></v-img>
                </v-flex>
                <v-flex xs12 md7 ml-5>
                  <v-card-text> Introduction to tour Plan</v-card-text>
                </v-flex>
                <v-flex align-end justify-end xs12>
                  <v-card-actions>
                    <v-btn flat>Book now</v-btn>
                  </v-card-actions>
                </v-flex> -->
              </v-layout>
            </v-card>

            <!-- <h2>가이드 평균 별점</h2> -->
            <!-- vuetify 그대로 긁어왔는데 반쪽이랑 span 안댐 -->
            <!-- <span class="grey--text text--lighten-2 caption mr-2"> ({{ this.rating }})</span>
            <v-rating readonly x-large v-model="rating" background-color="grey" color="yellow accent-4" dense half-increments hover size="18"></v-rating> -->

            <!-- 후기 영역 -->
             <v-list three-line>
              <!-- 차 후 후기 넣을것 -->
             </v-list>

          </v-flex>
        </v-tab-item>

        <!-- Portfolio tab item -->
        <v-tab-item key="ALL">
          <!-- <v-btn v-if="getUserId == guideId"  @click="showPW" color="white">여행 상품 등록</v-btn> -->
          
          <div class="gs-ALL-container">
            <div class="gs-ALL-service-add-btn" @click="showPW">
              <div class="gs-ALL-service-add-btn-inside" v-if="getUserId == guideId" >
                +
              </div>
              <PortfolioWrite v-if="isPWVisible" title="여행 상품 등록" @close="closePW"></PortfolioWrite>
            </div>
            <div class="gs-ALL-service-card" v-for="(service, idx) in guideServices" :key="idx">
              <div class="gs-ALL-service-card-bg">
                <img class="gs-ALL-service-card-img"  :src="service.mainImg" alt="guide service img">
              </div>
              <div class="gs-ALL-service-card-title" @click="goToServiceDetail(service._id)">
                <div class="gs-ALL-service-card-title-title">
                  {{service.title}}
                </div>
                <div class="gs-ALL-service-card-title-title">
                  {{service.fromDate}}~{{service.toDate}}
                </div>
              </div>
              <!-- <div class="gs-ALL-service-card-seemore">
                Detail
              </div> -->
            </div>
          </div>
        <!-- portfolio list -->
        <!-- <v-container fluid grid-list-md mx-2> -->
          <!-- <v-layout row wrap >
            <v-flex mx-2 my-2 v-for="(service, idx) in guideServices" :key="idx" xs4>
              <v-card>
                <v-img 
                  :src="service.mainImg"
                  height="200px"
                  @click="goToServiceDetail(service._id)"
                >
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="service.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout> -->
        <!-- </v-container> -->

        </v-tab-item>
      </v-tabs>
    </v-sheet>
    </v-container>
  </div>
</template>

<script>
import UploadImg from '../components/UploadImg'
import UploadImgModal from '../components/UploadImgModal'
import PortfolioWrite from '../components/PortfolioWrite'
import Weather from '../components/Weather'
import './GuideMyPage.css'
import { mapGetters, mapState } from "vuex";
export default {
  name: 'GuideMypage',
  components:{
    UploadImg,
    UploadImgModal,
    PortfolioWrite,
    Weather,
  },
  props: ['guideId'],
  methods: {
    goToServiceDetail(guideServiceId) {
      console.log(guideServiceId)
      // `/user/${getuserId}`
      this.$router.push({path: `/guideServiceDetailPage`, query: {serviceId : guideServiceId}})
    },
    getImgUrl(img){
      return require('../assets/' + img)
    },
    showIU() {
      this.isIUVisible = true;

    },
    closeIU(value) {
      // console.log(value)
      if(value){
        this.imgurl=value;
        const guideId = this.getUserId
        const config = {
          'profileImageUrl': this.imgurl
        }
        this.$http.put(`/api/guide/${guideId}`, config)
          .then( res => {
            // console.log(res.data)
          })


      }

      this.isIUVisible = false;
    },

    showET(){
      this.introTemp = this.intro;
      this.isETVisible = true;
    },
    doneET(){
      this.intro = this.introTemp;
      this.updateIntro()
      this.isETVisible = false;
    },
    cancelET(){
      this.introTemp = '';
      this.isETVisible = false;
    },
    showPW(){
      const navBarZIndex = document.querySelector('#navbox')

      const footerZIndex = document.querySelector('#footer')
      footerZIndex.style.zIndex = 0;
      
      navBarZIndex.style.zIndex = 0;
      document.documentElement.style.overflow='hidden';
      document.body.scroll="no";
      this.isPWVisible = true;
    },
    showPWEdit() {
      const navBarZIndex = document.querySelector('#navbox')

      const footerZIndex = document.querySelector('#footer')
      footerZIndex.style.zIndex = 0;
      
      navBarZIndex.style.zIndex = 0;
      document.documentElement.style.overflow='hidden';
      document.body.scroll="no";
      this.isPWEditVisible = true;
    },
    closePW(){
      document.documentElement.style.overflow='scroll';
      document.body.scroll="yes";
      this.isPWVisible = false;
      this.isPWEditVisible = false;
    },
    updateIntro() {
      const guideId = this.getUserId
      const config = {
        'intro': this.intro,
        'profileImageUrl' : this.imgurl,
      }
      this.$http.put(`/api/guide/${guideId}`, config)
        .then( res => {
          // console.log(res.data)
        })
    },
    GuideDataRequest() {
      this.$http.get(`/api/guide/${this.guideId}`)
      .then(res => {
        console.log(res.data)

        const guide = res.data.guide
        if(guide.intro) this.intro = guide.intro
        this.guideName = guide.nickname

        // 가이드 평균 평점 구하기
        if (res.data.guide.starRatingList.length) {
          sum = res.data.guide.starRatingList.reduce(function(acc, each) { return acc + each})
          avg = sum / res.data.guide.starRatingList.length
          this.rating = avg
        }

        this.imgurl = res.data.guide.profileImageUrl

      })
    },
    getGuideService() {
      this.$http.get(` /api/guideservice/findGSByGuideId/${this.guideId}`)
        .then( res => {
          console.log(res)
          this.guideServices = res.data.reverse()
          // console.log(this.guideServices)
        })
    },
    closeFooter() {

      const footer = document.querySelector(".v-footer")

      this.$store.commit("closeFooter")

      if (this.isFooterOpen == false) {
        footer.style.display = "none"
      }
    },
    blurHeader() {
      const footer = document.querySelector("#navbox")

      // this.$store.commit("closeHeader")
      footer.style.background = "rgba(255, 255, 255, 1)"

      // if (this.isHeaderOpen == false) {
      // }
    },

    editGuideService() {
      this.showPWEdit()
    },
  },
  data (){
    return{
      guideName: '',
      rating: 1,
      isIUVisible: false,
      isETVisible: false,
      isPWVisible: false,
      isPWEditVisible: false,
      imgurl: require('../assets/guideProfile.png'),
      intro: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.',
      introTemp: '',
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'}
      ],

      // 가이드 페이지 접근 차단 관리 변수
      // 현재 가이드 페이지에 접근한 유저가 해당 가이드인지 일반 유저인지 판단 후,
      // 일반 유저일 경우 수정 기능들을 비활성 처리합니다.
      guideId: this.$route.query.guideId,
      
      // 가이드 상품 관련
      guideServices: [],
    }
  },
  computed: {
    ...mapState({
      getUserId: state => state.User.userId,
      getIsLoggedIn: state => state.User.isLoggedIn,
      isFooterOpen : state => state.Footer.isFooterOpen,
      isHeaderOpen : state => state.Header.isHeaderOpen,
    })
  },
  mounted() {
    this.GuideDataRequest()
    this.getGuideService()
    this.closeFooter()
    this.blurHeader()
  },
}
</script>

<style>


</style>
