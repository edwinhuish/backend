<style lang="less">
.sub-menu-vue {
  .h-menu {
    font-size: 14px;
  }
}
</style>
<template>
  <div class="sub-menu-vue">
    <Menu ref="menu" :datas="datas" class-name="h-menu-white" @click="trigger" />
  </div>
</template>
<script>
export default {
  props: {
    datas: Array
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    $route() {
      this.menuSelect()
    }
  },
  mounted() {
    this.menuSelect()
  },
  methods: {
    menuSelect() {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name)
      }
    },
    trigger(data) {
      this.$router.push({ name: data.key })
    }
  }
}
</script>
