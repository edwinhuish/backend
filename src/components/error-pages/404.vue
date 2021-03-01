<style lang="less">
.page-404-vue {
  .background-image {
    background-image: url(~assets/images/error-pages/404.png);
  }
}
</style>
<template>
  <div class="page-404-vue error-page">
    <div class="background-image" />
    <p>您访问的页面不存在~~</p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>
