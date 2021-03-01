<style lang="less"></style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
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
          <Cell :width="24">
            <FormItem v-if="video.service === 'tencent'" label="腾讯云回放视频id" prop="tencent_video_id">
              <input v-model="video.tencent_video_id" type="text">
            </FormItem>
            <FormItem v-else-if="video.service === 'aliyun'" label="阿里云回放视频id" prop="aliyun_video_id">
              <input v-model="video.aliyun_video_id" type="text">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      video: {
        course_id: null,
        chapter_id: null,
        title: '',
        published_at: '',
        is_show: 1,
        tencent_video_id: null,
        aliyun_video_id: null
      },
      rules: {
        required: ['course_id', 'chapter_id', 'title', 'published_at', 'is_show']
      },
      courses: [],
      chapters: []
    }
  },
  mounted() {
    R.Extentions.zhibo.CourseVideo.Create().then(res => {
      this.courses = res.data.courses
      this.chapters = res.data.chapters
    })
    R.Extentions.zhibo.CourseVideo.Edit({ id: this.id }).then(res => {
      this.video = res.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.zhibo.CourseVideo.Update(this.video).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
