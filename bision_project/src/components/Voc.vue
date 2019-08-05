<template>
  <div class="voc">
    <div class="voc__modal" v-if="isVocVisible">
      <input type="text">
      <div>gdg</div>
    </div>
    <div class="voc__openbutton" @click = "isVocVisible = !isVocVisible">{{`${isVocVisible? 'X':'FeedBack'}`}}</div>
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

  }
}
</script>
