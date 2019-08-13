<template>
  <div class="guidepage" v-if="getIsLoggedIn">
    <div class="gs-profile-hero-curtain"></div>
    <div class="gs-profile-hero">
      <!-- Profile 영역 -->
      <v-layout mx-5 class="gs-profile-hero-left">

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
        <v-flex xs12 class="gs-guidename-box">
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
      </v-layout>
      <!-- 현재 수익 -->
        <div class="gs-money-made" v-if="guideId == getUserId">
          <div style="display: flex;">
            <span style="font-size: 2vw;">₩</span>
            <span style="font-size: 100%; font-weight: 1000;">{{separateDigit(profit)}}</span>
          </div>
          <div>
            <div style="font-size: 50%;">
              {{monthList[thisMonth]}}
            </div>
          </div>
        </div>
    </div>

    <v-container>
    <!-- tab 영역 -->
    <v-sheet color="white" class="tab-section" >
      <v-tabs slider-color="rgba(0, 151, 132, 1)" color="white" fixed-tabs>
        <v-tab key="Now" class="tab-name">Dashboard</v-tab>
        <v-tab key="ALL" class="tab-name" >ALL SERVICES</v-tab>
        <v-tab key="RESERVATION" class="tab-name"  v-if="guideId == getUserId">RESERVATION</v-tab>

        <!-- Dashboard -->
        <v-tab-item key="Now" color="yellow">
          <v-flex xs12 >
            <h1 class="gs-guidemypage-section-divider">현재 진행중인 상품</h1>
            <v-card flat v-for="(service, idx) in guideServices" v-if="service.canceled ? !service.canceled : true" :key="idx">
              <!-- <v-card-title><h2>Plan Title</h2></v-card-title> -->
              <v-layout mb-4 class="gs-mypage-service-box"

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
                        class="gs-mypage-service-content-bottom-reserve-btn gs-btn-delete"
                        style="margin-right: 10px;"
                        @click="deleteGuideService(service, idx)"
                      >
                        종료하기
                      </button>
                      <div :class="`dialog-delete-${idx} dialog-delete`">
                        <div class="dialog-card">
                          <h3>정말 삭제하시겠어요?</h3>
                          <p style="margin-top: 10px; font-size: 1vw;">상품명: {{service.title}}</p>
                        </div>
                      </div>
                      <button
                        v-if="getUserId == guideId"
                        class="gs-mypage-service-content-bottom-reserve-btn gs-btn-revise"
                        style="margin-right: 10px;"
                        @click="editGuideService(service)"
                      >
                        수정하기
                      </button>
                      <PortfolioEdit :getGuideService="getGuideService" :serviceInfoFuck="serviceInfoProp" v-if="isPWEditVisible" title="여행 상품 등록" @close="closePW"></PortfolioEdit>
                      <!-- 수정 시 Portfoliowrite 컴포넌트에 props 넘겨줍니다. -->
                      <!-- <PortfolioWrite class="`portfilo-write-${idx}`" :serviceInfo="guideServices[idx]" v-if="isPWEditVisible" title="여행 상품 등록" @close="closePW"></PortfolioWrite> -->
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
          <h1 class="gs-guidemypage-section-divider" v-if="guideId == getUserId">예약 일정</h1>
          <GuideCalendar :events="events" v-if="guideId == getUserId"></GuideCalendar>
        </v-tab-item>

        <!-- ALL -->
        <v-tab-item key="ALL">
          <!-- <v-btn v-if="getUserId == guideId"  @click="showPW" color="white">여행 상품 등록</v-btn> -->

          <div class="gs-ALL-container">
            <div class="gs-ALL-service-add-btn"
              @click="showPW"
              v-if="getUserId == guideId"
            >
              <div class="gs-ALL-service-add-btn-inside" >
                +
              </div>
              <PortfolioWrite :getGuideService="getGuideService" v-if="isPWVisible" title="여행 상품 등록" @close="closePW"></PortfolioWrite>

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
                <div v-if="service.canceled == true" class="gs-ALL-service-show-cancel">
                  종료된 상품입니다.
                </div>
              </div>
            </div>
          </div>
        </v-tab-item>

        <!-- Reservation -->
        <v-tab-item key="RESERVATION" class="reservation-box-mother">
          <!-- 예약 내역 -->
          <div class="reservation-box" v-for="(payment, idx) in paymentList" v-if="payment.userInfo" :key="idx">
            <div :class="`reservation-collapsible-box-${idx} reservation-collapsible-box`" @click="openCollapsible(idx)">
              <div class="reservation-user-payment-info-box">
                <div class="reservation-status-confirmed">
                  CONFIRMED
                </div>
                <!-- <div class="reservation-status-pending">
                  PENDING
                </div>
                <div class="reservation-status-cancelled">
                  CANCELELD
                </div> -->
                <div :class="`reserve-user-face-${idx} reserve-user-face`">
                  <!-- {{payment}} -->
                  <img :class="`reserve-user-face-img-${idx} reserve-user-face-img`" :src="payment.userInfo ? payment.userInfo.profileImageUrl : require('../assets/guideProfile.png') " alt="wegweg">
                </div>
                <div class="reserve-user-name">
                  {{payment.userInfo.nickname}}<br>
                  {{payment.userInfo.email}}<br>
                  
                </div>
                <div class="reserve-user-pick-service">
                  {{payment.payment.service.title}}<br>
                  예약날짜: {{payment.payment.created_at.slice(0, 10)}}
                </div>
                <div class="reserve-user-pick-price">
                  ₩ {{separateDigit(payment.payment.service.totalAmount)}}
                </div>
              </div>
              <div class="reverse-guide-to-push-down"></div>
            </div>
            <div :class="`res-collapsible-inside-${idx} res-collapsible-inside`">
              <div class="res-collap-inside-box">
                <div class="res-collap-inside-box-content">
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <h2 class="res-h2" style="margin-top: 0;">상품명</h2>
                      {{payment.payment.service.title}}
                    </div>
                    <button @click="cancelPayment(payment.payment._id)" class="reserve-cancel-btn">예약 취소하기</button>
                  </div>
                  <!-- <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-text>
                        <v-text-field label="예약 취소 사유를 입력해주세요."></v-text-field>
                        <small class="grey--text">* 상품 등록시 설정한 판매자의 환불 정책에 따라 예약 구매자에게 일정 금액이 환불됩니다.</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="#F44336" @click="dialog = false" style="color: white;">예약 취소 확정</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog> -->
                  <div>
                    <h2 class="res-h2">날짜</h2>
                    {{payment.payment.service.date}}
                  </div>
                  <div class="res-collap-inside-peoople">
                    <h2 class="res-h2">결제 금액</h2>
                    <table class="res-collap-table">
                      <tr>
                        <th>구분</th>
                        <th>1인당 가격</th>
                        <th>인원</th>
                        <th>금액</th>
                      </tr>
                      <tr>
                        <td>성인</td>
                        <td>{{payment.payment.service.adultprice}}</td>
                        <td>{{payment.payment.service.adult}}</td>
                        <td>{{payment.payment.service.adult ? separateDigit(payment.payment.service.adultprice * payment.payment.service.adult) : 0}}</td>
                      </tr>
                      <tr>
                        <td>아동</td>
                        <td>{{payment.payment.service.childprice}}</td>
                        <td>{{payment.payment.service.child}}</td>
                        <td>{{payment.payment.service.child ? separateDigit(payment.payment.service.childprice * payment.payment.service.child) : 0}}</td>
                      </tr>
                      <tr>
                        <td>유아</td>
                        <td>{{payment.payment.service.infantprice}}</td>
                        <td>{{payment.payment.service.infant}}</td>
                        <td>{{payment.payment.service.infant ? separateDigit(payment.payment.service.infantprice * payment.payment.service.infant) : 0}}</td>
                      </tr>
                      <tr>
                        <td>노인</td>
                        <td>{{payment.payment.service.seniorprice}}</td>
                        <td>{{payment.payment.service.senior}}</td>
                        <td>{{payment.payment.service.senior ? separateDigit(payment.payment.service.seniorprice * payment.payment.service.senior) : 0}}</td>
                      </tr>
                      <!-- <tr>
                        <td>{{payment.payment.service.adult ? payment.payment.service.adult : 0 }}명</td>
                        <td>{{payment.payment.service.child ? payment.payment.service.child : 0}}명</td>
                        <td>{{payment.payment.service.infant ? payment.payment.service.infant : 0}}명</td>
                        <td>{{payment.payment.service.senior ? payment.payment.service.senior : 0}}명</td>
                        <td>{{payment.payment.service.people}}명</td>
                      </tr> -->
                    </table>
                  </div>
                  <hr class="res-price-divider">
                  <div class="res-total-price">
                    <div style="font-size: 2vw; font-weight: 1000;">Total Price:</div>
                    <div style="font-size: 2vw; font-weight: 1000;">
                      ₩ {{separateDigit(payment.payment.service.totalAmount)}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 취소 내역 -->
          <div class="reservation-box" v-for="(payment, idx) in cancelList" v-if="payment.userInfo" :key="idx">
            <div :class="`reservation-collapsible-box-${idx} reservation-collapsible-box`" @click="openCollapsible(idx)">
              <div class="reservation-user-payment-info-box">
                <div class="reservation-status-cancelled">
                  CANCELLED
                </div>
                <!-- <div class="reservation-status-pending">
                  PENDING
                </div>
                <div class="reservation-status-cancelled">
                  CANCELELD
                </div> -->
                <div :class="`reserve-user-face-${idx} reserve-user-face`">
                  <!-- {{payment}} -->
                  <img :class="`reserve-user-face-img-${idx} reserve-user-face-img`" :src="payment.userInfo ? payment.userInfo.profileImageUrl : require('../assets/guideProfile.png') " alt="wegweg">
                </div>
                <div class="reserve-user-name">
                  {{payment.userInfo.nickname}}<br>
                  {{payment.userInfo.email}}<br>
                  <div class="reserve-chat" @click="openChat()">
                    <div class="reverse-chat-icon" style="width: 20%; height: 100%; margin: 0 0px; padding: 0 10px; border-right: 1px solid white; background: rgba(0, 50, 100, 1);">
                      <i class="far fa-comments"></i>
                    </div>
                    <div style="margin-left: 10px; display: flex; justify-content: center; align-items: center;">
                      메세지 보내기
                    </div>
                    </div>
                </div>
                <div class="reserve-user-pick-service">
                  {{payment.payment.service.title}}<br>
                  결제 취소 날짜: {{payment.payment.updated_at ? payment.payment.updated_at.slice(0, 10) : payment.payment.created_at.slice(0, 10) }}
                </div>
                <div class="reserve-user-pick-price">
                  ₩ {{separateDigit(payment.payment.service.totalAmount)}}
                </div>
              </div>
              <div class="reverse-guide-to-push-down"></div>
            </div>
            <div :class="`res-collapsible-inside-${idx} res-collapsible-inside`">
              <div class="res-collap-inside-box">
                <div class="res-collap-inside-box-content">
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <h2 class="res-h2" style="margin-top: 0;">상품명</h2>
                      {{payment.payment.service.title}}
                    </div>
                    <!-- <button @click="cancelPayment(payment.payment._id)" class="reserve-cancel-btn">예약 취소하기</button> -->
                  </div>
                  <div>
                    <h2 class="res-h2">날짜</h2>
                    {{payment.payment.service.date}}
                  </div>
                  <div class="res-collap-inside-peoople">
                    <h2 class="res-h2">결제 금액</h2>
                    <table class="res-collap-table">
                      <tr>
                        <th>구분</th>
                        <th>1인당 가격</th>
                        <th>인원</th>
                        <th>금액</th>
                      </tr>
                      <tr>
                        <td>성인</td>
                        <td>{{payment.payment.service.adultprice}}</td>
                        <td>{{payment.payment.service.adult}}</td>
                        <td>{{payment.payment.service.adult ? separateDigit(payment.payment.service.adultprice * payment.payment.service.adult) : 0}}</td>
                      </tr>
                      <tr>
                        <td>아동</td>
                        <td>{{payment.payment.service.childprice}}</td>
                        <td>{{payment.payment.service.child}}</td>
                        <td>{{payment.payment.service.child ? separateDigit(payment.payment.service.childprice * payment.payment.service.child) : 0}}</td>
                      </tr>
                      <tr>
                        <td>유아</td>
                        <td>{{payment.payment.service.infantprice}}</td>
                        <td>{{payment.payment.service.infant}}</td>
                        <td>{{payment.payment.service.infant ? separateDigit(payment.payment.service.infantprice * payment.payment.service.infant) : 0}}</td>
                      </tr>
                      <tr>
                        <td>노인</td>
                        <td>{{payment.payment.service.seniorprice}}</td>
                        <td>{{payment.payment.service.senior}}</td>
                        <td>{{payment.payment.service.senior ? separateDigit(payment.payment.service.seniorprice * payment.payment.service.senior) : 0}}</td>
                      </tr>
                      <!-- <tr>
                        <td>{{payment.payment.service.adult ? payment.payment.service.adult : 0 }}명</td>
                        <td>{{payment.payment.service.child ? payment.payment.service.child : 0}}명</td>
                        <td>{{payment.payment.service.infant ? payment.payment.service.infant : 0}}명</td>
                        <td>{{payment.payment.service.senior ? payment.payment.service.senior : 0}}명</td>
                        <td>{{payment.payment.service.people}}명</td>
                      </tr> -->
                    </table>
                  </div>
                  <hr class="res-price-divider">
                  <div class="res-total-price">
                    <div style="font-size: 2vw; font-weight: 1000;">Total Price:</div>
                    <div style="font-size: 2vw; font-weight: 1000;">
                      ₩ {{separateDigit(payment.payment.service.totalAmount)}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import PortfolioEdit from '../components/PortfolioEdit'
import Weather from '../components/Weather'
import GuideCalendar from '../components/GuideCalendar'
import './GuideMyPage.css'
import { mapGetters, mapState } from "vuex";
export default {
  name: 'GuideMypage',
  components:{
    UploadImg,
    UploadImgModal,
    PortfolioWrite,
    PortfolioEdit,
    Weather,
    GuideCalendar,
  },
  props: ['guideId'],
  methods: {
    separateDigit(profit) {
      let newProfit = ''
      if (profit.toString().length >= 3) {
        const oldProfit = profit.toString()

        for (let i = 0; i < oldProfit.length; i++) {

          newProfit += oldProfit[oldProfit.length - 1 - i]
          if ( (i +1 ) % 3 == 0 && i != oldProfit.length - 1) {
            newProfit += ','
          }

        }
      }
      let reversedProfit = newProfit.split("").reverse().join("")
      return reversedProfit
    },
    goToServiceDetail(guideServiceId) {
      // console.log(guideServiceId)
      // `/user/${getuserId}`
      this.$router.push({path: `/guideServiceDetailPage`, query: {serviceId : guideServiceId}})
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
          'profileImg': this.imgurl
        }
        console.log("config", config)
        const header = {
          'x-access-token': this.$getToken("BisionToken")
        }
        this.$http.put(`/api/guide/${guideId}`, config, {headers: header})
          .then( res => {
            console.log("프로필 이미지수정 완료", res.data)
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
      this.serviceInfoProp = {}
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
        // 'profileImg' : this.imgurl,
      }
      this.$http.put(`/api/guide/${guideId}`, config)
        .then( res => {
          console.log("인트로 수정 완료", res.data)
        })
    },
    GuideDataRequest() {
      this.$http.get(`/api/guide/${this.guideId}`)
      .then(res => {
        console.log("가이드데이터",res.data)

        const guide = res.data.guide
        if(guide.intro) this.intro = guide.intro
        this.guideName = guide.nickname
        this.imgurl = guide.profileImg
        console.log("img", guide.profileImg)
        // 가이드 평균 평점 구하기
        if (res.data.guide.starRatingList.length) {
          sum = res.data.guide.starRatingList.reduce(function(acc, each) { return acc + each})
          avg = sum / res.data.guide.starRatingList.length
          this.rating = avg
        }


      })
    },
    getGuideService() {
      this.$http.get(` /api/guideservice/findGSByGuideId/${this.guideId}`)
        .then( res => {
          console.log("guideService", res.data)
          this.guideServices = res.data.reverse()
        })
        .then( () => {
          for (let i = 0; i <= this.guideServices.length; i++) {
            this.dialogNew.push(false)
          }
          console.log(this.dialogNew)
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

    editGuideService(service) {
      this.serviceInfoProp = service
      const navBarZIndex = document.querySelector('#navbox')

      const footerZIndex = document.querySelector('#footer')
      footerZIndex.style.zIndex = 0;

      navBarZIndex.style.zIndex = 0;
      document.documentElement.style.overflow='hidden';
      document.body.scroll="no";

      this.serviceInfoProp = service
      this.isPWEditVisible = true;
      // this.showPWEdit()

    },
    deleteGuideService(service, idx) {

      const dialogDelete = document.querySelector(`.dialog-delete-${idx}`)
      dialogDelete.style.display = "flex"
      console.log(dialogDelete)

      this.dialog = true
      this.$http.put(`/api/guideservice/cancel/${service._id}`)
        .then( res => {
          console.log("상품 삭제완료", res.data)
          alert("삭제되었습니다!")
          this.getGuideService()
        })
    },

    // 가이드 결제 내역
    getPaymentsByGuide(guideId) {
      this.$http.get(`/api/paymentstore/findByGuide/${guideId}`)
        .then( res => {
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
          console.log(res.data)
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

          const cancelled = res.data.cancel
          const payments = res.data.payments
          payments.forEach( payment => {
            const temp = {}

            // this입니다. temp아닙니다!

            temp.title = payment.service.title
            temp.date  = payment.service.date
            temp.textColor = 'red'
            temp.backgroundColor = '#1e90ff'
            temp.serviceId   = payment._id   // 해당 결제 상품의 고유 id값
            this.events.push(temp)
            this.profit += parseInt(payment.service.totalAmount)

          })

          // 3자리 이상 수 일시에 쉼표로 구분해주기
          let newProfit = ''
          // if (this.profit.toString().length >= 3) {
          //   const oldProfit = this.profit.toString()

          //   for (let i = 0; i < oldProfit.length; i++) {

          //     newProfit += oldProfit[oldProfit.length - 1 - i]
          //     if ( (i +1 ) % 3 == 0 && i != oldProfit.length - 1) {
          //       newProfit += ','
          //     }

          //   }
          // }
          // let reversedProfit = newProfit.split("").reverse().join("")
          // this.profit = reversedProfit

          return res.data
        })
        .then( (data) => {
          console.log("userInfoooo", data)
          data.payments.forEach( payment => {
            const temp   = {}
            const userId = payment.user
            // console.log(userId)
            this.$http.get(`/api/user/search/${userId}`)
              .then( res => {
                temp.payment = payment
                temp.userInfo = res.data.user
                this.paymentList.push(temp)
                console.log('paymentList', this.paymentList)
              })

          })

          console.log("------------segklusehgklhu")
          console.log(this.cancelList)
          console.log("------------segklusehgklhu")

        })
        .catch( err=> {
          console.log(err)
        })
    },
    getGuideCancel(guideId) {
      this.$http.get(`/api/paymentstore/findByGuide/${guideId}`)
        .then( res => {
          res.data.cancel.forEach( cancel => {
            const temp = {}
              const userId = cancel.user
              this.$http.get(`/api/user/search/${userId}`)
                .then( res => {
                  console.log(res)
                  temp.payment = cancel
                  temp.userInfo = res.data.user
                  this.cancelList.push(temp)
                })
          })
        })
    },

    openCollapsible(idx) {
      const collapsible = document.querySelector(`.reservation-collapsible-box-${idx}`)
      const content = collapsible.nextElementSibling
      // console.log(collapsible)
      if (content.style.maxHeight) {
        content.style.maxHeight = null
      } else {
        content.style.maxHeight = content.scrollHeight + 'px'
      }

    },

    cancelPayment(serviceId) {
      this.$http.put(`/api/paymentstore/realcancel/${serviceId}`)
        .then( res => {
          location.reload()
          // this.getPaymentsByGuide(this.guideId)
          // this.getGuideCancel(this.guideId)
        })
    },

    hideComponent(event) {
        if (event.target.classList[1] == 'dialog-delete') {
          // const dialogDelete = document.querySelector(`.dialog-delete-${idx}`)
          const dialogDelete = document.querySelectorAll(`.dialog-delete`)
          
          dialogDelete.forEach( each => {
            each.style.display = "none"
          })

        }
    },
    openChat() {
      this.$router.push({path: '/room'})
    },
  },
  data (){
    return{

      // 결제 취소 관련
      dialogNew: new Array(),

      // 결제 내역
      paymentList: [],
      cancelList: [],

      // 이번 달 수익 관련 변수
      profit: 0,
      thisMonth: new Date().getMonth(),
      monthList: ['January', 'February', 'March', 'April', 'March', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

      // calendar로 넘겨줄 events 리스트
      events: [],

      // 가이드 상품 수정시 넘겨줄 props 객체
      serviceInfoProp : { 'fuck' : 'fuck you jmotherfucker'},

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
    }),
    dialogNewCatch: function() {
      return this.dialogNew
    },
  },
  mounted() {
    this.GuideDataRequest()
    this.closeFooter()
    this.getGuideService()
    this.blurHeader()
    this.getPaymentsByGuide(this.guideId)
    this.getGuideCancel(this.guideId)

    window.addEventListener('click', this.hideComponent)
  },
  updated() {
    // this.getPaymentsByGuide(this.guideId)
    // this.getGuideCancel(this.guideId)
  },
}
</script>

<style>


</style>
