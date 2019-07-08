<template>
    <div class="HomePage">
    <h1>hello</h1>
      <ImgBanner imgSrc="https://source.unsplash.com/1600x900/?nature"></ImgBanner>
      
      <v-layout  my-5 id="about-me">
        <v-flex xs12>
          <h2 class="headline mb-3">About Me</h2>
          <p class="mr-4">안녕하세요, 커피를 마시기 위해 개발하는 개발자 이민교입니다.<br/>
          아이들과 같은 순수한 마음으로 평생 개발에 정진하는 것이 삶의 목표입니다. 감사합니다.</p>
        </v-flex>
        <v-flex xs0 sm12>
          <v-img :src="getImgUrl('baby.jpg')" aspect-ratio="1.5"/>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
          <PortfolioList :limits="limits"></PortfolioList>
        </v-flex>
      </v-layout>

      <!-- Post -->
      <v-layout my-5>
        <v-flex xs12 md12 lg12 xl12>
          <h2 class="headline my-5 text-xs-center">Post</h2>
         <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>

      <!-- Github -->
      <v-layout my-5>
        <v-flex xs4 md12 lg12 xl12>
          <h2 class="headline my-5 text-xs-center">Project</h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout> 

    </div>
</template>

<script>
import ImgBanner from "../../components/Pandora/ImgBanner"
import PortfolioList from "../../components/Pandora/PortfolioList"
import PostList from "../../components/Pandora/PostList"
import RepositoryList from "../../components/Pandora/RepositoryList"

export default {
	name: 'Pandora',
  data() {
    return { limits: 3 }
  },
  mounted() {
    window.addEventListener('resize', this.fitViewPort)
  },
	components: {
		ImgBanner,
		PortfolioList,
		PostList,
		RepositoryList
	},
	methods: {
		getImgUrl(img) {
			return require('../../assets/' + img)
		},
    fitViewPort : function () {
			const viewPortWidth = screen.width
			if (viewPortWidth <= 960) {
				this.limits = 4
				} else if (viewPortWidth > 960 ) {
				this.limits = 3
			}
		},
  },
}
</script>

<style>

  @media only screen and (max-width: 600px){
    #HomePage {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    #HomePage #HomePage-Container {
      width: 100%;
    }
    #about-me {
      flex-wrap: wrap !important;
      font-size: 4vw !important;
    }
    .headline {
      text-align: center !important;
    }
  }

  #HomePage {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

  #about-me {
    font-size: 1.5vw;
  }

  #HomePage #HomePage-Container {
    width: 100%;
  }

  .slogan {
    display: inline-block;
    padding: 1%;
    background: rgba(255,255,255, 0.2);
  }

</style>