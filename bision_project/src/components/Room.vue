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
            </span>
          </div>
          <div class="chatroom-latest-time">
          </div>
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
            </span>
          </div>
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
        getRoomList(){
          console.log('getIsGuide',this.getIsGuide)
          if(this.getIsGuide){
            this.$http.get('/api/chat/roomListByGuide/'+this.getuserId)
            .then(res=>{
              this.chatList=res.data;
              console.log(this.chatList);
            })
            .then(res=>{
              this.getRoomListAdd()
            })
          }else{
            this.$http.get('/api/chat/roomListByUser/'+this.getuserId)
            .then(res=>{
              this.chatList=res.data;
              console.log(this.chatList);
            })
            .then(res=>{
              this.getRoomListAdd()
            })
          }
        },
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
                chatListIds.push(this.chatList[i]._id)
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
