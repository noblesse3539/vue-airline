<template>
  <div class="GS-detail-page">
    <div class="GS-travel-route">
      <p>
        {{city_kor[1]}} in {{nation_kor}}
      </p>
      <img :src="nationFlag" width="60" height="60" v-if="nationFlag"/>
    </div>
    <div class="GS-hero"></div>
    <section class="GS-body-1">
      <div class="GS-body-left">
        <div class="GS-guide-detail-content">
          <div class="GS-guide-detail-title">
            <div style="margin-right: 10px;">{{title}}</div>
            <i class="far fa-heart"></i>
            <!-- <i class="fas fa-heart guide-list-page-like-btn-active"></i> -->
          </div>
          <div class="GS-guide-detail-option">
            <div class="GS-guide-duration GS-guide-detail-icon">
              <i class="far fa-clock"></i>
              <span style="margin-left: 10px;">소요시간 100 시간</span>
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
            <span style="font-size: 3rem;">{{serviceInfo.totalAmount}}</span>
          </div>
          <div class="GS-payment-choose-option GS-payment-choose-option-pay" style="display: none">
              <button class="GS-payment-decision-btn">결제하기</button>
            <!-- <PayBtn class="GS-payment-decision-btn" v-bind="serviceInfo">
            </PayBtn> -->
          </div>
          <div class="GS-payment-choose-option GS-payment-choose-option-reserve" v-if="isPaymentReady == false">
            <button class="GS-payment-decision-btn">예약하기</button>
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
              <v-rating class="serviceRating" v-model="rating" dense size="17.4"></v-rating>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 상품 결제 전 옵션 고르기-->
    <section class="GS-body-2">
      <div class="GS-body-2-left" >
        <h3 class="GS-body-2-left-title" style="font-size: 2rem; margin-bottom: 15px;">옵션 선택하기</h3>
        <div class="result-body__search-by-date GS-body__search-by-date">
          <span class="result-body__search-by-date-icon">
            <i class="far fa-calendar-check"></i>
          </span>
          <input placeholder="날짜 선택" disabled class="result-body__search-by-date-input" type="text" />
        </div>
        <div class="GS-option-box">
          <!-- 각 상품에 대한 옵션 리스트 v-for로 출력할 것 -->
          <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
          <div class="GS-individual-option GS-individual-option-1">
            <div class="GS-individual-option-title-box">
              <div class="GS-individual-option-title">{{title.slice(0, 25)}}...</div>
              <div class="GS-individual-top-price">
                <span style="font-size: 1rem; margin-right: 5px;">KRW</span>
                <span>10,000</span>
              </div>
            </div>
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <div class="GS-individual-option-loadmoreBtn GS-individual-option-loadmoreBtn-1">
              <button 
                class="GS-individual-option-selectBtn GS-individual-option-selectBtn-1"
                @click="openOptionSelectingModal(`.GS-individual-option-1`)"
              >
                선택
              </button>
            </div>
            <!-- active on loadmore -->
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <div class="GS-individual-option-detail GS-individual-option-detail-1"></div>
            <!-- active on loadmore -->
            <!-- 클래스에 v-for에서 인덱스로 가져오는 값을 넣어줘야합니다. -->
            <div class="GS-individual-option-detail-loadmore  
                        GS-individual-option-detail-loadmore-1"
                        style="display: none">
              <div class="num-of-customers" style="min-width: 200px;">
                <div class="num-of-customers__increaseBtn">
                  <v-btn
                    @click="increaseAdults"
                    fab
                    dark
                    color="rgba(47, 230, 62, 1)"
                    small
                    outlined
                  >
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </div>
                <div class="num-of-customers-count">1</div>
                <div class="num-of-customers__decreaseBtn">
                  <v-btn @click="increaseAdults" fab dark color="rgba(47, 230, 62, 1)" small>
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="Gs-individual-price">
                <p style="margin: 0;">
                  KRW
                  <span>10,000/ 한 명</span>
                </p>
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

    <!-- 이용 후기 -->
    <section class="GS-body-4">
      <h3 class="GS-service-intro-title" id="GS-service-intro-title">상품 후기</h3>
      <div class="GS-service-review-box">
        <div class="GS-service-reivew-overview">
          <div class="GS-service-review-score">5.0</div>
          <div class="GS-service-review-score-right">
            <div class="GS-service-review-score-stars">
              <v-rating v-model="rating" dense size="24.7"></v-rating>
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
                    <v-rating v-model="rating" dense size="14.7"></v-rating>
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

export default {
  name: "GuideServiceDetailPage",
  components: {
    PayBtn
  },
  created() {},
  mounted() {
    this.getServiceInformation();
    window.addEventListener("scroll", this.dragDownSideBar);
  },
  data() {
    return {
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
 
      // 결제 관련 정보
      serviceInfo: {
        itemName: "베이징상품",
        quantity: 1,
        totalAmount: 10000,
        taxFreeAmount: 3000
      },
    
      isLoadMore: false,
      isPaymentReady: false,
    };
  },
  methods: {
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
          // this.thisPostInfo.title = res.data.title
          // this.thisPostInfo.city = res.data.city_kor
          // this.thisPostInfo.image = res.data.mainImg
          // this.thisPostInfo.duration = res.data.duration
          // this.thisPostInfo.rawDetail = res.data.detail
          // this.thisPostInfo.desc = res.data.desc
          //   console.log(res.data);
          return res.data;
        })
        .then(data => {
          // this.setHero()
          // console.log(data);
          this.title = data.title;
          this.city_kor = data.city_kor;
          this.nation_kor = data.nation_kor;
          this.desc = data.desc;
          this.detail = data.detail;
          this.mainImg = data.mainImg;
          this.reviews = data.reviews;
          this.setHero();
        })
        .then( () => {
          this.getNationFlag()
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
    openOptionSelectingModal(optionDetailToOpen) {
      const toHide = document.querySelector('.GS-individual-option-loadmoreBtn-1') || ''
      const toShow = document.querySelector('.GS-individual-option-detail-loadmore-1') || ''
      const toDrawBorder = document.querySelector(`${optionDetailToOpen}`)
      const payBtn = document.querySelector('.GS-payment-choose-option')
    
      payBtn.classList.add('animated')
      payBtn.classList.add('flipInX')
      payBtn.classList.add('delay-0.1s')

      // console.log(toDrawBorder)
      this.setPaymentReady()
      toDrawBorder.classList.add('option-selected')
      toHide.style.display = "none"
      toShow.style.display = "flex"
      
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
  },
  computed: {}
};
</script>