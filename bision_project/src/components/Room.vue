<template>
  <v-container>
    <v-layout v-if="this.getIsLoggedIn" class="chat">
      <v-flex hidden-xs-only sm4 md4>
        <v-card v-if="getIsGuide" class="chatInfo">
          <div class="chatInfoImg">
            <v-img fluid style="border-radius: 50%;" :src="roomInfo.user.profileImageUrl" aspect-ratio="1" alt="profile Img"/>
          </div>
          <div class="chatInfoUsername">
            {{roomInfo.user.username}}
          </div>
          <div class="chatInfoEmail">
            {{roomInfo.user.email}}
          </div>
        </v-card>
        <v-card v-else class="chatInfo">
          <div class="chatInfoImg">
            <v-img fluid style="border-radius: 50%;" :src="roomInfo.guide.profileImageUrl" aspect-ratio="1" alt="profile Img"/>
          </div>
          <div class="chatInfoUsername">
            {{roomInfo.guide.username}}
          </div>
          <div class="chatInfoEmail">
            {{roomInfo.guide.email}}
          </div>
        </v-card>
        <v-card v-if="getIsGuide" v-for="(one, index) in chatList">
          <div class="chatInfoOthersImg">
            <!-- <router-link :to="`${'/room/'+one._id}`"> -->
              <v-img @click="join(one._id)" fluid style="border-radius: 50%;" :src="one.user.profileImageUrl" aspect-ratio="1" alt="profile Img"/>
            <!-- </router-link> -->
          </div>
          <div class="chatInfoOthersUsername">
            {{one.user.username}}
          </div>
          <div class="chatInfoOthersEmail">
            {{one.user.email}}
          </div>
        </v-card>
        <v-card v-else>
          <div class="chatInfoOthersImg">
            <router-link :to="`${'/room/'+one._id}`">
              <v-img @click="join(one._id)" fluid style="border-radius: 50%;" :src="one.guide? one.guide.profileImageUrl : ''" aspect-ratio="1" alt="profile Img"/>
            </router-link>
          </div>
          <div class="chatInfoOthersUsername">
            {{one.guide.username}}
          </div>
          <div class="chatInfoOthersEmail">
            {{one.guide.email}}
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 md8 style="margin-left:80px">
        <!-- <v-flex hidden-sm-and-up>
          <div>
            abc
          </div>
        </v-flex> -->
        <form @submit.prevent="sendMessage">
          <div id="chatTextDiv">
            <textarea id="chatText" v-model="message" placeholder="메세지를 입력하세요"/>
          </div>
          <div id="chatBtnDiv">
            <button id="chatBtn" type="submit" disabled>보내기</button>
          </div>
        </form>
        <div id="messageBox">
          <div v-for="(msg, index) in messages" :key="index">
            <div v-if="getIsMe(msg)" >
              <div class="my_name" v-html="getUser(msg)"/>
              <div class="my_message">
                <div class="my_message_text">
                  <span class="chatMessage" v-html="msg.chat" />
                </div>
                <br />
                <div class="message_time">
                  <span v-html="getLocalTimezone(msg)"></span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="you_name" v-html="getUser(msg)"/>
              <div class="you_message">
                <div class="you_message_text">
                  <span class="chatMessage" v-html="msg.chat" />
                </div>
                <br />
                <div  class="message_time">
                  <span v-html="getLocalTimezone(msg)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout v-else class="chat">
      <v-flex>
        채팅 서비스는 로그인이 반드시 필요합니다.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import './Chat.css'
import io from 'socket.io-client';

import { mapGetters, mapState } from "vuex";

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            roomId:'',
            roomInfo:{},
            socket : io('localhost:3000/chat'),
            chatList:[],
        }
    },
    mounted() {

        this.getChatList();
    },
    methods: {
        sendMessage(e) {
            let newDate=new Date();
            e.preventDefault();
            let msg={
                user:{
                  '_id':'',
                  'username':'',
                },
                guide:{
                  '_id':'',
                  'username':''
                },
                chat:'',
                created_at:new Date()
            }
            if(this.getIsGuide){
              msg.guide._id=this.getuserId;
              msg.guide.username=this.getUsername
              delete msg.user
            }else{
              msg.user._id=this.getuserId;
              msg.user.username=this.getUsername
              delete msg.guide
            }
            msg.chat=document.querySelector('#chatText').value.replace(/\r?\n/g, '<br />');
            this.message = ''
            this.$http.post('/api/chat/room/'+this.roomId,msg)
            this.socket.emit('MESSAGE', data);
        },
        join(rmId){
          console.log('rmId',rmId);
          window.location.replace("http://localhost:8080/room/"+rmId)
        },
        getUserInfo(){
          if(this.getIsLoggedIn){
            if(this.getIsGuide){
              this.$http.get('/api/guide/'+this.getuserId)
              .then(res=>{
                this.user=res.data;
              })
            }else{
              this.$http.get('/api/user/search/'+this.getuserId)
              .then(res=>{
                this.user=res.data;
              })
            }
          }
        },
        getIsMe(msg){
          if(msg.user===undefined){
            return msg.guide._id===this.getuserId
          }else{
            return msg.user._id===this.getuserId
          }
        },
        getUser(msg){
          if(msg.user===undefined){
            return msg.guide.username
          }else{
            return msg.user.username
          }
        },
        getChatList(){
          if(this.getIsGuide){
            this.$http.get('/api/room/findByGuide/'+this.getuserId)
            .then(res=>{
              console.log('res1',res);
              this.chatList=res.data;
              console.log('chatList',this.chatList);
            })
          }else{
            this.$http.get('/api/room/findByUser/'+this.getuserId)
            .then(res=>{
              console.log('res2',res);
              this.chatList=res.data;
            })
          }
        },
        getLocalTimezone(msg){
          let year=msg.created_at.substring(0,4)
          let month=msg.created_at.substring(5,7)
          let day=msg.created_at.substring(8,10)
          let hour=msg.created_at.substring(11,13)
          let min=msg.created_at.substring(14,16)
          let sec=msg.created_at.substring(17,19)
          let ms=msg.created_at.substring(20,23)
          // console.log(year+'년 '+month+'월 '+day+'일 '+hour+'시 '+min+'분 '+sec+'초 '+ms+'밀리초');
          let newDate=new Date(year,month-1,day,hour,min,sec,ms)
          // return new Date(msg.created_at.getTime()-(newDate.getTimezoneOffset()*60*1000))
          let newDate2=new Date(newDate.getTime()-(newDate.getTimezoneOffset()*60*1000))
          let Time
          Time=(newDate2.getYear()+1900).toString()+'년 '
              +(newDate2.getMonth()+1).toString()+'월 '
              +newDate2.getDate().toString()+'일 '
              +newDate2.toString().substring(16,18)+':'
              +newDate2.toString().substring(19,21)

          // 월의 값이 한 자리 수 이면 0을 추가
          if(Time.substring(6,9).indexOf(' ')!==-1){
            Time=Time.substring(0,6)+'0'+Time.substring(6,Time.length)
          }

          // 일의 값이 한 자리 수 이면 0을 추가
          if(Time.substring(10,13).indexOf(' ')!==-1){
            Time=Time.substring(0,10)+'0'+Time.substring(10,Time.length)
          }

          // 오전 오후 구분
          if(Time.substring(14,16)>"12"){ // 시를 오후 1시로
            Time=Time.substring(0,14)+'오후 '+(Time.substring(14,16)-12)+Time.substring(16,Time.length)
          }else if(Time.substring(14,16)=="12"){ // 12시를 오후 12시로
            Time=Time.substring(0,14)+'오후 '+Time.substring(14,16)+Time.substring(16,Time.length)
          }else if(Time.substring(14,16)=="00"){ // 00시를 오전 12시로
            Time=Time.substring(0,14)+'오전 '+12+Time.substring(16,Time.length)
          }else{ // 01시를 오전 01시로
            Time=Time.substring(0,14)+'오전 '+Time.substring(14,Time.length)
          }


          // 당일 메시지는 날짜 표시 안하고 시간만 표시.
          // 당일이 아니면 날짜만 표시
          let today=new Date();
          if(today.getYear() === newDate2.getYear() &&
            today.getMonth() === newDate2.getMonth()&&
            today.getDate()=== newDate2.getDate()){
              Time=Time.substring(13,Time.length)
          }else{
            Time=Time.substring(0,13)
          }

          return Time
        },
    },
    watch:{
      message: function () {
        let Btn=document.getElementById("chatBtn");
        if(this.message.length>0){
          Btn.disabled = false;
          Btn.style.backgroundColor = "lightyellow";
          Btn.style.borderColor = "lightyellow";
        }else{
          Btn.disabled = true;
          Btn.style.backgroundColor = "lightgray";
          Btn.style.borderColor = "lightgray";
        }
      }
    },
    computed: {
        ...mapState({
            getIsLoggedIn : state => state.User.isLoggedIn,
            getuserId : state => state.User.userId,
            getUsername : state => state.User.userName,
            getIsGuide : state => state.User.isGuide,
        })
    },
}

</script>
