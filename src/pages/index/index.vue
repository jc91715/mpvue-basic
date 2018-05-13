<template>
  <div class="page" @click="clickHandle('test click', $event)">

    <p class="center">欢迎来到 U·美  ³℅ 造型</p>


      <div class="center">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" style="width: 132px;height: 132px;border-radius: 80px;margin: 0 auto;"/>
        <card :text="userInfo.nickName"></card>
      </div>


    <picker class="weui-btn center" mode="date" :value="date" start="1999-01-01" end="2099-01-01" @change="DateChange">

      <button type="default" size="mini" v-if="!date">
        请选择预约日期
      </button>
      <p class="center" v-if="date"> 您选择的预约日期为: <span class="color">{{date}}</span></p>

    </picker>
    <picker class="weui-btn center" mode="time" :value="time" start="9:00" end="22:00" @change="TimeChange">

      <button type="default" size="mini" v-if="!time">请选择预约时间</button>
      <p class="center" v-if="time">您选择的预约时间为: <span class="color">{{time}}</span></p>

    </picker>

  </div>
</template>

<script>
import card from '@/components/card'
import store from '@/utils/store'
export default {
  data () {
    return {
      motto: 'Hello World',
      date:'',
      time:''
    }
  },

  components: {
    card
  },
  computed: {
    userInfo () {
      console.log('index store.state.userInfo')
      //维护userInfo 也可以用storage
      return store.state.userInfo
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (re) => {
          console.log(re)
          //todo 传递re.code 到后端 解析出openid，在后端维护返回一个uuid和openid 对应，每次请求带着uuid 作为用户唯一性验证。
          //用户是否授权，可决定是否调用wx.getUserInfo，因为不授权的时候调用wx.getUserInfo 没作用也就获取不到res.iv  和res.encryptedData此时只需传递 code 后端即可
          wx.getSetting({
            success: (res1) => {
            console.log(res1)
              /*
               * res.authSetting = {
               *   "scope.userInfo": true,
               *   "scope.userLocation": true
               * }
               */
            }
          })
          wx.getUserInfo({
            success: (res2) => {
              console.log(res2)
              store.commit('setUserInfo',res2.userInfo);
              //todo 如果用户授权后,可把 re.code res.iv  和res.encryptedData 一起传入后端用作解密详细用户数据

              // this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    DateChange(e){
      this.date = e.mp.detail.value
    },
    TimeChange(e){
      this.time = e.mp.detail.value
    },

  },

  async created () {
    console.log('index created')
    this.getUserInfo()
  }
}
</script>

<style scoped>
.center{
  text-align: center;
}
</style>
