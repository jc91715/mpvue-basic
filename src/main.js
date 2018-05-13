import Vue from 'vue'
import App from './App'
import './weui.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/person/main',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#1AAD16',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      /* eslint-disable */
      list: [{
        pagePath: 'pages/index/main',
        text: '预约',
        iconPath: './static/images/list.png',
        selectedIconPath: './static/images/select_list.png'

      },

        {
          pagePath: 'pages/person/main',
          text: '我的',
          iconPath: './static/images/me.png',
          selectedIconPath: './static/images/select_me.png'

        }
      ]
      /* eslint-enable */
    }
  }
}
