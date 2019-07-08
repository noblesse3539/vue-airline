<template>
  <div class="container">
    <h2>&nbsp;&nbsp;&nbsp;회원정보</h2>
    <Profile/>
    <h2>&nbsp;&nbsp;&nbsp;예약 내역</h2>
    <v-layout>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1 my-3"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
    <!-- <div
      id="e3"
      style="margin: auto;"
      class="grey lighten-3"
    >
      <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card >
                <v-layout>
                  <v-flex xs12>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      class="elevation-1"
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>


            <v-flex xs12>
              <v-card >
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Supermodel</div>
                        <div>Foster the People</div>
                        <div>(2014)</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Rate this album
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <v-card class="white--text">
                <v-layout row>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Halycon Days</div>
                        <div>Ellie Goulding</div>
                        <div>(2013)</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Rate this album
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div> -->
    <!-- 이용했던 상품들 -->
    <div class="container my-5" style="height: 700px;">
      <h1 class="text-xs-center my-3">내가 이용했던 여행 상품</h1>
      <v-carousel hide-delimiters style="max-width: 800px; margin: auto;">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
  import Profile from '../components/Profile'

  export default {
    name: 'MyPage',
    components: {
  		Profile
  	},
    data () {
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
        headers: [
          {
            text: '예약번호',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '출발', value: 'calories' },
          { text: '도착', value: 'fat' },
          { text: '항공편', value: 'carbs' },
          { text: '클래스', value: 'protein' },
          { text: '상태', value: 'iron' }
        ],
        desserts: [
          {
            name: '11-70001416',
            calories: '2019-07-08',
            fat: '2019-07-09',
            carbs: 'K-324',
            protein: '이코노미',
            iron: '예약'
          },
          {
            name: '11-70001456',
            calories: '2019-07-10',
            fat: '2019-07-11',
            carbs: 'K-326',
            protein: '이코노미',
            iron: '예약'
          },
        ]
      }
    }
  }
</script>
