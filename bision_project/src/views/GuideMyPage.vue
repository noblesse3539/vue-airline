<template>
  <div class="guidepage" v-if="getIsLoggedIn">
    <v-container>

    <!-- Profile 영역 -->
    <v-layout xs12 my-5 mx-5 align-end>

      <!-- ProfileImg -->
      <v-flex xs3 mr-5>

        <!-- if: 본인 아닐 때 -->
        <!-- <v-img fluid style="border-radius: 50%;" class="profileImg" :src="imgurl" aspect-ratio="1" alt="profile Img"></v-img> -->

        <!-- else: 본인 일 때 -->
          <v-hover>
            <v-img fluid style="border-radius: 50%;"  @click="showIU" slot-scope="{hover}" v-on="on" class="profileImg" :src="imgurl" aspect-ratio="1" alt="profile Img">
              <v-fade-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out white v-card--reveal  black--text" style="height: 100%;">
                    이미지 변경
                </div>
              </v-fade-transition>
            </v-img>
          </v-hover>
          <UploadImgModal v-model="imgurl" v-if="isIUVisible" @close="closeIU"/>
        <!-- else 끝 -->
      </v-flex>

      <!-- Introduction -->
      <v-flex xs6>
        <h2 class="display-1 mb-3">{{guideName}}
          
          <!-- v-if: 본인일 때 -->
          <v-tooltip right v-if="guideId == getUserId">
            <template v-slot:activator="{ on }">
              <v-btn @click="showET" v-on="on" flat icon fab color="indigo">
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
            <span>내 소개 수정하기</span>
          </v-tooltip>

          <form v-if="isETVisible">
            <v-textarea clearable v-model = "introTemp" label="내 소개 수정" :value="introTemp"></v-textarea>
            <!-- intro 데이터에 수정여부 추가 -->
            <v-btn @click="doneET">submit</v-btn>
            <v-btn @click="cancelET">cancel</v-btn>
          </form>
          <!--  -->
        </h2>

        <p v-show="!isETVisible" class="title"> {{intro}}</p>
      </v-flex>

      <!--v-if 본인이면 -->
      <v-flex xs3 >
        <v-btn color="white">회원 탈퇴</v-btn>
      </v-flex>
    </v-layout>

    <!-- tab 영역 -->
    <v-sheet color="white">
      <v-tabs  color="white">
        <v-tab key="Now" > Now </v-tab>
        <v-tab key="Portfolio"> 지난 여행 상품 </v-tab>
        <v-tab-item key="Now">
          <v-flex xs12>
            <v-card flat>
              <v-card-title><h2>Plan Title</h2></v-card-title>
              <v-layout mx-5 mb-5>
                <v-flex xs12 md5 @click="goToServiceDetail">
                  <v-img :src="getImgUrl('logo.png')"></v-img>
                </v-flex>
                <v-flex xs12 md7 ml-5>
                  <v-card-text> Introduction to tour Plan</v-card-text>
                </v-flex>
                <v-flex align-end justify-end xs12>
                  <v-card-actions>
                    <v-btn flat>Book now</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
            <v-divider></v-divider>

            <h2>가이드 평균 별점</h2>
            <!-- vuetify 그대로 긁어왔는데 반쪽이랑 span 안댐 -->
            <span class="grey--text text--lighten-2 caption mr-2"> ({{ this.rating }})</span>
            <v-rating readonly x-large v-model="rating" background-color="grey" color="yellow accent-4" dense half-increments hover size="18"></v-rating>

            <!-- 후기 영역 -->
             <v-list three-line>
              <!-- 차 후 후기 넣을것 -->
             </v-list>

          </v-flex>
        </v-tab-item>

        <!-- Portfolio tab item -->
        <v-tab-item key="Portfolio">
          <v-btn  @click="showPW" color="white">여행 상품 등록</v-btn>
          <PortfolioWrite v-if="isPWVisible" title="여행 상품 등록" @close="closePW"></PortfolioWrite>

          <!-- portfolio list -->
        <v-container fluid grid-list-md mx-2>
          <v-layout row wrap >
            <v-flex mx-2 my-2 v-for="(service, idx) in guideServices" :key="idx" xs4>
              <v-card>
                <v-img :src="service.mainImg" height="200px">
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
          </v-layout>
        </v-container>

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
import './GuideMyPage.css'
import { mapGetters, mapState } from "vuex";
export default {
  name: 'GuideMypage',
  components:{
    UploadImg,
    UploadImgModal,
    PortfolioWrite,
  },
  props: ['guideId'],
  methods: {
    goToServiceDetail() {
      // `/user/${getuserId}`
      // this.$route.push({path: ''})
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
      this.isPWVisible = true;
    },
    closePW(){
      this.isPWVisible = false;
    },
    updateIntro() {
      const guideId = this.getUserId
      const config = {
        'intro': this.intro
      }
      this.$http.put(`/api/guide/${guideId}`, config)
        .then( res => {
          // console.log(res.data)
        })
    },
    GuideDataRequest() {
      this.$http.get(`/api/guide/${this.guideId}`)
      .then(res => {
        // console.log(res.data)

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
          this.guideServices = res.data
          // console.log(this.guideServices)
        })
    },
  },
  data (){
    return{
      guideName: '',
      rating: 1,
      isIUVisible: false,
      isETVisible: false,
      isPWVisible: false,
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
    })
  },
  mounted() {
    this.GuideDataRequest()
    this.getGuideService()
  },
}
</script>

<style>


</style>
