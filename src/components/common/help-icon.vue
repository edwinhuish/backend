<template>
  <i v-tooltip class="h-icon-help" trigger="click" :content="text" />
</template>
<script>
export default {
  props: ['text']
}
</script>
