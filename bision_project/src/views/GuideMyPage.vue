<template>
  <div>
    <v-layout my-5 mx-5 align-end>
      <v-flex xs3 mx-5>
      <v-img height="200" width="200" style="border-radius:50%" :src="getImgUrl('guideProfile.png')" aspect-ratio="1" alt="profile Img"/>
      <v-btn id="uploadImg" color="white">이미지 수정</v-btn><br>

      </v-flex>
      <v-flex xs4>
        <h2 class="headline mb-3">GuideName</h2>
        <p>guide introduction.............</p>
      </v-flex>
      <!-- if 가이드 본인이라면, -->
      <!-- <v-flex xs4 > -->
        <!-- <v-btn color="white">회원 탈퇴</v-btn> -->
      <!-- </v-flex> -->
    </v-layout>
      <!-- ------- -->
    <v-container my-5>
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
              <v-rating v-model="rating" background-color="yellow lighten-3" color="yellow" x-large></v-rating>
               <v-list three-line>

               </v-list>
            </v-flex>
          </v-tab-item>
          <v-tab-item key="Portfolio">
            <v-btn color="white">포트폴리오 작성</v-btn>
          </v-tab-item>
        </v-tabs>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'GuideMypage',
  methods: {
		getImgUrl(img) {
			return require('../assets/' + img)
		}
	},
  data: () => ({
      rating: 4,
    }),
}
</script>

<style>
</style>
