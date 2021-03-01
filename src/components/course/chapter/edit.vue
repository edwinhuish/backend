<template>
  <div class>
    <div class="h-panel w-800">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑</span>
        <div class="h-panel-right">
          <Button color="primary" @click="create">保存</Button>
          <Button :text="true" @click="$emit('close')">取消</Button>
        </div>
      </div>
      <div class="h-panel-body">
        <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="chapter">
          <FormItem label="章节名" prop="title">
            <template v-slot:label>章节名</template>
            <input v-model="chapter.title" type="text">
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input v-model="chapter.sort" type="number" min="0">
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Course from 'model/Course'
import Chapter from 'model/CourseChapter'

export default {
  props: ['id', 'cid'],
  data() {
    return {
      course: Course.parse({}),
      chapter: Chapter.parse({}),
      rules: {
        required: ['title', 'sort']
      }
    }
  },
  mounted() {
    this.course.id = this.cid
    this.chapter.id = this.id
    this.init()
  },
  methods: {
    init() {
      R.CourseChapter.Edit({ course_id: this.course.id, id: this.chapter.id }).then(resp => {
        this.chapter = resp.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        const data = this.chapter
        data.course_id = this.course.id
        R.CourseChapter.Update(data).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
