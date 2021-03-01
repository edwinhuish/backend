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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="topic">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="cid">
              <Select v-model="topic.cid" :datas="categories" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="标题" prop="title">
              <input v-model="topic.title" type="text">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="封面" prop="thumb">
              <image-upload v-model="topic.thumb" name="封面" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="topic.is_show" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="价格" prop="charge">
              <input v-model="topic.charge" type="number" min="0" max="2000">
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem v-if="topic.charge > 0" label="会员免费" prop="is_vip_free">
              <h-switch v-model="topic.is_vip_free" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="排序时间" prop="sorted_at">
              <DatePicker v-model="topic.sorted_at" type="datetime" />
            </FormItem>
          </Cell>
        </Row>
        <FormItem label="免费内容" prop="free_content">
          <markdown id="freeContent" :text="topic.free_content" @textChange="freeContentChange" />
        </FormItem>
        <FormItem label="文章内容" prop="original_content">
          <markdown id="originalContent" :text="topic.original_content" @textChange="contentChange" />
        </FormItem>

        <Row :space="10">
          <Cell :width="12">
            <FormItem label="SEO关键字" prop="seo_keywords">
              <textarea v-model="topic.seo_keywords" rows="2" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="SEO描述" prop="seo_description">
              <textarea v-model="topic.seo_description" rows="2" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import markdown from '@/components/common/markdown'

export default {
  components: {
    markdown
  },
  props: ['id'],
  data() {
    return {
      topic: {
        cid: '',
        title: '',
        is_show: 0,
        is_need_login: 0,
        is_vip_free: 0,
        free_content: '',
        free_content_render: '',
        charge: 0,
        original_content: '',
        sorted_at: null,
        seo_keywords: '',
        seo_description: ''
      },
      rules: {
        required: ['cid', 'title', 'is_show', 'original_content', 'thumb']
      },
      categories: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Extentions.meeduTopics.Topic.Edit({ id: this.id }).then(res => {
        this.topic = res.data
      })
      R.Extentions.meeduTopics.Category.List().then(res => {
        this.categories = res.data
      })
    },
    freeContentChange(ori, render) {
      this.topic.free_content = ori
      this.topic.free_content_render = render
    },
    contentChange(ori, render) {
      this.topic.original_content = ori
      this.topic.render_content = render
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.topic)
      }
    }
  }
}
</script>
