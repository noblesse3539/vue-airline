<template>
  <div>
    <v-layout my-5 mx-5 align-end>
      <v-flex xs4 mx-5>
        <v-img style="border-radius:50%" :src="getImgUrl('logo.png')" aspect-ratio="1" alt="profile Img"/>
      </v-flex>
      <v-flex xs4 >
        <h2 class="headline mb-3">GuideName</h2>
        <p>guide introduction.............</p>
      </v-flex>
      <!-- if 가이드 본인이라면, -->
      <v-flex xs4 >
        <v-btn color="white">프로필 수정</v-btn><br>
        <v-btn color="white">회원 탈퇴</v-btn>
      </v-flex>
    </v-layout>
      <!-- ------- -->
    <v-container>
      <v-sheet color="white">
        <v-tabs  color="white">
          <v-tab key="Now" > Now </v-tab>
          <v-tab key="Portfolio"> Portfolio </v-tab>
          <v-tab-item key="Now">
            <v-flex xs12>
              <v-card flat>
                <v-card-title><h2>Plan Title</h2></v-card-title>
                <v-layout row wrap mx-5 mb-5>
                  <v-flex xs12 md5>
                    <v-img :src="getImgUrl('logo.png')"></v-img>
                  </v-flex>
                  <v-flex xs12 md7 ml-5>
                    <v-card-text> Introduction to tour Plan</v-card-text>
                  </v-flex>
                  <v-flex xs12>
                    <v-card-actions>
                      <v-btn flat>Book now</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-tab-item>
          <v-tab-item key="Portfolio">dadfl</v-tab-item>
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
}
</script>

<style>
</style>
