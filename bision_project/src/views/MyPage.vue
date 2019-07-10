<template>
  <div class="container">
    <h2>&nbsp;&nbsp;&nbsp;회원정보</h2>
    <Profile/>
    <h2>&nbsp;&nbsp;&nbsp;내가 이용했던 여행 가이드</h2>
    <v-flex xs4>
      <v-card>
        <v-layout>
          <v-flex xs8>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
              height="125px"
              contain
            ></v-img>
          </v-flex>
        </v-layout>

        <v-divider light></v-divider>
        <div class="container">
          <div v-if="translateflag">
            <div class="headline">{{guideinfo.name}}</div>
            <div>{{guideinfo.title}}</div>
            <div>{{guideinfo.content}}</div>
          </div>
          <div v-else>
            <div class="headline">{{translatedText.name}}</div>
            <div>{{translatedText.title}}</div>
            <div>{{translatedText.content}}</div>
          </div>
          <v-btn color="blue" v-on:click="translateflag=!translateflag" style="width:">한/영</v-btn>
        </div>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          만족도
          <v-spacer></v-spacer>
          <v-icon color="yellow">fas fa-star</v-icon>
          <v-icon>fas fa-star</v-icon>
          <v-icon>fas fa-star</v-icon>
          <v-icon>fas fa-star</v-icon>
          <v-icon>fas fa-star</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>
    <div class="container my-5" style="height: 700px;">
      <h1 class="text-xs-center my-3">내가 이용했던 여행 상품</h1>
      <v-carousel hide-delimiters style="max-width: 800px; margin: auto;">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          style="width: 800px;"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
  import Profile from '../components/Profile'
  import axios from 'axios'

  export default {
    name: 'MyPage',
    components: {
  		Profile
  	},
    data: function () {
      return {
        // text: '',
        message: '',
        translateflag: true,
        content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        guideinfo: {
          title: '여행이 가고싶으신가요?',
          name: '강혜리',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        translatedText: {
          title: '',
          name: '',
          content: '',
        }
      }
    },
    mounted() {
      try {
        this.translate();
      } catch (err) {
        console.log('translate error')
      }
    },
    methods: {
      async translate() {
        // console.log(content)
        try {
          for (var gkey in this.guideinfo) {
            console.log(gkey)
            console.log(this.guideinfo[gkey])
            const taxios = await axios.create({
              baseURL: "https://translation.googleapis.com"
            });
            const getTranslate = await taxios.post("/language/translate/v2", null, {
              params: {
                source: "ko",
                target: "en",
                q: this.guideinfo[gkey],
                key: "AIzaSyD9-6TuS5C7IJVWPFv5i10l_Z2JjXyb9zw"
              }
            })
            ;
            this.translatedText[gkey] = getTranslate.data.data.translations[0].translatedText
            console.log(getTranslate)
          }
        } catch (err) {
        }
      }
    }
  }
</script>
