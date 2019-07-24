<template>
  <div class="container">
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
        <p class="user-metainfo" @click="revisdeUserInfo">
          가입일: 2019 · <span class="user-metainfo__modifier" @click="showUserInfoModifier">회원정보 수정하기</span>
        </p>

        <!-- 사용자 정보 -->
        <div class="user-info-display" v-if="isUserInfoOpen">
          <p class="user-quote-symbol">“</p>
          <p class="user-description">{{userIntro}}</p>
          <div class="user-line__section-divider"><div class="divider"></div></div>
          <p class="user-langauge"><i class="fas fa-language"></i> 구사 언어: {{userLanguage}}</p>
        </div>
        
        <!-- 사용자 정보 수정 섹션 -->
        <div class="user-info__modifier" v-else>
          <div class="user-intro-box">
            <label for="user-intro">소개</label>
            <input type="text" id="userIntro"  v-model="userIntro" autofocus>
          </div>
          <div class="user-language-box">
            <label for="userLanguage">사용 언어</label>
            <input type="text" id="userLangauge" v-model="userLanguage">  
          </div>
          <div class="user-info-button-box">
            <button @click="closeUserInfoModifier">수정하기</button>
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
    <div class="container" style="height: 700px;">
      <v-carousel hide-delimiters style="max-width: 100%; margin: auto;">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          
        ></v-carousel-item>
      </v-carousel>
    </div>

    <!-- Swiper -->
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
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
        userLanguage: "한국어, 영어, 프랑스어, 스페인어",
        swiperOption: {
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
          },
        },
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
      revisdeUserInfo: function() {
        
      },

      // 유저 정보 수정 섹션 관련 메서드
      showUserInfoModifier: function() {
        this.isUserInfoOpen = false  
        
      },
      closeUserInfoModifier: function() {
        this.isUserInfoOpen = true
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
