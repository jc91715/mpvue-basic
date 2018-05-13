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
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              store.commit('setUserInfo',res.userInfo);

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

  created () {
    // 调用应用实例的方法获取全局数据
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
