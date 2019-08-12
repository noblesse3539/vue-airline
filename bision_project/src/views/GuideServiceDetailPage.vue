<template>
  <div class="GS-detail-page">
    <div class="GS-travel-route">
      <p>
        {{city_kor[0]}} in {{nation_kor}}
      </p>
      <img :src="nationFlag" width="60" height="60"/>
    </div>
    <div class="GS-hero"></div>
    <section class="GS-body-1">
      <div class="GS-body-left">
        <div class="GS-guide-detail-content">

          <!-- 가이드 유저 정보 -->
          <div class="GS-guide-detail-guideDetail">
            <div class="GS-guide-detail-guideImg">
              <router-link :to="`${'/guide/'+guideId}`">
              <img class="GS-guide-detail-guideImg-image" :src="guideInfo.guideImg" alt="Our guide's beautiful face!">
              </router-link>
            </div>
            <div class="GS-guide-detail-guideName">
              <p style="margin:0; font-size: 1rem; color: rgba(0, 0, 0, 0.54); letter-spacing: 0.05em;">WRITTEN BY</p>
              <span style="text-transform: capitalize;">{{guideInfo.guideName}}</span>
              <v-btn @click="chat">메시지보내기</v-btn>
            </div>
          </div>

          <div class="GS-guide-detail-title">
            <div style="margin-right: 10px;">{{title}}</div>

            <!-- 좋아요 기능 추후 구현 -->
            <i class="far fa-heart"></i>
            <!-- <i class="fas fa-heart guide-list-page-like-btn-active"></i> -->
          </div>

          <div class="GS-guide-detail-option">
            <div class="GS-guide-duration GS-guide-detail-icon">
              <i class="far fa-clock"></i>
              <span style="margin-left: 10px;">소요시간 : {{duration}}</span>
            </div>
            <div class="GS-guide-language GS-guide-detail-icon">
              <i class="fas fa-language"></i>
              <span style="margin-left: 10px;">영어/프랑스어 가이드 언어</span>
            </div>
            <div class="GS-guide-refund GS-guide-detail-icon">
              <i class="fas fa-coins"></i>
              <span style="margin-left: 10px;">환불 규정</span>
            </div>
          </div>
          <div class="GS-guide-detail-description">
            <div class="GS-guide-detail-simple-description">
              <span>{{desc}}</span>
            </div>
            <div class="GS-guide-detail-best-review">
              <h3>최고 평점 이용후기</h3>
              <a class="see-more-review" href="#GS-service-intro-title">
                리뷰 더보기
                <i class="fas fa-sign-in-alt"></i>
              </a>
            </div>
            <div class="GS-guide-detail-best-review-content">
              <div
                class="GS-guide-detail-best-review-user-img"
                style="background: url('https://i.imgur.com/gB9Ooj4.jpg')"
              ></div>
              <div class="GS-guide-detail-best-review-right">
                <div class="text-center GS-guide-detail-best-review-right-inside">
                  <v-rating v-model="rating" dense size="17.4"></v-rating>
                  <div class="userinfo-used-this-service">
                    <p class="userinfo-used-this-service-name">이빵글</p>
                    <p class="userinfo-used-this-service-date">이용날짜</p>
                  </div>
                </div>
                <div class="user-comment">
                  어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                  어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                  어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                  어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘 어쩌구 저쩌구 로렘 로렘
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 결제용 following side-bar -->
      <div class="GS-body-right">
        <div class="GS-payment-box">
          <div class="GS-payment-price">
            KRW
            <span style="font-size: 3rem;">{{priceTransfer(serviceInfo.totalAmount)}}</span>
          </div>
          <div class="GS-payment-choose-option GS-payment-choose-option-pay" style="display: none">
              <button class="GS-payment-decision-btn" @click="goToPayment">결제하기</button>
            <!-- <PayBtn class="GS-payment-decision-btn" v-bind="serviceInfo">
            </PayBtn> -->
          </div>
          <div class="GS-payment-choose-option GS-payment-choose-option-reserve" v-if="isPaymentReady == false">
            <button class="GS-payment-decision-btn" @click="goToChooseOptions">예약하기</button>
          </div>
          <div class="GS-payment-detail-info">
            <div class="GS-payment-detail-info-each">
              <i class="fas fa-check-double" style="margin-right: 2px;"></i>
              예약 즉시 이메일로 예약 정보가 발송됩니다!
            </div>
            <div class="GS-payment-detail-info-each">
              <i class="far fa-check-circle" style="margin-right: 2px;"></i>
              결제 전 환불 규정을 다시 한 번 확인해주세요!
            </div>
            <div class="GS-payment-detail-info-each">
              <i class="far fa-check-circle" style="margin-right: 2px;"></i>
              선택한 상품 옵션이 정확한지 확인해주세요!
            </div>
          </div>
          <div class="GS-payment-current-info">
            <div class="GS-payment-current-info-each">
              <i class="fas fa-user-check"></i> 100명의 고객님이 예약한 상품입니다.
            </div>
            <div class="GS-payment-current-info-each">
              평점:
              <v-rating class="serviceRating" v-model="rating" dense size="17.4" readonly></v-rating>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 상품 결제 전 옵션 고르기-->
    <section class="GS-body-2">
      <div class="GS-body-2-left" >
        <h3 class="GS-body-2-left-title" style="font-size: 2rem; margin-bottom: 15px;">옵션 선택하기</h3>
        <!-- <div @click="openCalender" class="result-body__search-by-date GS-body__search-by-date">
          <span class="result-body__search-by-date-icon" >
            <i class="far fa-calendar-check"></i>
          </span>
          <input placeholder="날짜 선택" disabled class="result-body__search-by-date-input" type="text" />
          <div v-if="isCalenderOpen" class="GS-date-picker" @click="pushLeavingDate()">
            <v-date-picker :min="minDate" locale="ko-KR"  v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
          </div>
        </div> -->
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="i in leavingDates.length" :key="i">
            <div class="result-body__search-by-date" style="margin-right: 1rem; width: 150px; font-size: 15px; text-align: center; display: grid; grid-template-columns: 80% 20%; border: 1px solid #45CE30; padding-top: 8px;" v-if="leavingDates">
              {{leavingDates[i-1]}}
              <i class="fas fa-times" style="color: grey; margin-top: 4px;" @click="deleteLeavingDate(i-1)"></i>
            </div>
          </div>
        </div>
        <div class="GS-option-box" v-if="options">
          <!-- 각 상품에 대한 옵션 리스트 v-for로 출력할 것 -->
          <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
          <div v-for="(option, idx) in options" :key="idx" class="GS-individual-option GS-individual-option-1">
            <div class="GS-individual-option-title-box">
              <div>
                <div style="display: flex; font-size: 20px; padding-bottom: 20px;">
                  <div>{{option.title}}</div>
                </div>
                <div style="display: flex; padding-bottom: 5px;">
                  <i class="fas fa-map-pin" style="padding-right: 10px;"></i>선택 가능 요일 :
                  <div v-for="i in option.dayOfWeek.length">
                    <div style="padding-left: 5px;">{{option.dayOfWeek[i-1]}}</div>
                  </div>
                </div>
                <div style="display: flex; padding-bottom: 5px;">
                  <i class="fas fa-map-pin" style="padding-right: 10px;"></i>시간대 :
                  <div v-for="i in option.times.length" v-if="option.times.length > 0">
                    <div style="padding-left: 5px;">{{option.times[i-1]}}</div>
                  </div>
                  <div v-if="option.times.length == 0">구분 없음</div>
                </div>
                <div style="display: flex; padding-bottom: 5px;">
                  <i class="fas fa-map-pin" style="padding-right: 10px;"></i>가격 :
                  <div style="padding-left: 5px; padding-right: 5px;">{{priceTransfer(option.adult.cost)}} KRW</div>
                  <div style="color: #dcdcdc;">(성인 기준)</div>
                </div>
              </div>

              <div class="GS-individual-option-loadmoreBtn GS-individual-option-loadmoreBtn-1">
                <button
                  class="GS-individual-option-selectBtn GS-individual-option-selectBtn-1"
                  @click="openOptionSelectingModal(`.GS-individual-option-1`, idx)"
                >
                  선택
                </button>
              </div>
              <!-- <div class="GS-individual-option-title">{{option.title.slice(0, 25)}}...</div> -->
              <!-- <div class="GS-individual-top-price">
                <span style="font-size: 1rem; margin-right: 5px;">KRW</span>
                <span>{{cost}}</span>
              </div> -->
            </div>
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <!-- <div class="GS-individual-option-loadmoreBtn GS-individual-option-loadmoreBtn-1">

              <button
                class="GS-individual-option-selectBtn GS-individual-option-selectBtn-1"
                @click="openOptionSelectingModal(`.GS-individual-option-1`)"
              >
                선택
              </button>
            </div> -->
            <!-- active on loadmore -->
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <!-- active on loadmore -->
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <div class="GS-individual-option-detail-loadmore
                        GS-individual-option-detail-loadmore-1"
                        style="display: none;">

              <div class="GS-individual-options-detail">
                <div @click="openCalender" class="result-body__search-by-date GS-body__search-by-date">
                  <span class="result-body__search-by-date-icon">
                    <i class="far fa-calendar-check"></i>

                  </span>
                  <input v-if="leavingDate" :placeholder="leavingDate" disabled class="result-body__search-by-date-input" type="text" />
                  <input v-else placeholder="날짜 선택" disabled class="result-body__search-by-date-input" type="text" />
                  <div v-if="isCalenderOpen" class="GS-date-picker">
                    <v-date-picker :allowed-dates="option.allowedDatesFunc" :min="minDate" locale="ko-KR"  v-model="leavingDate" :reactive="reactive" color="#45CE30"></v-date-picker>
                  </div>
                </div>

                <div class="GS-individual-option-detail-option-select" v-if="option.length > 0">
                    <v-select
                      v-model="select"
                      :items="option.times"
                      item-text="state"
                      item-value="abbr"
                      label="시간대 선택"
                      persistent-hint
                      return-object
                      single-line
                    >
                    </v-select>
                </div>

                <div class="GS-individual-option-detail-adult-select">
                  <!-- 성인 -->
                  <div class="num-of-customers" style="min-width: 200px;">
                    <div class="num-of-customers__increaseBtn">
                      성인
                      <v-btn @click="decreasePeople('adult')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-if="serviceInfo.adult == 0" disabled>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn @click="decreasePeople('adult')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-else>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </div>
                    <div class="num-of-customers-count"> {{serviceInfo.adult}} </div>
                    <div class="num-of-customers__decreaseBtn">
                      <v-btn @click="increasePeople('adult')" fab dark color="rgba(47, 230, 62, 1)" small>
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="Gs-individual-price">
                    <p style="margin: 0;">
                      KRW
                      <span>{{priceTransfer(option.adult.cost)}} / 한 명</span>
                    </p>
                  </div>
                </div>

                <div class="GS-individual-option-detail-adult-select" v-if="option.child.maxAge != 0">
                  <!-- 아동 -->
                  <div class="num-of-customers" style="min-width: 200px;">
                    <div class="num-of-customers__increaseBtn">
                      아동
                      <v-btn @click="decreasePeople('child')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-if="serviceInfo.child == 0" disabled>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn @click="decreasePeople('child')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-else>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </div>
                    <div class="num-of-customers-count"> {{serviceInfo.child}} </div>
                    <div class="num-of-customers__decreaseBtn">
                      <v-btn @click="increasePeople('child')" fab dark color="rgba(47, 230, 62, 1)" small>
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="Gs-individual-price">
                    <p style="margin: 0;">
                      KRW
                      <span>{{priceTransfer(option.child.cost)}} / 한 명</span>
                    </p>
                  </div>
                </div>

                <div class="GS-individual-option-detail-adult-select" v-if="option.infant.maxAge != 0">
                  <!-- 유아 -->
                  <div class="num-of-customers" style="min-width: 200px;">
                    <div class="num-of-customers__increaseBtn">
                      유아
                      <v-btn @click="decreasePeople('infant')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-if="serviceInfo.infant == 0" disabled>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn @click="decreasePeople('infant')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-else>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </div>
                    <div class="num-of-customers-count"> {{serviceInfo.infant}} </div>
                    <div class="num-of-customers__decreaseBtn">
                      <v-btn @click="increasePeople('infant')" fab dark color="rgba(47, 230, 62, 1)" small>
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="Gs-individual-price">
                    <p style="margin: 0;">
                      KRW
                      <span>{{priceTransfer(option.infant.cost)}} / 한 명</span>
                    </p>
                  </div>
                </div>

                <div class="GS-individual-option-detail-adult-select" v-if="option.senior.maxAge != 0">
                  <!-- 유아 -->
                  <div class="num-of-customers" style="min-width: 200px;">
                    <div class="num-of-customers__increaseBtn">
                      60세 이상
                      <v-btn @click="decreasePeople('senior')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-if="serviceInfo.senior == 0" disabled>
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-btn @click="decreasePeople('senior')" fab  dark color="rgba(47, 230, 62, 1)" small outlined v-else>
                        <v-icon dark style="margin: 0;">remove</v-icon>
                      </v-btn>
                    </div>
                    <div class="num-of-customers-count"> {{serviceInfo.senior}} </div>
                    <div class="num-of-customers__decreaseBtn">
                      <v-btn @click="increasePeople('senior')" fab dark color="rgba(47, 230, 62, 1)" small style="margin: 0px !important;">
                        <v-icon dark class="fix-icon">add</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="Gs-individual-price">
                    <p style="margin: 0;">
                      KRW
                      <span>{{priceTransfer(option.senior.cost)}} / 한 명</span>
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 상품 소개 -->
    <section class="GS-body-3">
      <h3 class="GS-service-intro-title">상품 소개</h3>
      <div class="GS-service-user-content" v-html="detail"></div>
    </section>

    <section class="GS-body-3">
      <h3 class="GS-service-intro-title">환불 규정</h3>
      <div class="GS-service-user-refund">
        <div>
          <div class="GS-service-user-refund-table border-solid-left border-solid-top border-solid-bottom">환불 금액</div>
          <div class="GS-service-user-refund-table border-solid-left border-dashed-bottom">100% 환불</div>
          <div class="GS-service-user-refund-table border-solid-left border-dashed-bottom">50% 환불</div>
          <div class="GS-service-user-refund-table border-solid-left border-solid-bottom">30% 환불</div>
        </div>
        <div>
          <div class="GS-service-user-refund-table border-solid-right border-solid-top border-solid-left border-solid-bottom">환불 사유 발생일</div>
          <div class="GS-service-user-refund-table border-solid-right border-dashed-left border-dashed-bottom">여행 시작 일 기준 {{serviceInfo.refund[0].refund100}}일 전</div>
          <div class="GS-service-user-refund-table border-solid-right border-dashed-left border-dashed-bottom">여행 시작 일 기준 {{serviceInfo.refund[0].refund50}}일 전</div>
          <div class="GS-service-user-refund-table border-solid-right border-solid-bottom border-dashed-left">여행 시작 일 기준 {{serviceInfo.refund[0].refund30}}일 전</div>
        </div>
      </div>
    </section>

    <!-- 이용 후기 -->
    <section class="GS-body-4">
      <h3 class="GS-service-intro-title" id="GS-service-intro-title">상품 후기</h3>
      <div class="GS-service-review-box">
        <div class="GS-service-reivew-overview">
          <div class="GS-service-review-score">5.0</div>
          <div class="GS-service-review-score-right">
            <div class="GS-service-review-score-stars">
              <v-rating v-model="rating" dense size="24.7" readonly></v-rating>
            </div>
            <div class="GS-service-review-count">100개의 진심 가득한 후기</div>
          </div>
        </div>

        <!-- 리뷰 리스트 v-for로 바인딩해서 출력하세요! -->
        <div class="GS-service-review-list">
          <div class="GS-service-review-individual">
            <div class="GS-service-review-userImage">
              <img
                src="https://i.imgur.com/HBxagM5.jpg"
                class="GS-service-review-userImage-src"
                alt="our user's beautiful face"
                style="border-radius: 50%;"
              />
            </div>
            <div class="GS-service-reivew-content">
              <div class="GS-service-review-top">
                <div class="GS-service-review-top-userInfo">
                  <div class="GS-service-review-userScore GS-service-review-info">
                    <v-rating v-model="rating" dense size="14.7" readonly></v-rating>
                  </div>
                  <div class="GS-service-review-userName GS-service-review-info">이빵글</div>
                  <div class="GS-service-review-info">·</div>
                  <div class="GS-service-review-userDate GS-service-review-info">이용날짜: 2019/07/29</div>
                </div>
                <div class="Gs-service-review-top-option">옵션:</div>
              </div>
              <div class="GS-service-reivew-userReview">
                <p>
                  혼자 조용히 여행하고싶어서 외국 여행사로 골라서 왔는데 ㅎㅎㅋㅋㅋㅋ 일
                  단 영어와 중국어로만 가이드를 해주시고 제가 다녔을 때는 한국분은 없었어요
                  운이 좋아야 있을정도 그리고 되게 말할사람도 없어서 외로워요 ( 유리박물관에서
                  한국 여행사 차량봤을때 갑자기 울컥했어요 ㅠㅜ) 솔직히 미국에서도 외국인입
                  장이라 나빼고 출발하면 어쩌지..? 이런 생각도 많이했었고 (영어도 못하는데ㅠㅜ)그
                  런데 전혀 그런거없고 오히려 영어못하는 저를 배려많이 해주셨어요!(감사해요😘)그리고
                  한국여행사는 전일정이 다포함된 가격으로 움직이지만 여기는 선택한 관광만 골라서 거기서
                  직접 돈을 주시면되요(저는 이게 불편..) 저는 편하게 여행하면서 한국분이 가이드
                  해주는곳에가고싶다면 미국동부여행사 치시면 엄청많이 나와요그거 추천하고요(혼자가실려면
                  일단 성인만가능하더라고요/거기에도 외국인은 있어요)아니면(한국인특성상 관섭을 많이
                  하잖아요;;)이런게 싫고 조용히 못하는영어 굴려가면서 (제기준)경험해보고싶다면 추천합니다!
                </p>
                <button @click="loadReviewMore" v-if="isLoadMore">
                  닫기
                  <i class="fa fa-angle-up"></i>
                </button>
                <button @click="loadReviewMore" v-else>
                  더 읽어보기
                  <i class="fa fa-angle-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "./GuideServiceDetailPage.css";
import PayBtn from "../components/kakaopaycpn/PayBtn";
import { mapGetters, mapState } from "vuex";

export default {
  name: "GuideServiceDetailPage",
  components: {
    PayBtn
  },
  created() {

  },
  mounted() {
    this.getServiceInformation()
    window.addEventListener("scroll", this.dragDownSideBar)
    window.addEventListener('click', this.hideElements)
  },
  destroyed() {
    // window.addEventListener('click', this.hideElements())
  },
  data() {
    return {
      isOptionsAvailable: false,
      isSideBarSticky: false,
      // guideServiceUserWrote: this.thisPostInfo.rawDetail || '',
      thisPostInfo: {},
      dataReady: false,

      // 검색창에서 넘어오는 정보
      title: "",
      city_kor: ["", ""],
      desc: "",
      mainImg: "",
      servieOptions: [],
      nationFlag: '',
      duration: '',
      cost: 1000,
      optionId: '',
      guide: '',
      options: [],
      tempOption: [],

      // 결제 관련 정보
      serviceInfo: {
        // people: 0,
        adult: 0,
        senior: 0,
        child: 0,
        infant: 0,

        adultprice: 0,
        seniorprice: 0,
        childprice: 0,
        infantprice: 0,

        // unitPrice: '1000',
        itemName: "베이징상품",
        quantity: 1,
        taxFreeAmount: 3000,
        date: '',
        guide: '',
        get people() {
          // return 1000
          return this.adult + this.senior + this.child + this.infant
        },
        get totalAmount() {
          // return 1000
          return this.adult * this.adultprice + this.senior * this.seniorprice + this.child * this.childprice + this.infant * this.infantprice
        },
      },


      // 가이드 관련 정보
      guideInfo : {
        guideName : '',
        starRatingList: [],
        guideImg: '',
        guideId: '',
      },

      // 달력 관련 변수
      isCalenderOpen: false,

      isLoadMore: false,
      isPaymentReady: false,
      leavingDate: '',
      leavingDates: [],
      room:{
        user:'',
        guide:''
      }
    }
  },
  methods: {

    decreasePeople: function(select) {
      // this.serviceInfo.people -= 1
      this.serviceInfo[select] -= 1
    },
    increasePeople: function(select) {
      // this.serviceInfo.people += 1
      this.serviceInfo[select] += 1
    },

    hideElements: function(e) {

      if (e.target.classList[0] != 'result-body__search-by-date-input'
          && e.target.classList[0] != 'result-body__search-by-date') {
        this.isCalenderOpen = false
      }

    },
    openCalender: function() {

      if (this.isCalenderOpen == true) {
        this.isCalenderOpen = false
      } else {
        this.isCalenderOpen = true
      }

    },
    goToChooseOptions: function() {

      const chosingOptions = document.querySelector(".user-comment")
      chosingOptions.scrollIntoView({behavior : 'smooth'})

    },
    // goToGuideDetail: function() {
    //   this.$router.push({ path: 'GuideMyPage', query: {guideId : this.guideInfo.guideId}})
    // },
    goToPayment: function() {
      this.$router.push({ path: 'GuideServicePayment', query: this.serviceInfo})
    },
    dragDownSideBar: function() {
      const scrollY = window.scrollY;
      const sideBar = document.body.querySelector(".GS-payment-box");
      // console.log(scrollY)

      if (scrollY >= 500) {
        sideBar.classList.add("GS-sidebar-sticky");
        // sideBar.classList.remove('GS-payment-box')
        // console.log(sideBar.classList)
      } else {
        sideBar.classList.remove("GS-sidebar-sticky");
        // sideBar.classList.add('GS-payment-box')
      }
    },
    setHero: function() {
      const hero = document.querySelector(".GS-hero");
      hero.style.background = `url(${this.mainImg})`;
      hero.style.backgroundRepeat = "no-repeat";
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "50%";
    },
    getServiceInformation: function() {
      this.$http
        .get(`/api/guideservice/findGSById/${this.$route.query.serviceId}`)
        .then(res => {
          return res.data;
        })
        .then(data => {
          console.log(data);
          this.title = data.title;
          this.city_kor = data.city_kor;
          this.nation_kor = data.nation_kor;
          this.desc = data.desc;
          this.detail = data.detail;
          this.mainImg = data.mainImg;
          this.reviews = data.reviews;
          this.duration = data.duration;
          // this.cost = data.cost;

          this.optionId = data._id;
          this.guideId = data.guide;

          this.serviceInfo.title = data.title
          this.serviceInfo.city_kor = data.city_kor
          this.serviceInfo.nation_kor = data.nation_kor
          this.serviceInfo.mainImg = data.mainImg
          this.serviceInfo.options = data.options
          this.serviceInfo.refund = data.refund
          this.serviceInfo.guide = data.guide
          // this.serviceInfo.unitPrice = data.cost;
          this.serviceInfo.unitPrice = 1000;


          console.log(data)

          return
        })
        .then( () => {
          this.getGuideServiceOption()
          this.setHero()
          this.getNationFlag()
          this.getGuideInfo()
        })
    },

    getGuideInfo : function () {
      this.$http.get(`/api/guide/${this.guideId}`)
      .then( res => {
        this.guideInfo.guideName = res.data.guide.username
        this.guideInfo.guideImg = res.data.guide.profileImageUrl
        this.guideInfo.guideId = res.data.guide._id
      })
    },

    loadReviewMore: function() {
      const loadReiveMoreBtn = document.querySelector(
        ".GS-service-reivew-userReview"
      );
      const loadReviewMoreBtn2 = document.querySelector(
        ".GS-service-review-userReview-expand"
      );
      // console.log(loadReiveMoreBtn);

      if (this.isLoadMore == true) {
        loadReviewMoreBtn2.classList.add("GS-service-reivew-userReview");
        loadReviewMoreBtn2.classList.remove(
          "GS-service-review-userReview-expand"
        );
        this.isLoadMore = false;
      } else {
        loadReiveMoreBtn.classList.add("GS-service-review-userReview-expand");
        loadReiveMoreBtn.classList.remove("GS-service-reivew-userReview");
        this.isLoadMore = true;
      }
    },
    openOptionSelectingModal(optionDetailToOpen, idx) {
      const toHide = document.querySelector('.GS-individual-option-loadmoreBtn-1') || ''
      const toShow = document.querySelector('.GS-individual-option-detail-loadmore-1') || ''
      const toDrawBorder = document.querySelector(`${optionDetailToOpen}`)
      const payBtn = document.querySelector('.GS-payment-choose-option')

      payBtn.classList.add('animated')
      payBtn.classList.add('flash')
      // payBtn.classList.add('delay-0.1s')

      // console.log(toDrawBorder)
      this.setPaymentReady()
      toDrawBorder.classList.add('option-selected')
      toHide.style.display = "none"
      toShow.style.display = "flex"

      // 선택한 옵션이 결제정보로 넘어가야 한다
      this.serviceInfo.adultprice = this.options[idx].adult.cost
      this.serviceInfo.seniorprice = this.options[idx].senior.cost
      this.serviceInfo.childprice = this.options[idx].child.cost
      this.serviceInfo.infantprice = this.options[idx].infant.cost
      this.serviceInfo.itemName = this.options[idx].list__tile__title
      console.log(this.serviceInfo)

    },
    setPaymentReady() {

      this.isPaymentReady = true
      document.querySelector('.GS-payment-choose-option-reserve').style.display = "none"
      document.querySelector('.GS-payment-choose-option-pay').style.display = "block"

    },
    getNationFlag() {
      this.$http.get(`/api/nation/search/${this.nation_kor}`)
        .then( res => {
            // console.log(res)

            if (res.data.nation) {
              this.nationFlag = res.data.nation.flagImgUrl
            } else {

              if (res.data.nations == null || res.data.nations.length == 0) {
                  this.nationFlag = "https://images-na.ssl-images-amazon.com/images/I/6148ajkxLLL._SL1000_.jpg"
                  return
                }
              this.nationFlag = res.data.nations[0].flagImgUrl
            }

        })
    },
    pushLeavingDate : function () {
      // console.log("추가")
      if (this.leavingDates.indexOf(this.leavingDate) == -1)
        this.leavingDates.push(this.leavingDate)
    },
    deleteLeavingDate : function (idx) {

      this.leavingDates.splice([idx], 1)
    },

    getGuideServiceOption() {

      this.$http.get(`/api/guideservice/findOption/${this.optionId}`)
        .then( res => {
          this.options = res.data.options
          // this.isOptionsAvailable = true

          this.options.forEach( option => {

            // option.day
            option.allowedDates = []
            option.dayOfWeek.forEach( day => {

              option.allowedDates = option.allowedDates.concat(this.getAllDays(day))
            })
            // console.log(option.allowedDates)

            option.allowedDatesFunc = val => {
                let allowedDatesInside = option.allowedDates
                return allowedDatesInside.includes(val)

              }

          })
        }).then(() => {
          console.log(this.options)
        })
    },
    getAllDays(goalDay) {

      let day = new Date()

      // 월의 시작일을 1일로 설정
      day.setDate(1)

      // 최종 년도 및 월 설정
      let endYear = day.getFullYear() + 1
      let endMonth = day.getMonth()

      /* ===============
          찾고자하는 요일 설정 (Default 월요일)
          =============== */

      // 1. 월요일
      let days
      let goalDayNumber

      if (goalDay == '월') {
          goalDayNumber = 9
      } else if (goalDay == '화') {
          goalDayNumber = 10
      } else if (goalDay == '수') {
          goalDayNumber = 11
      } else if (goalDay == '목') {
          goalDayNumber = 12
      } else if (goalDay == '금') {
          goalDayNumber = 13
      } else if (goalDay == '토') {
          goalDayNumber = 14
      } else if (goalDay == '일') {
          goalDayNumber = 15
      }

      day.setDate(day.getDate() + (goalDayNumber - 1 - day.getDay() || 7) % 7)
      days = [new Date(+day).toISOString().slice(0, 10)]
      // console.log(days)
      // 최종 년도 및 월까지 모든 월요일 구하기
      while (day.getFullYear() < endYear || day.getMonth() != endMonth) {
        let anotherDay = new Date(day.setDate(day.getDate() + 7))
        days.push(anotherDay.toISOString().slice(0, 10))
      }

      // getDate: 일요일을 0을 시작으로 요일의 번호를 나타냄
      // console.log(days)
      return days
    },

    checkAllowedDates: val => {
      console.log(val)
    },

    priceTransfer: function (price) {
      price = price.toString()
      for (let i=0; i<price.length; i++) {
        if (price[i] == ".")
          price = price.slice(0,i)
      }
      let result = ''
      for (let i=0; i<price.length; i++) {
        if (i>0 && i%3 == 0)
          result += ","
        result += price[price.length-i-1]
      }
      let reverse = ''
      for (let i=result.length-1; i>=0; i--) {
        reverse += result[i]
      }
      return reverse
    },

    chat(){
      this.room.guide=this.guideId
      this.room.user=this.getuserId
      console.log(1,this.guideId);
      console.log(2,this.getuserId);
      this.$http.post('/api/room/create',this.room)
      .then((res)=>{
        console.log(res.data);
        window.location.replace("http://localhost:8080/room/"+res.data._id)
      })
    }
  },
  computed: {
    ...mapState({
        getIsLoggedIn : state => state.User.isLoggedIn,
        getuserId : state => state.User.userId,
    })
  },
};
</script>
