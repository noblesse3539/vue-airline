<template>
  <div class="voc">
    <div class="HR__Modal" v-if="isVocVisible">
      <div class="HR__ModalContent">
        <div class="HR__ModalHeader">
          <div>피드백 작성</div>
          <i class="fas fa-times" @click="isVocVisible=false" style="cursor:pointer;"></i>
        </div>
        <div class="HR__ModalBody">
          <div>불만사항 선택 폼</div>
          <v-select
            :items="subject"
            label="주제"
            v-model="selectedSubject"
          ></v-select>
          <textarea placeholder="상세한 내용을 작성해주세요."  v-model="content" class="VOC__Input" type="text" name="review"></textarea>
        </div>
        <div class="HR__ModalAction">
          <div class="clear" @click="clearVOC">초기화</div>
          <div class="submit" @click="submitVOC">전송</div>
        </div>
      </div>
    </div>
    <div class="voc__openbutton" @click = "isVocVisible = !isVocVisible">{{`${isVocVisible? 'X':'피드백'}`}}</div>
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'
import './Voc.css'

export default {
  name: 'Voc',
  computed: {
    ...mapState({
       getUserId: state => state.User.userId
     }),
  },
  data() {
    return{
      isVocVisible: false,
      subject: ['개선사항', '불만사항', '기타'],
      content: '',
      selectedSubject: '',
    }
  },
  methods: {
    clearVOC() {
      this.content = ''
    },
    submitVOC() {
      const token = this.$getToken("BisionToken")
      const config = {
        headers: { 'x-access-token': token }
      }
      const data = {
        subject: this.selectedSubject,
        content: this.content
      }
      this.$http.post('/api/voc/create', data, config)
        .then( res => {
          console.log(res)
          this.clearVOC()
          this.isVocVisible=false
        })
        .catch( err => {
          console.log(err)
        })
    }

  }
}
</script>
