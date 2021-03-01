<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">修改密码</span></div>
      <div class="h-panel-body">
        <Form ref="form" v-width="600" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="user">
          <FormItem label="原密码" prop="old_password">
            <template v-slot:label>原密码</template>
            <input v-model="user.old_password" type="password">
          </FormItem>
          <FormItem label="新密码" prop="new_password">
            <template v-slot:label>新密码</template>
            <input v-model="user.new_password" type="password">
          </FormItem>
          <FormItem label="再输入一次新密码" prop="new_password_confirmation">
            <template v-slot:label>再输入一次新密码</template>
            <input v-model="user.new_password_confirmation" type="password">
          </FormItem>
          <FormItem>
            <Button color="primary" @click="change">确认修改</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      userCopy: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      rules: {
        required: ['old_password', 'new_password', 'new_password_confirmation']
      }
    }
  },
  methods: {
    change() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Administrator.ChangePassword(this.user).then(resp => {
          HeyUI.$Message.success('成功')
          this.user = this.userCopy
        })
      }
    }
  }
}
</script>
