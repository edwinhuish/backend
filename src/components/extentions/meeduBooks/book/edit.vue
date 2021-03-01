<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="update">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="book">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="cid">
              <Select v-model="book.cid" :datas="categories" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="书名" prop="name">
              <input v-model="book.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="封面" prop="thumb">
              <image-upload v-model="book.thumb" name="封面" />
            </FormItem>
          </Cell>
        </Row>
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <div class="h-input-group">
                <input v-model="book.charge" type="text">
                <span class="h-input-addon">元</span>
              </div>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="订阅人数" prop="user_count">
              <div class="h-input-group">
                <input v-model="book.user_count" type="text">
                <span class="h-input-addon">人</span>
              </div>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="上架时间" prop="published_at">
              <DatePicker v-model="book.published_at" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="book.is_show" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="会员免费" prop="is_vip_free">
              <h-switch v-model="book.is_vip_free" />
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="简短介绍" prop="short_desc">
          <textarea v-model="book.short_desc" />
        </FormItem>

        <FormItem label="详情介绍" prop="original_desc">
          <tinymce-editor v-model="book.original_desc" />
        </FormItem>

        <Row :space="10">
          <Cell :width="12">
            <FormItem label="SEO描述" prop="seo_description">
              <textarea v-model="book.seo_description" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="SEO关键字" prop="seo_keywords">
              <textarea v-model="book.seo_keywords" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../../../common/tinymce'

export default {
  components: {
    TinymceEditor
  },
  props: ['id'],
  data() {
    return {
      book: {
        cid: '',
        name: '',
        is_show: 0,
        original_desc: '',
        thumb: '',
        charge: 0,
        short_desc: '',
        published_at: '',
        seo_description: '',
        seo_keywords: '',
        is_vip_free: 0,
        user_count: 0
      },
      rules: {
        required: ['cid', 'name', 'is_show', 'original_desc', 'thumb', 'charge', 'short_desc', 'published_at', 'is_vip_free']
      },
      categories: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Extentions.meeduBooks.Book.Create().then(res => {
        this.categories = res.data.categories
      })
      R.Extentions.meeduBooks.Book.Edit({ id: this.id }).then(res => {
        this.book = res.data
      })
    },
    update() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.book.render_desc = this.book.original_desc
        this.$emit('success', this.book)
      }
    }
  }
}
</script>
