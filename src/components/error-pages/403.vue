<style lang="less">
.page-403-vue {
  .background-image {
    background-image: url(~assets/images/error-pages/403.png);
  }
}
</style>
<template>
  <div class="page-403-vue error-page">
    <div class="background-image" />
    <p>您无权访问此页面~~</p>
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
