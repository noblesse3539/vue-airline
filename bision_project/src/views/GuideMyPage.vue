<template>
  <div>
    <v-container>
    <v-layout xs12 my-5 mx-5 align-end>
      <v-flex xs3 mr-5>
          <v-hover>
            <v-img fluid style="border-radius: 50%;" slot-scope="{hover}"v-on="on" class="profileImg" @click="showModal" v-bind:src="imgurl" aspect-ratio="1" alt="profile Img">
              <v-scale-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out white v-card--reveal  black--text" style="height: 100%;">
                    이미지 변경
                </div>
              </v-scale-transition>
            </v-img>
          </v-hover>
        <UploadImg v-model="imgurl" v-show="isModalVisible" @close="closeModal"/>
      </v-flex>
      <v-flex xs6>
        <h2 class="display-1 mb-3">GuideName<v-btn fab flat small>
            <i class="fas fa-pen"></i>
          </v-btn>
        </h2>
        <p class="title">guide introduction.............<br>소개를 작성해주세요.</p>
      </v-flex>
      <v-flex xs3 >
        <v-btn color="white">회원 탈퇴</v-btn>
      </v-flex>
    </v-layout>


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
            <v-rating readonly v-model="rating" background-color="yellow lighten-3" color="yellow" x-large></v-rating>
             <v-list three-line>

             </v-list>
          </v-flex>
        </v-tab-item>
        <v-tab-item key="Portfolio">
          <v-btn color="white">포트폴리오 작성</v-btn>
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

export default {
  name: 'GuideMypage',
  components:{
    UploadImg,
  },
  methods: {
    getImgUrl(img){
      return require('../assets/' + img)
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal(value) {
      console.log(value)
      if(value){
        this.imgurl=value;
      }
      this.isModalVisible = false;
    }
	},
  data (){
    return{
      rating: 4,
      isModalVisible: false,
      imgurl: require('../assets/guideProfile.png'),
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'}
      ]
    }
  },
}
</script>

<style>

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
