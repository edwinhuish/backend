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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="article">
        <Row :space="10">
          <Cell :width="8">
            <FormItem label="章节" prop="book_cid">
              <Select v-model="article.book_cid" :datas="cs" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="16">
            <FormItem label="标题" prop="title">
              <input v-model="article.title" type="text" placeholder="请输入标题">
            </FormItem>
          </Cell>
        </Row>
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <div v-width="100" class="h-input-group">
                <input v-model="article.charge" type="text">
                <span class="h-input-addon">元</span>
              </div>
              <warn text="价格为0即视为试看，可免费阅读" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="article.is_show" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="上架时间" prop="published_at">
              <DatePicker v-model="article.published_at" v-width="200" type="datetime" />
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="内容" prop="original_content">
          <mk-editor :text="article.original_content" @textChange="contentChange" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import MkEditor from '@/components/common/markdown.vue'

export default {
  components: {
    MkEditor
  },
  props: ['id'],
  data() {
    return {
      article: {
        bid: 0,
        book_cid: 0,
        title: '',
        original_content: '',
        render_content: '',
        published_at: '',
        charge: 0
      },
      rules: {
        required: ['bid', 'is_show', 'title', 'original_content', 'published_at']
      },
      books: [],
      chapters: []
    }
  },
  computed: {
    cs() {
      if (!this.article.bid) {
        return []
      }
      return this.chapters[this.article.bid]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    contentChange(val, renderVal) {
      this.article.original_content = val
      this.article.render_content = renderVal
    },
    init() {
      R.Extentions.meeduBooks.Article.Create().then(res => {
        this.books = res.data.books
        this.chapters = res.data.chapters
      })
      R.Extentions.meeduBooks.Article.Edit({ id: this.id }).then(res => {
        this.article = res.data

        // 保存
        localStorage.setItem('markdown_content_val', this.article.render_content)
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.article)
      }
    }
  }
}
</script>
