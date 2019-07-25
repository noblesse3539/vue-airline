<template>
  <v-layout wrap>
    <v-flex xs3 v-for="(i, idx) in userGuideServices.length > limits ? limits : userGuideServices.length" :key="idx">
      <Guide class="ma-3"
          :title="userGuideServices[i - 1].title"
          :name="userGuideServices[i - 1].user.username"
          :content="userGuideServices[i - 1].detail"
          :region="userGuideServices[i - 1].city_kor"
          :imgSrc="userGuideServices[i - 1].mainImg"
      ></Guide>
    </v-flex>
    <v-flex xs12 text-xs-center round class="loadMore">
      <v-btn v-if="loadMore" class="user-guide-serve__loadmore" dark v-on:click="loadMoreGuideList"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
      <v-btn v-else class="user-guide-serve__loadmore" dark v-on:click="hideGuideList"><v-icon size="25" class="mr-2">fa-minus</v-icon> 숨기기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Guide from '@/components/Guide'
import './GuideList.css'

export default {
	name: 'GuideList',
	props: {
    limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: true},
    userGuideServices: {type: Array, default: []},
	},
  components: {
    Guide
  },
  methods: {
    loadMoreGuideList () {
      this.limits = 8
      this.loadMore = false
    },
    hideGuideList () {
      this.limits = 4
      this.loadMore = true
    }
  },
	data() {
		return {
			guides: [
        {
          title: '여행이 가고싶으신가요?',
          name: '강혜리',
          region: '프랑스',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        {
          title: '여행이 가고싶으신가요?',
          name: '정세민',
          region: '유럽',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        {
          title: '여행이 가고싶으신가요?',
          name: '이민교',
          region: '미국',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        {
          title: '여행이 가고싶으신가요?',
          name: '고병석',
          region: '싱가포르',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        {
          title: '여행이 가고싶으신가요?',
          name: '류정관',
          region: '인도',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
        {
          title: '여행이 가고싶으신가요?',
          name: '유승주',
          region: '미국',
          content: '누구나 여행을 꿈꾸고 떠나기를 원하면서도 귀찮음과 불편함이 싫어 주저하시는 분들이 많으시죠. 그러한 분들에게 도움이 되어 여행의 즐거움을 느끼고 소중한 추억이 될 수 있게 해드리는 것이 저의 목표 입니다.',
        },
      ]
		}
  },
  updated() {
    console.log(this.userGuideServices)
  },
}
</script>
