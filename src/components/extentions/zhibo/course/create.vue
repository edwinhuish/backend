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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="course">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="category_id">
              <Select v-model="course.category_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="讲师" prop="teacher_id">
              <Select v-model="course.teacher_id" :datas="teachers" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="课程标题" prop="title">
              <input v-model="course.title" type="text">
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem label="课程封面" prop="thumb">
              <image-upload v-model="course.thumb" name="课程封面" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <input v-model="course.charge" type="number">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="上架时间" prop="published_at">
              <DatePicker v-model="course.published_at" v-width="200" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="会员免费" prop="vip_can_view">
              <h-switch v-model="course.vip_can_view" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="course.is_show" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>
        </Row>

        <FormItem label="简短介绍" prop="short_description">
          <textarea v-model="course.short_description" rows="2" />
        </FormItem>
        <FormItem label="详细介绍" prop="description">
          <tinymce-editor v-model="course.original_desc" />
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
  data() {
    return {
      course: {
        category_id: null,
        teacher_id: null,
        title: '',
        thumb: '',
        charge: null,
        short_description: '',
        original_desc: '',
        published_at: '',
        is_show: 1,
        vip_can_view: 0
      },
      rules: {
        required: ['category_id', 'teacher_id', 'title', 'thumb', 'charge', 'short_description', 'original_desc', 'published_at', 'is_show']
      },
      teachers: [],
      categories: []
    }
  },
  mounted() {
    R.Extentions.zhibo.Course.Create().then(res => {
      this.teachers = res.data.teachers
      this.categories = res.data.categories
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.course.render_desc = this.course.original_desc
        R.Extentions.zhibo.Course.Store(this.course).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
