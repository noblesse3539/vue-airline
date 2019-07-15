<template>
  <div class="guidepage">
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
          <UploadImg v-model="imgurl" v-if="isIUVisible" @close="closeIU"/>
        <!-- else 끝 -->
      </v-flex>

      <!-- Introduction -->
      <v-flex xs6>
        <h2 class="display-1 mb-3">GuideName

          <!-- v-if: 본인일 때 -->
          <v-tooltip right>
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
        <v-tab key="Portfolio"> Portfolio </v-tab>
        <v-tab-item key="Now">
          <v-flex xs12>
            <v-card flat>
              <v-card-title><h2>Plan Title</h2></v-card-title>
              <v-layout mx-5 mb-5>
                <v-flex xs12 md5>
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
          <v-btn  @click="showPW" color="white">포트폴리오 작성</v-btn>
          <PortfolioWrite v-if="isPWVisible" @close="closePW"></PortfolioWrite>

          <!-- portfolio list -->
        <v-container fluid grid-list-md mx-2>
          <v-layout row wrap >
            <v-flex mx-2 my-2 v-for="card in cards" :key="card.title" xs4>
              <v-card>
                <v-img :src="card.src" height="200px">
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
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
import PortfolioWrite from '../components/PortfolioWrite'

export default {
  name: 'GuideMypage',
  components:{
    UploadImg,
    PortfolioWrite,
  },
  methods: {
    getImgUrl(img){
      return require('../assets/' + img)
    },
    showIU() {
      this.isIUVisible = true;
    },
    closeIU(value) {
      console.log(value)
      if(value){
        this.imgurl=value;
      }
      this.isIUVisible = false;
    },

    showET(){
      this.introTemp = this.intro;
      this.isETVisible = true;
    },
    doneET(){
      this.intro = this.introTemp;
      this.isETVisible = false;
    },
    cancelET(){
      this.introTemp = '';
      this.isETVisible = false;
    },
    showPW(){
      const navBarZIndex = document.querySelector('#navbox')
      navBarZIndex.style.zIndex = 0;
      this.isPWVisible = true;
    },
    closePW(){
      this.isPWVisible = false;
    }
  },
  data (){
    return{
      rating: 4,
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

    }
  },
}
</script>

<style>
  .guidepage {
    margin-top: 110px;
    margin-bottom: 40px;
  }
  .profileImg:hover {
    cursor: pointer;
  }
  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>
