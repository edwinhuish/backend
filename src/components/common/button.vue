<template>
  <Button v-if="inPermission" :class="glass" :icon="icon" @click="$emit('click')">{{ text }}</Button>
</template>
<script>
export default {
  props: ['glass', 'icon', 'permission', 'text', 'isSuper'],
  computed: {
    inPermission() {
      if (typeof this.$store.state.User.permissions === 'undefined') {
        return false
      }
      const permissions = this.$store.state.User.permissions
      return typeof permissions[this.permission] !== 'undefined'
    }
  }
}
</script>
