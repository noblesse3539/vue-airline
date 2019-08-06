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
      subject: '',
      content: ''
    }
  },
  methods: {
    clearVOC() {
      this.subject = ''
      this.content = ''
    },
    submitVOC() {

      this.clearVOC()
      this.isVocVisible=false
    }

  }
}
</script>
