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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="course">
        <Row :space="10">
          <Cell :width="24">
            <FormItem label="课程标题" prop="title">
              <input v-model="course.title" type="text">
            </FormItem>
          </Cell>

          <Cell :width="6">
            <FormItem label="类型" prop="type">
              <Select v-model="course.type" :datas="courseTypes" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="分类" prop="category_id">
              <Select v-model="course.category_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="老师" prop="teacher_ids">
              <Select v-model="course.teacher_ids" :datas="teachers" :multiple="true" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="course.is_show" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>

          <Cell :width="24">
            <FormItem label="课程封面" prop="thumb">
              <image-upload v-model="course.thumb" name="课程封面" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <div class="h-input-group">
                <input v-model="course.charge" type="text">
                <span class="h-input-addon">元</span>
              </div>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="原价" prop="original_charge">
              <div class="h-input-group">
                <input v-model="course.original_charge" type="text">
                <span class="h-input-addon">元</span>
              </div>
            </FormItem>
          </Cell>

          <Cell :width="6">
            <FormItem label="开课时间" prop="open_at">
              <DatePicker v-model="course.open_at" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="结课时间" prop="over_at">
              <DatePicker v-model="course.over_at" type="datetime" />
            </FormItem>
          </Cell>

          <Cell :width="24">
            <FormItem label="简短介绍" prop="short_desc">
              <textarea v-model="course.short_desc" />
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="详细介绍" prop="description">
              <tinymce-editor v-model="course.original_desc" />
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
  data() {
    return {
      course: {
        type: null,
        category_id: null,
        title: '',
        thumb: '',
        charge: null,
        original_charge: null,
        short_desc: '',
        original_desc: '',
        is_show: 1,
        max_people_num: null,
        start_at: null,
        end_at: null,
        open_at: null,
        over_at: null,
        teacher_ids: null
      },
      rules: {
        required: [
          'open_at',
          'over_at',
          'teacher_ids',
          'type',
          'category_id',
          'title',
          'thumb',
          'charge',
          'original_charge',
          'short_desc',
          'original_desc',
          'is_show',
          'max_people_num'
        ]
      },
      teachers: [],
      categories: [],
      courseTypes: [
        {
          id: 0,
          name: '小班课'
        },
        {
          id: 1,
          name: '大班课'
        },
        {
          id: 2,
          name: '直播课'
        },
        {
          id: 3,
          name: '1v1'
        }
      ]
    }
  },
  watch: {
    'course.type'() {
      if (this.course.type === 0) {
        this.course.max_people_num = 6
      } else if (this.course.type === 1) {
        // 大班课
        this.course.max_people_num = 200
      } else if (this.course.type === 2) {
        // 直播课
        this.course.max_people_num = 0
      } else if (this.course.type === 3) {
        // 1v1
        this.course.max_people_num = 1
      }
    }
  },
  mounted() {
    R.Extentions.xiaoBanKe.Course.Create().then(res => {
      this.teachers = res.data.teachers
      this.categories = res.data.categories
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        const data = this.course
        data.render_desc = this.course.original_desc
        R.Extentions.xiaoBanKe.Course.Store(data).then(() => {
          this.$emit('success')
        })
      }
    }
  }
}
</script>
