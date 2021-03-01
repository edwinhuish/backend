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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="chapter">
        <Row :space="10">
          <Cell :width="12">
            <FormItem label="章节名" prop="name">
              <input v-model="chapter.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="排序" prop="sort">
              <input v-model="chapter.sort" type="number">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['course_id', 'id'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        course_id: this.course_id
      },
      rules: {
        required: ['name', 'sort']
      }
    }
  },
  mounted() {
    R.Extentions.zhibo.CourseChapter.Edit({ id: this.id }).then(res => {
      this.chapter = res.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.chapter)
      }
    }
  }
}
</script>
