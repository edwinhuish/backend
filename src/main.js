import Vue from 'vue'
import App from './App'

import heyuiConfig from './config/heyui-config'
import routerConfig from './config/router-config'
import store from './store'
import './vue/components'
import './vue/filters'

// 全局组件
import ImageUpload from './components/common/image'
import Warn from './components/common/warn'
import PButton from './components/common/button'
import PDelButton from './components/common/del-button'
import CopyText from './components/common/copytext'
import InputDuration from './components/common/duration'
import UserFilter from './components/common/user-filter/index'
import DateText from './components/common/datetext'
import HelpIcon from './components/common/help-icon'

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// import './assets/js/es6-promise.min.js';
import './assets/js/aliyun-oss-sdk-5.3.1.min.js'
import './assets/js/aliyun-upload-sdk-1.5.0.min.js'

Vue.component('ImageUpload', ImageUpload)
Vue.component('Warn', Warn)
Vue.component('PButton', PButton)
Vue.component('PDelButton', PDelButton)
Vue.component('copytext', CopyText)
Vue.component('InputDuration', InputDuration)
Vue.component('UserFilter', UserFilter)
Vue.component('DateText', DateText)
Vue.component('HelpIcon', HelpIcon)
Vue.use(mavonEditor)

require('./assets/css/app.less')

// 开发环境判断
// process.env.NODE_ENV == 'development'

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

heyuiConfig()
Vue.use(HeyUI)

const router = routerConfig()

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
