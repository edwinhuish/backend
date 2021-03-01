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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="video">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="章节" prop="chapter_id">
              <Select v-model="video.chapter_id" :datas="chapters[video.course_id]" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="标题" prop="title">
              <input v-model="video.title" type="text">
            </FormItem>
          </Cell>
        </Row>
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="直播时间" prop="published_at">
              <DatePicker v-model="video.published_at" v-width="200" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="2" />
          <Cell :width="4">
            <FormItem label="是否显示" prop="is_show">
              <h-switch v-model="video.is_show" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['course_id'],
  data() {
    return {
      video: {
        course_id: null,
        chapter_id: null,
        title: '',
        published_at: '',
        is_show: 1
      },
      rules: {
        required: ['course_id', 'chapter_id', 'title', 'published_at', 'is_show']
      },
      courses: [],
      chapters: []
    }
  },
  mounted() {
    this.video.course_id = this.course_id

    R.Extentions.zhibo.CourseVideo.Create().then(res => {
      this.courses = res.data.courses
      this.chapters = res.data.chapters
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.zhibo.CourseVideo.Store(this.video).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
