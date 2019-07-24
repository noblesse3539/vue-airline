<template>
  <div class="container mypage-container">
    <router-link to="/" > 홈으로 가기</router-link>
    
    <!-- 프로필 섹션 -->
    <!-- <h1 class="user-title">&nbsp;&nbsp;&nbsp;회원정보</h1> -->
    <div class="user-profileinfo">
      <div class="user-imagebox">
        <div @click="openImgModal" class="user-image" :style="{ 'background' : 'url(' + userImage + ')'}"></div>
        <p class="user-image__modifier" @click="openImgModal">사진 수정하기</p>
      </div>
      <div class="user-infobox">
        <p style="font-size: 3rem; font-weight: 1000; margin-bottom: 0.5rem;">안녕하세요, 이빵글입니다.</p>
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
    
    <!-- 이용했던 가이드 -->
    <h2 style="margin-top: 48px; margin-bottom: 24px;">내가 이용했던 여행 가이드</h2>
    <GuideList :load-more="true"></GuideList>

    <!-- 내가 이용했던 가이드 상품 -->
    <h2 style="margin-bottom: 24px;">내가 이용했던 여행 상품</h2>

    <!-- Swiper -->
    <swiper 
      :options="swiperOption" 
      ref="mySwiper" 
      @someSwiperEvent="callback"
    >
      <!-- slides -->
      <swiper-slide
        v-for=" (guideService, id) in userGuideServices"
        :key=id
      >
        <img class="myTourExperienceImg" :src="guideService.mainImg" alt="myTourExperienceImg">
        <div class="myTourExperience-description">
          <p>{{guideService.city_kor[1]}} {{guideService.city_kor[0]}}</p>
          <p style="font-size: 1.25rem;">{{guideService.user.username}}</p>
          <p style="font-size: 1.25rem;">{{guideService.fromDate.slice(0, 10)}}</p>
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
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>

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
    mounted() {
      // this.closeHeader()
      this.swiper.slideTo(3, 1000, false)
      this.getUserInfo()
      // this.addGuideServiceToUser()
    },
    beforeDestroy() {
      this.openHeader()
    },
    data: function () {
      return {
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
        userImage: 'https://i.pinimg.com/736x/ac/a0/2a/aca02a058d78c3eb348a1a842a1a1522.jpg',
        isImgModalOpen: false,
        isUserInfoOpen: true,
        
        userName : "",
        userIntro: "안녕하세요, 여행가고 싶어요.",
        userLanguage: ["한국어", "영어", "프랑스어", "스페인어"],
        userGuideServices: [],

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
      }
    },
    methods: {
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
            this.userInfo = res.data.userInfo
            console.log(this.userInfo)
            this.userName = this.userInfo.username
            this.userIntro = this.userInfo.intro
            this.userLanguage = this.userInfo.languages
            this.userImage = this.userInfo.profileImg
            this.userGuideServices  = this.userInfo.UsedGuideServices
            console.log(this.userGuideServices)
          })
          .catch( err => {
            console.log(err)
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
        this.$http.post('/api/user/minkyo/usedguideservices/5d37e5ed1b38180f50acbb44', {}, config)
          .then( res => {
              console.log(res.data)
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
