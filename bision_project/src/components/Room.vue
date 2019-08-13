<template>
  <v-container class="room-container">
    <v-layout v-if="getIsLoggedIn" class="chat">
      <v-flex xs12>
        <div @click="join(one._id)" v-if="getIsGuide" v-for="(one, index) in chatList" :key="index" class="chatroom-box">
          <div class="chatroom-userimage">
              <v-img fluid :src="one.user.profileImageUrl" aspect-ratio="1" alt="profile Img"/>
          </div>
          <div class="chatroom-userinfo">
            <span>
              {{one.user? one.user.username : ''}}
            </span><br />
            <span>
              {{one.user? one.user.email : ''}}
            </span><br />
            <!-- <span>
              메세찌
            </span> -->
          </div>
          <!-- <div class="chatroom-latest-time">
            18:00
          </div> -->
        </div>
        <div @click="join(one._id)" v-else class="chatroom-box">
          <div class="chatroom-userimage">
              <v-img fluid :src="one.guide? one.guide.profileImageUrl : ''" aspect-ratio="1" alt="profile Img"/>
          </div>
          <div class="chatroom-userinfo">
            <span>
              {{one.guide? one.guide.username : ''}}
            </span><br />
            <span>
              {{one.guide? one.guide.email : ''}}
            </span><br />
            <!-- <span>
              메세지
            </span> -->
          </div>
          <!-- <div class="chatroom-latest-time">
            18:00
          </div> -->
        </div>
      </v-flex>

      <v-flex v-if="chatList ? chatList.length===0 : false" xs12 class="no-chat-room">
        <div v-if="getIsGuide">
          채팅방이 존재하지 않습니다. 유저들과 채팅기능을 이용해보세요.
        </div>
        <div v-else>
          채팅방이 존재하지 않습니다. 가이드와 채팅기능을 이용해보세요.
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
import './Room.css'
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
      this.checkUserLoginStatus()
    },
    methods: {
        join(rmId){
          console.log('rmId',rmId);
          window.location="http://localhost:8080/room/"+rmId
        },
        getIsMe(msg){
          if(msg.user===undefined){
            return msg.guide._id===this.getuserId
          }else{
            return msg.user._id===this.getuserId
          }
        },
        checkUserLoginStatus: function() {
          const token = this.$getToken("BisionToken");
          const config = {
            headers: { "x-access-token": token }
          };

          this.$http
            .get("/api/auth/check", config)
            .then(res => {
              console.log(res.data)
              if (res.status == 200) {
                this.$store.commit("setIsLoggedIn");
                this.$store.commit("setUserInfo", {
                  userId: res.data.info._id,
                  userName: res.data.info.username,
                  isGuideNow: res.data.info.isGuide
                });
                this.$http.defaults.headers.common["x-access-token"] = token
              }
            })
            .then(res=>{
              this.getRoomList()
              console.log('chatList',this.chatList);
            })
            .catch(err => {
              console.log(err);
            });
        },
        // getUser(msg){
        //   if(msg.user===undefined){
        //     return msg.guide.username
        //   }else{
        //     return msg.user.username
        //   }
        // },
        getRoomList(){
          if(this.getIsGuide){
            this.$http.get('/api/chat/roomListByGuide/'+this.getuserId)
            .then(res=>{
              this.chatList=res.data;
              console.log("what sithis", res)
            })
            .then(res=>{
              this.getRoomListAdd()
            })
          }else{
            this.$http.get('/api/chat/roomListByUser/'+this.getuserId)
            .then(res=>{
              this.chatList=res.data;
            })
            .then(res=>{
              this.getRoomListAdd()
            })
          }
        },
        // getLocalTimezone(msg){
        //   let year=msg.created_at.substring(0,4)
        //   let month=msg.created_at.substring(5,7)
        //   let day=msg.created_at.substring(8,10)
        //   let hour=msg.created_at.substring(11,13)
        //   let min=msg.created_at.substring(14,16)
        //   let sec=msg.created_at.substring(17,19)
        //   let ms=msg.created_at.substring(20,23)
        //   // console.log(year+'년 '+month+'월 '+day+'일 '+hour+'시 '+min+'분 '+sec+'초 '+ms+'밀리초');
        //   let newDate=new Date(year,month-1,day,hour,min,sec,ms)
        //   // return new Date(msg.created_at.getTime()-(newDate.getTimezoneOffset()*60*1000))
        //   let newDate2=new Date(newDate.getTime()-(newDate.getTimezoneOffset()*60*1000))
        //   let Time
        //   Time=(newDate2.getYear()+1900).toString()+'년 '
        //       +(newDate2.getMonth()+1).toString()+'월 '
        //       +newDate2.getDate().toString()+'일 '
        //       +newDate2.toString().substring(16,18)+':'
        //       +newDate2.toString().substring(19,21)
        //
        //   // 월의 값이 한 자리 수 이면 0을 추가
        //   if(Time.substring(6,9).indexOf(' ')!==-1){
        //     Time=Time.substring(0,6)+'0'+Time.substring(6,Time.length)
        //   }
        //
        //   // 일의 값이 한 자리 수 이면 0을 추가
        //   if(Time.substring(10,13).indexOf(' ')!==-1){
        //     Time=Time.substring(0,10)+'0'+Time.substring(10,Time.length)
        //   }
        //
        //   // 오전 오후 구분
        //   if(Time.substring(14,16)>"12"){ // 시를 오후 1시로
        //     Time=Time.substring(0,14)+'오후 '+(Time.substring(14,16)-12)+Time.substring(16,Time.length)
        //   }else if(Time.substring(14,16)=="12"){ // 12시를 오후 12시로
        //     Time=Time.substring(0,14)+'오후 '+Time.substring(14,16)+Time.substring(16,Time.length)
        //   }else if(Time.substring(14,16)=="00"){ // 00시를 오전 12시로
        //     Time=Time.substring(0,14)+'오전 '+12+Time.substring(16,Time.length)
        //   }else{ // 01시를 오전 01시로
        //     Time=Time.substring(0,14)+'오전 '+Time.substring(14,Time.length)
        //   }
        //
        //
        //   // 당일 메시지는 날짜 표시 안하고 시간만 표시.
        //   // 당일이 아니면 날짜만 표시
        //   let today=new Date();
        //   if(today.getYear() === newDate2.getYear() &&
        //     today.getMonth() === newDate2.getMonth()&&
        //     today.getDate()=== newDate2.getDate()){
        //       Time=Time.substring(13,Time.length)
        //   }else{
        //     Time=Time.substring(0,13)
        //   }
        //
        //   return Time
        // },
        getRoomListAdd(){
          
          let url=''
          if(this.getIsGuide){
            url='/api/room/findByGuide/'
          }else{
            url='/api/room/findByUser/'
          }
          this.$http.get(url+this.getuserId)
          .then(res=>{
            if(res.data.length===this.chatList){
              return res.json({message:'not Add'})
            }else{
              let chatListIds=[]
              let addListIds=[];
              for (let i = 0; i < this.chatList.length; i++) {
                chatListIds.push(this.chatList[0]._id)
              }
              for(let i=0; i<res.data.length;i++){
                if(chatListIds.indexOf(res.data[i]._id)<0){
                  addListIds.push(res.data[i]._id)
                }
              }
              for (let i = 0; i < addListIds.length; i++) {
                for (let j = 0; j < res.data.length; j++) {
                  if(addListIds[i]===res.data[j]._id){
                    this.chatList.splice(0,0,res.data[j])
                  }
                }
              }
            }
          })
          console.log('roomAdd',this.chatList)
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
