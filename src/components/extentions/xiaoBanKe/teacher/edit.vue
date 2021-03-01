<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="teacher">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="讲师名" prop="name">
              <input v-model="teacher.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="头像" prop="avatar">
              <image-upload v-model="teacher.avatar" name="头像" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="邮箱" prop="username">
              <input v-model="teacher.username" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="密码" prop="password">
              <input v-model="teacher.password" type="text">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="简介" prop="short_desc">
              <textarea v-model="teacher.short_desc" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
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
        required: ['name', 'avatar', 'short_desc', 'password']
      }
    }
  },
  mounted() {
    R.Extentions.xiaoBanKe.Teacher.Edit({ id: this.id }).then(res => {
      this.teacher = res.data.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.xiaoBanKe.Teacher.Update(this.teacher).then(resp => {
          this.$emit('success')
        })
      }
    }
  }
}
</script>
