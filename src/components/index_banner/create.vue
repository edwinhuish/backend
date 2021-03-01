<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="banner">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="Banner名" prop="name">
              <input v-model="banner.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="升序" prop="sort">
              <input v-model="banner.sort" type="number">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="课程" prop="course_ids">
              <Select v-model="banner.course_ids" :datas="courses" key-name="id" title-name="title" :multiple="true" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banner: {
        name: '',
        sort: 0,
        course_ids: []
      },
      rules: {
        required: ['name', 'course_ids', 'sort']
      },
      courses: []
    }
  },
  mounted() {
    R.IndexBanner.Create().then(res => {
      this.courses = res.data.courses
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.IndexBanner.Store(this.banner).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
