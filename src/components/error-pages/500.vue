<style lang="less">
.page-500-vue {
  .background-image {
    background-image: url(~assets/images/error-pages/500.png);
  }
}
</style>
<template>
  <div class="page-500-vue error-page">
    <div class="background-image" />
    <p>您访问的页面出现错误~~</p>
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
