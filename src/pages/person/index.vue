<template>
<div class="page">

  <p class="center">欢迎来到 U·美  ³℅ 造型</p>

  <div class="center">
      <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" style="width: 132px;height: 132px;border-radius: 80px;margin: 0 auto"/>
      <card :text="userInfo.nickName"></card>
    </div>

  <p class="center">  <button open-type="getUserInfo" @getuserinfo="userInfoHandler" size="mini"> 查看预约记录 </button>
  </p>

</div>
</template>

<script>
import card from '@/components/card'
import store from '@/utils/store'
export default {
  data () {
    return {
      motto: 'Hello World',
    }
  },

  components: {
    card
  },
  computed: {
    userInfo () {
      console.log('person store.state.userInfo')
      return store.state.userInfo
    }
  },
  methods: {
    userInfoHandler(e){
      store.commit('setUserInfo',e.mp.detail.userInfo);
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
  },
  created () {
    // 调用应用实例的方法获取全局数据
    console.log('person created')
    if(!store.state.userInfo.avatarUrl){
      this.getUserInfo()
    }
  }
}
</script>

<style scoped>
.center{
  text-align: center;
}
</style>
