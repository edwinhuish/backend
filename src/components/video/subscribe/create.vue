<style lang="less"></style>
<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="data">
        <FormItem label="UID" prop="user_id">
          <input v-model="data.user_id" type="text" placeholder="用户ID">
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      data: {
        video_id: this.id,
        user_id: null
      },
      rules: {
        required: ['user_id']
      }
    }
  },
  watch: {
    id(newVal) {
      this.data.video_id = newVal
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Video.SubscribeCreate(this.data).then(() => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
