<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="announcement">
        <FormItem label="标题" prop="title">
          <input v-model="announcement.title" type="text">
        </FormItem>
        <FormItem label="内容" prop="announcement">
          <tinymce-editor v-model="announcement.announcement" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce'

export default {
  components: { TinymceEditor },
  props: ['id'],
  data() {
    return {
      announcement: {
        title: '',
        announcement: ''
      },
      rules: {
        required: ['title', 'announcement']
      }
    }
  },
  mounted() {
    R.Announcement.Edit({ id: this.id }).then(res => {
      this.announcement = res.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Announcement.Update(this.announcement).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
