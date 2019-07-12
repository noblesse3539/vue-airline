<template>
  <v-dialog persistent v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <v-btn color="black" flat icon @click="closePW">
          <v-icon>close</v-icon></v-btn>
        <span class="headline">{{currenttitle}}</span>
        <v-spacer></v-spacer>
        <div class="subheading mr-3" style="color:grey;">{{step}}/3</div>
        <v-btn v-if="complete" flat icon color="blue" @click="savePW">
        <v-icon large >check</v-icon></v-btn>
      </v-card-title>
      <v-card-title>
        <v-btn icon flat color="blue" v-if="step !== 1"><v-icon large> keyboard_arrow_left </v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon flat color="blue" v-if="step !== 3"><v-icon large> keyboard_arrow_right </v-icon></v-btn>
      </v-card-title>

      <!-- page1 -->
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- 시작날짜 -->
            <v-flex xs12 sm6>
              <v-menu ref="fromMenu" v-model="fromMenu" :close-on-content-click="false"
                      :nudge-right="40" :return-value.sync="portfolio.fromDate" lazy transition="scale-transition"
                      min-width="290px" offset-y full-width>
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="portfolio.fromDate" label="시작 날짜*" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker :max="toDate" v-model="portfolio.fromDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="blue" @click="fromMenu = false">Cancel</v-btn>
                  <v-btn flat color="blue" @click="$refs.fromMenu.save(portfolio.fromDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!-- 종료날짜 -->
            <v-flex xs12 sm6>
              <v-menu ref="toMenu" v-model="toMenu" :close-on-content-click="false"
                      :nudge-right="40" :return-value.sync="portfolio.toDate" lazy transition="scale-transition"
                      min-width="290px" offset-y full-width>
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="portfolio.toDate" label="종료 날짜*" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker :min="portfolio.fromDate" v-model="portfolio.toDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="blue" @click="toMenu = false">Cancel</v-btn>
                  <v-btn flat color="blue" @click="$refs.toMenu.save(portfolio.toDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <!-- 소요시간 -->
            <v-flex xs6>
              <v-text-field prepend-icon="schedule" v-model="portfolio.duration" label="소요시간*" clearable
                            clear-icon="clear" hint="ex) 10시간, 1박2일" persistent-hint></v-text-field>
            </v-flex>

            <!-- 통화 변환 구현필요 -->
            <v-flex xs6>
              <v-text-field prepend-icon="fa-wallet" label="가격*" prefix="₩" v-model.number="portfolio.cost"  clearable
                            clear-icon="clear" type="number"></v-text-field>
            </v-flex>

            <!-- 인원 -->
            <v-flex xs6>
              <v-text-field prepend-icon="far fa-user" suffix="명" v-model.number="portfolio.minTrav" label="최소 인원*"
                            clearable clear-icon="clear" type="number"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="fa-users" suffix="명" v-model.number="portfolio.maxTrav" label="최대 인원*"
                            clearable clear-icon="clear" type="number"></v-text-field>
            </v-flex>

            <!-- description 글자수 제약?-->
            <v-flex xs12>
              <v-textarea label="상품 요약*" auto-grow solo v-model="portfolio.desc"></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <small>*은 필수항목입니다.</small>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data (){
    return{
      dialog: true,
      fromMenu: false,
      toMenu: false,
      step: 1,
      complete: false,
      portfolio:{
        fromDate:'',
        toDate:'',
        duration: '',
        cost:'',
        minTrav:'',
        maxTrav: '',
        desc:'',
      }
    }
  },
  methods : {
    savePW(){
      this.$emit('close')
    },
    closePW(){
      this.$emit('close', false);
    }
  }
}
</script>

<style>
</style>
