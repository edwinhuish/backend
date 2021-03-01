<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="page">
        <FormItem label="唯一标识" prop="sign">
          <template v-slot:label>唯一标识</template>
          <input v-model="page.sign" type="text">
        </FormItem>
        <FormItem label="标题" prop="title">
          <template v-slot:label>标题</template>
          <input v-model="page.title" type="text">
        </FormItem>
        <FormItem label="Seo关键字" prop="title">
          <template v-slot:label>Seo关键字</template>
          <input v-model="page.seo_keywords" type="text">
        </FormItem>
        <FormItem label="Seo描述" prop="title">
          <template v-slot:label>Seo描述</template>
          <input v-model="page.seo_description" type="text">
        </FormItem>
        <FormItem label="内容" prop="content">
          <template v-slot:label>内容</template>
          <tinymce-editor v-model="page.content" />
        </FormItem>
        <FormItem label="继承布局" prop="is_show">
          <template v-slot:label>继承布局</template>
          <h-switch v-model="page.is_inherit" />
        </FormItem>
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
  props: ['id'],
  data() {
    return {
      page: {
        sign: '',
        title: '',
        seo_keywords: '',
        seo_description: '',
        content: '',
        is_inherit: 1
      },
      rules: {
        required: ['sign', 'title', 'content']
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Extentions.singlePage.Page.Edit({ id: this.id }).then(res => {
        this.page = res.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.page)
      }
    }
  }
}
</script>
