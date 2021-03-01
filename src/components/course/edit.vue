<style lang="less"></style>
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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="course">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="category_id">
              <Select v-model="course.category_id" :datas="courseCategories" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <input v-model="course.charge" type="number" placeholder="单位：元">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="上架时间" prop="published_at">
              <DatePicker v-model="course.published_at" v-width="200" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="course.is_show" :true-value="1" :false-value="-1" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="推荐" prop="is_rec">
              <h-switch v-model="course.is_rec" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="18">
            <FormItem label="课程名" prop="title">
              <input v-model="course.title" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="评论开关" prop="comment_status">
              <Select v-model="course.comment_status" :datas="commentStatus" />
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="Slug" prop="slug">
          <input v-model="course.slug" type="text" placeholder="不清楚可不填写">
        </FormItem>

        <FormItem label="课程封面" prop="thumb">
          <image-upload v-model="course.thumb" name="课程封面" help="长宽比4:3，建议尺寸：400x300像素" />
        </FormItem>

        <FormItem label="简短介绍" prop="short_description">
          <textarea v-model="course.short_description" rows="2" />
        </FormItem>

        <FormItem label="详细介绍" prop="original_desc">
          <tinymce-editor v-model="course.original_desc" />
        </FormItem>

        <FormItem label="SEO描述" prop="seo_description">
          <textarea v-model="course.seo_description" rows="2" />
        </FormItem>
        <FormItem label="SEO关键字" prop="seo_keywords">
          <textarea v-model="course.seo_keywords" rows="1" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce'

import Course from 'model/Course'

export default {
  components: { TinymceEditor },
  props: ['id'],
  data() {
    return {
      course: Course.parse({}),
      rules: {
        required: [
          'category_id',
          'thumb',
          'title',
          'charge',
          'short_description',
          'published_at',
          'is_show',
          'is_rec',
          'comment_status',
          'original_desc'
        ]
      },
      courseCategories: [],
      commentStatus: [
        {
          title: '关闭评论',
          key: 0
        },
        {
          title: '所有人均可评论',
          key: 1
        },
        {
          title: '订阅后可评论',
          key: 2
        }
      ]
    }
  },
  mounted() {
    this.init()
    this.getCourseCategories()
  },
  methods: {
    getCourseCategories() {
      R.Course.CreateParams().then(resp => {
        this.courseCategories = resp.data.categories
      })
    },
    init() {
      R.Course.Edit({ id: this.id }).then(resp => {
        this.course = resp.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.course.render_desc = this.course.original_desc
        R.Course.Update(this.course).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
