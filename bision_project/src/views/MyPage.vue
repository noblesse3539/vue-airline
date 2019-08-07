<template>
  <div class="mypage-container">
    <router-link to="/" > 홈으로 가기</router-link>

    <!-- 프로필 섹션 -->
    <!-- <h1 class="user-title">&nbsp;&nbsp;&nbsp;회원정보</h1> -->
    <div class="user-profileinfo">
      <div class="user-imagebox">
        <div @click="openImgModal" class="user-image" :style="{ 'background' : 'url(' + userImage + ')'}"></div>
        <p class="user-image__modifier" @click="openImgModal">사진 수정하기</p>
      </div>
      <div class="user-infobox">
        <p style="font-size: 3rem; font-weight: 1000; margin-bottom: 0.5rem;">안녕하세요, {{userName}}입니다.</p>
        <p class="user-metainfo">
          가입일: 2019 · <span class="user-metainfo__modifier" @click="showUserInfoModifier">회원정보 수정하기</span>
        </p>

        <!-- 사용자 정보 -->
        <div class="user-info-display" v-if="isUserInfoOpen">
          <p class="user-quote-symbol">“</p>
          <p class="user-description">{{userIntro}}</p>
          <div class="user-line__section-divider"><div class="divider"></div></div>
          <p class="user-langauge">
            <i class="fas fa-language"></i>
              구사 언어:
              <span v-for=" (language, idx) in userLanguage" :key="idx">
                {{language}}
              </span>
          </p>
        </div>

        <!-- 사용자 정보 수정 섹션 -->
        <div class="user-info__modifier" @keydown.enter="updateUserInfo" v-else>
          <div class="user-intro-box">
            <label for="user-intro">소개</label>
            <input type="text" id="userIntro"  v-model="userIntro" autofocus>
          </div>
          <div class="user-language-box">
            <label for="userLanguage">구사 언어</label>
            <input type="text" id="userLangauge" v-model="userLanguage">
          </div>
          <div class="user-info-button-box">
            <button @click="updateUserInfo">수정하기</button>
            <button @click="closeUserInfoModifier">취소</button>
          </div>
        </div>

      </div>
    </div>

    <UploadImgModal v-if="isImgModalOpen" @close="close"></UploadImgModal>
    <!-- <Profile class="profileFillingSection"/> -->

    <!-- 현재 예약한 상품 -->
    <h2 style="margin-top: 48px; margin-bottom: 24px;">현재 예약한 상품</h2>
    <!-- <GuideList :load-more="true" :userGuideServices="userGuideServices"></GuideList> -->
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
    >
      <!-- slides -->
      <swiper-slide class="myProduct"
        v-for="(guideService, id) in currentGuideServices"
        :key="id"
      >
        <img class="myTourExperienceImg" :src="guideService.service.mainImg" alt="myTourExperienceImg">
        <div class="myTourExperience-description">
          <p>{{guideService.service.city_kor[1]}} {{guideService.service.city_kor[0]}}</p>
          <p style="font-size: 1.25rem;">{{guideService.service.title}}</p>
          <p style="font-size: 1.25rem;">{{guideService.service.totalAmount}}</p>
          <p style="font-size: 1.25rem;">{{id}}</p>
          <!-- <p style="font-size: 1.25rem;">{{guideService.fromDate.slice(0, 10)}}</p> -->

<!---------------------------------------------- 후기 작성 안했으면 조건 추가하기 -->
          <div class="RWButtonOver">
            <div class="RWButton" @click="showRW(id)">후기 작성 하기</div>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev">
        <svg viewBox="0 0 18 18" role="img" aria-label="이전" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <svg viewBox="0 0 18 18" role="img" aria-label="다음" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
      </div>
    </swiper>

    <!-- 내가 이용했던 가이드 상품 -->
    <h2 style="margin-bottom: 24px;">내가 이용했던 여행 상품</h2>

    <!-- Swiper -->
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
    >
      <!-- slides -->
      <swiper-slide class="myProduct"
        v-for="(guideService, id) in userGuideServices"
        :key="id"
      >
        <img class="myTourExperienceImg" :src="guideService.service.mainImg" alt="myTourExperienceImg">
        <div class="myTourExperience-description">
          <p>{{guideService.service.city_kor[1]}} {{guideService.service.city_kor[0]}}</p>
          <p style="font-size: 1.25rem;">{{guideService.service.title}}</p>
          <p style="font-size: 1.25rem;">{{guideService.service.totalAmount}}</p>
          <p style="font-size: 1.25rem;">{{id}}</p>
          <!-- <p style="font-size: 1.25rem;">{{guideService.fromDate.slice(0, 10)}}</p> -->

<!---------------------------------------------- 후기 작성 안했으면 조건 추가하기 -->
          <div class="RWButtonOver">
            <div class="RWButton" @click="showRW(id)">후기 작성 하기</div>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev">
        <svg viewBox="0 0 18 18" role="img" aria-label="이전" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <svg viewBox="0 0 18 18" role="img" aria-label="다음" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>
      </div>
    </swiper>
    <div v-if="isRWVisible" class="HR__Modal">
      <div class="HR__ModalContent">
        <div class="HR__ModalHeader">
          <div>여행은 즐거우셨나요?</div>
          <i @click="closeRW" style="cursor:pointer;" class="fas fa-times"></i>
        </div>
        <div class="HR__ModalBody">
          <div class="rate">
            <div>만족도 &nbsp; : &nbsp; </div>
            <v-rating  v-model="rating"  color="yellow darken-3"  background-color="grey lighten-2"
              empty-icon="$vuetify.icons.ratingFull"  half-increments hover></v-rating>&nbsp;( {{this.rating}} )
          </div>
         <div class="RW__Title">한줄평 &nbsp; : &nbsp; <input type="text" placeholder="한줄로 표현해주세요." v-model="subcomment"></div>
          <textarea placeholder="후기를 작성해주세요."  v-model="comment" class="RW__Input" type="text" name="review"></textarea>
        </div>
        <div class="HR__ModalAction">
          <div class="clear" @click="clearReview">초기화</div>
          <div class="submit" @click="submitReview">확인</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Profile from '../components/Profile'
  import GuideList from '../components/GuideList'
  import UploadImgModal from '../components/UploadImgModal'
  import './MyPage.css'
  import { mapGetters, mapState } from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'MyPage',
    components: {
  		Profile,
      GuideList,
      UploadImgModal,
    },
    created() {
    },
    mounted() {
      this.getUserInfo()
      // this.closeHeader()
      this.swiper.slideTo(3, 1000, false)
      // this.deleteGuideServiceToUser()
      // this.addGuideServiceToUser()
      // console.log(this.userGuideServices)
    },
    beforeDestroy() {
      this.openHeader()
    },
    data: function () {
      return {
        guideServices : [],
        paymentId:'',
        review: [],
        guideServiceId : '',
        subcomment:'',
        comment:'',
        rating: 3,
        isRWButtonVisible: false,
        isRWVisible: false,
        items: [
          {
            src: 'https://new-image.withvolo.com/travel/423019/6-673h2it7pauB3D0naoffsjGMM=/0x0:900x900/809x/45e57a94c3a3f93db7ea5c6301aabc5d/76fb18f3-64cf-45df-9382-30c8afd42a97-cac8cd93c784d871aa3d1cac20ea67ea0a422222.jpg'
          },
          {
            src: 'https://new-image.withvolo.com/travel/423019/l-_cOftnXSWPTzvnGKJVBXjen88=/0x0:900x900/809x/45e57a94c3a3f93db7ea5c6301aabc5d/5b96ea81-45c4-4265-aa6c-33ca173a711a-9ec2510a61c67d5f60485669ff630386b4c0f820.jpg'
          },
          {
            src: 'https://new-image.withvolo.com/travel/423019/ksl1Sgn9cRQZr8CrPPBAIRX43lI=/0x0:900x900/809x/9d6947c4ad0d409eb70ee1ad94174f47/910b9b7a-a68a-4620-a09b-65f7aae8820e-0a8dfe91312ab12bd33f1564162a770d248e3149.jpg'
          },
          {
            src: 'https://new-image.withvolo.com/travel/423019/foDky-GCJFSv4VIQIRw2uth9V1s=/0x0:900x900/809x/9d6947c4ad0d409eb70ee1ad94174f47/74f1457e-5970-42f6-9479-eabf1063dd74-1961afc650a9073e05adeae3311e6e9716b24e07.jpg'
          }
        ],
        userImage: '',
        isImgModalOpen: false,
        isUserInfoOpen: true,
        userId : '',
        userName : "",
        userIntro: "",
        userLanguage: [],
        userGuideServices: [],
        currentGuideServices: [],
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 20,
          // freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        },
        isImgModalOpen : false,
        userInfo: {}, // username email profileImg registeredAt firstName lastName age gender languages intro UsedGuides UsedGuideServices

        // 수정 필 !!!!!!!!!!!!!!!!!!!!!!
        myTourExperience: ["http://www.dream-wallpaper.com/free-wallpaper/travel-wallpaper/jeju-island--korea-scenery-wallpaper/1920x1200/free-wallpaper-13.jpg", "https://i.pinimg.com/originals/23/2e/f2/232ef249a037d9424a0e67a41eba8200.jpg", "https://i.pinimg.com/originals/98/e4/4e/98e44e7ce7245678d79e29e1075746a1.jpg", "http://luxurytraveler.s3.amazonaws.com/wp-content/uploads/2016/02/21144831/marina_bay_sands_singapore_view-pool.jpg"],

        // 유저 결제 관련 데이터
      }
    },
    methods: {
      clearReview() {
        console.log(this.userGuideServices)
        this.subcomment=''
        this.comment=''
        this.rating = 0
      },
      submitReview(){
        var review = {
          'user' : this.userId,
          'title' : this.comment,
          'content' : this.subcomment,
          'rating' : this.rating,
        }
        console.log(this.userId)
        console.log(this.guideServiceId)
        console.log(review)
        this.$http.post('/api/review/create/'+this.guideServiceId+'/'+this.paymentId, review)
         .then( res => {
             console.log("성공", res.data)
             alert('리뷰가 작성되었습니다.')
             this.closeRW()
         })
         .catch( err => {
           console.log(err)
           alert('잠시 후 다시 시도해주세요.')
           this.closeRW()
         })
      },
      showRW(idx) {
        const navBarZIndex = document.querySelector('#navbox')
        const footerZIndex = document.querySelector('#footer')
        footerZIndex.style.zIndex = 0
        navBarZIndex.style.zIndex = 0
        document.documentElement.style.overflow='hidden'
        document.body.scroll="no";
        this.isRWVisible = true;
        this.guideServiceId = this.guideServices[idx]
        this.paymentId=this.userGuideServices[idx]._id
      },
      closeRW() {
        this.guideServiceId = ''
        this.rating = 3
        this.comment=''
        this.subcomment=''
        document.documentElement.style.overflow='scroll';
        document.body.scroll="yes";
        const navBarZIndex = document.querySelector('#navbox')
        const footerZIndex = document.querySelector('#footer')
        navBarZIndex.style.zIndex = 1000;
        footerZIndex.style.zIndex = 1000;
        this.isRWVisible = false;
      },
      closeHeader: function() {
        this.$store.commit("closeHeader")
      },
      openHeader: function() {
        this.$store.commit("openHeader")
      },
      close: function(imgUrl) {
        this.isImgModalOpen = false
        if(imgUrl) {
          this.userImage = imgUrl
          this.updateUserInfo()
        }
      },
      openImgModal: function() {
        this.isImgModalOpen = true
      },
      revisedUserInfo: function() {

      },

      // 유저 정보 수정 섹션 관련 메서드
      showUserInfoModifier: function() {
        this.isUserInfoOpen = false

      },
      closeUserInfoModifier: function() {
        this.isUserInfoOpen = true
      },

      getUserInfo: function() {
        const token= this.$getToken('BisionToken')
        const config = {
            'headers': {'x-access-token': token}
        }
        this.$http.get('/api/user/mypage', config)
          .then( res => {
            console.log(1, res)
            // for (var i = 0; i < res.data.options.length; i++) {
            //   this.guideServices.push(res.data.options[i][0].guideservice)
            // }
            console.log(this.guideServices);
            this.userId = res.data.userInfo._id
            
            this.currentGuideServices = res.data.paymentRecords.map( record => {
              const today = new Date()
              // record.service.data <= 
            })

            this.userGuideServices = res.data.paymentRecords
            console.log(2, this.userGuideServices)
            this.userInfo = res.data.userInfo
            // console.log(this.userInfo)
            this.userName = this.userInfo.username
            this.userIntro = this.userInfo.intro
            this.userLanguage = this.userInfo.languages
            this.userImage = this.userInfo.profileImageUrl

            console.log("==============================")
            console.log(this.userName)
            console.log("==============================")

          }).catch( err => {
              console.log(err)
          }).then( () => {
              this.$http.get('/api/review/findReviewByUser/'+this.userId)
              .then( res => {
                console.log(3, res)
              })
            // this.userGuideServices  = this.userInfo.UsedGuideServices
          })
      },

      updateUserInfo: function() {
        // api/user/:username
        this.isUserInfoOpen = true
        const token= this.$getToken('BisionToken')
        const config = {
            'headers': {'x-access-token': token},
        }
        const data = {
            'intro' : this.userIntro,
            'languages' : this.userLanguage,
            'profileImg' : this.userImage,
        }
        this.$http.put('/api/user/username', data, config)
          .then( res => {
            // console.log(res)
          })
          .catch( err => {
            console.log(err)
          })
      },

      addGuideServiceToUser: function() {
        // api/user/opalcat1013/usedguideservices/5d37e5aa1b38180f50acbb43
        // opalcat1013 == 유저 아이디
        const token= this.$getToken('BisionToken')
        const config = {
            'headers': {'x-access-token': token},
        }
        this.$http.post('/api/user/minkyo/usedguideservices/5d37e5aa1b38180f50acbb43', {}, config)
          .then( res => {
              // console.log(res.data)
          })
      },

      deleteGuideServiceToUser: function() {
        // api/user/opalcat1013/usedguideservices/5d37e5aa1b38180f50acbb43
        // opalcat1013 == 유저 아이디
        const token= this.$getToken('BisionToken')
        const config = {
            'headers': {'x-access-token': token},
        }
        this.$http.delete('/api/user/minkyo/usedguideservices/5d37e5ed1b38180f50acbb44', config)
          .then( res => {
              console.log(res.data)
          })
          .catch( err => {
            console.log(err)
          })
      },

    },
    computed: {
      ...mapGetters({
          getIsHeaderOpen : 'getIsHeaderOpen'
      }),
      ...mapState({
          isHeaderOpen : state => state.Header.isHeaderOpen,
      }),
      swiper() {
        return this.$refs.mySwiper.swiper
      },
    },
  }
</script>
