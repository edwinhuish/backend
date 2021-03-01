<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="form">
        <Row :space="10">
          <Cell :width="24">
            <FormItem label="标题" prop="title">
              <input v-model="form.title" type="text" placeholder="标题">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="内容" prop="content">
              <tinymce-editor v-model="form.content" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '@/components/common/tinymce'

export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      rules: {
        required: ['title', 'content']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.form)
      }
    }
  }
}
</script>
