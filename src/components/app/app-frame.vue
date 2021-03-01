<style lang="less"></style>
<template>
  <div>
    <Layout v-if="!loading" class="app-frame" :sider-collapsed="siderCollapsed" :sider-fixed="layoutConfig.siderFixed">
      <Sider :theme="layoutConfig.siderTheme">
        <appMenu :theme="layoutConfig.siderTheme" />
      </Sider>
      <Layout :header-fixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead :layout-config="layoutConfig" @openSetting="openSetting = true" />
        </HHeader>
        <SysTabs v-if="layoutConfig.showSystab" home-page="Home" />
        <Content>
          <div class="app-frame-content">
            <!-- <keep-alive> -->
            <router-view />
            <!-- </keep-alive> -->
          </div>
          <HFooter>
            <appFooter />
          </HFooter>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="openSetting" type="drawer-right">
      <appLayoutSetting :layout-config="layoutConfig" />
    </Modal>
  </div>
</template>
<script>
import appLayoutSetting from './modules/app-layout-setting'
import appHead from './app-header'
import appMenu from './app-menu'
import appFooter from './app-footer'
import SysTabs from '../common/sys-tabs'
import store from '@/store'
import { mapState } from 'vuex'
import { fullMenuKeys } from '@/config/menu-config'

export default {
  components: {
    appHead,
    appMenu,
    SysTabs,
    appFooter,
    appLayoutSetting
  },
  data() {
    return {
      loading: true,
      openSetting: false,
      layoutConfig: {
        siderTheme: 'dark',
        showSystab: false,
        headerFixed: true,
        siderFixed: true
      }
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  mounted() {
    this.init()
    this.loading = false

    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      this.initMenu()
    })
    this.$once('hook:beforeDestroy', function() {
      G.removelistener(listener)
    })
  },
  methods: {
    init() {
      R.User.info().then(resp => {
        if (resp.ok) {
          const info = resp.data
          info.avatar = require('assets/images/avatar.png')
          G.set('account', info)
          store.dispatch('updateAccount', info)
          this.initMenu()
        }
      })
    },
    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value
    },
    initMenu() {
      // 如果使用权限配置，配合后端获取请求的数据
      // R.Account.menus().then(resp => {
      //   if (resp.ok) {
      //     this.menus = getMenus(resp.body);
      //     this.menuSelect();
      //   }
      // });
      const menus = Utils.getLocal2Json('SYS_CONFIG_MENU') || fullMenuKeys
      G.set('SYS_MENUS', menus)
      G.trigger('SYS_MENU_UPDATE')
      // if (!isAuthPage(this.$route.name)) {
      //   this.$router.replace({ name: 'PermissionError' });
      // }
    }
  }
}
</script>
