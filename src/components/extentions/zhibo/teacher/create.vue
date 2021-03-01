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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="teacher">
        <Row :space="10">
          <Cell :width="8">
            <FormItem label="讲师名" prop="name">
              <input v-model="teacher.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="邮箱" prop="username">
              <input v-model="teacher.username" type="text">
              <warn text="用于教师登录" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="密码" prop="password">
              <input v-model="teacher.password" type="text">
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="头像" prop="avatar">
          <image-upload v-model="teacher.avatar" name="头像" />
        </FormItem>
        <FormItem label="简介" prop="short_desc">
          <textarea v-model="teacher.short_desc" rows="3" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacher: {
        name: '',
        avatar: '',
        short_desc: '',
        username: '',
        password: ''
      },
      rules: {
        required: ['name', 'avatar', 'short_desc', 'username', 'password']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.teacher)
      }
    }
  }
}
</script>
