<template>
  <div class="container">
    <h2>&nbsp;&nbsp;&nbsp;회원정보</h2>
    <Profile/>
    <h2>&nbsp;&nbsp;&nbsp;내가 이용했던 여행 가이드</h2>
    <GuideList :load-more="true"></GuideList>
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
  import GuideList from '../components/GuideList'

  export default {
    name: 'MyPage',
    components: {
  		Profile,
      GuideList,
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
      }
    },
  }
</script>
