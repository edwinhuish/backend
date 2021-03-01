<style lang="less"></style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="administrator">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="角色" prop="role_id">
              <Select
                v-model="administrator.role_id"
                :datas="roles"
                key-name="id"
                title-name="display_name"
                :filterable="true"
                :multiple="true"
              />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="姓名" prop="name">
              <input v-model="administrator.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="邮箱" prop="email">
              <input v-model="administrator.email" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="密码" prop="password">
              <input v-model="administrator.password" type="text">
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="禁止登录" prop="is_ban_login">
          <h-switch v-model="administrator.is_ban_login" :true-value="1" :false-value="0" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import Administrator from 'model/Administrator'

export default {
  data() {
    return {
      administrator: Administrator.parse({}),
      rules: {
        required: ['name', 'email', 'password']
      },
      roles: []
    }
  },
  mounted() {
    R.Administrator.Create().then(res => {
      this.roles = res.data.roles
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        const data = this.administrator
        data.password_confirmation = data.password
        this.$emit('success', data)
      }
    }
  }
}
</script>
