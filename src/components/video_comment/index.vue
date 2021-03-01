<style lang="less" scoped>
.avatar {
  border-radius: 16px;
}
.red {
  color: red;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">视频评论</span>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Form>
          <Row :space="10">
            <Cell :width="6">
              <FormItem label="UID">
                <user-filter v-model="filter.user_id" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="课程">
                <Select v-model="filter.course_id" :filterable="true" :datas="courses" key-name="id" title-name="title" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="视频">
                <Select v-model="filter.video_id" :datas="getVideos" key-name="id" title-name="title" :filterable="true" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem>
                <Button color="primary" @click="getData(true)">搜索</Button>
                <Button class="h-btn" @click="reset">重置</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>

      <div class="float-box mb-10">
        <p-del-button text="批量删除" permission="video_comment.destroy" @click="deleteSubmit()" />
      </div>

      <div class="float-box mb-10">
        <Table ref="table" :loading="loading" :datas="datas" :checkbox="true">
          <TableItem prop="id" title="ID" :width="100" />
          <TableItem prop="user_id" title="用户ID" :width="100" />
          <TableItem prop="video_id" title="视频ID" :width="100" />
          <TableItem title="用户" :width="120">
            <template slot-scope="{ data }">
              <span v-if="users[data.user_id]">{{ users[data.user_id].nick_name }}</span>
              <span v-else class="red">不存在</span>
            </template>
          </TableItem>
          <TableItem title="视频">
            <template slot-scope="{ data }">
              <b v-if="data.video">{{ data.video.title }}</b>
              <span v-else class="red">已删除</span>
            </template>
          </TableItem>
          <TableItem title="内容">
            <template slot-scope="{ data }">
              <p v-html="data.render_content" />
            </template>
          </TableItem>
          <TableItem title="时间" :width="120">
            <template slot-scope="{ data }">
              <date-text :date="data.created_at" />
            </template>
          </TableItem>
        </Table>
      </div>

      <div class="float-box mb-10">
        <Pagination v-model="pagination" align="right" @change="changePage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false,
      filter: {
        user_id: 0,
        course_id: null,
        video_id: null
      },
      courses: [],
      videos: [],
      users: []
    }
  },
  computed: {
    getVideos() {
      if (!this.filter.course_id) {
        return []
      }
      return this.videos[this.filter.course_id]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData(true)
    },
    changePage() {
      this.getData()
    },
    reset() {
      this.filter = {
        course_id: null,
        video_id: null,
        user_id: null
      }
      this.getData(true)
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1
      }
      this.loading = true
      const data = this.pagination
      Object.assign(data, this.filter)
      R.VideoComment.List(data).then(resp => {
        this.datas = resp.data.data.data
        this.pagination.total = resp.data.data.total
        this.videos = resp.data.videos
        this.courses = resp.data.courses
        this.users = resp.data.users
        this.loading = false
      })
    },
    deleteSubmit() {
      const items = this.$refs.table.getSelection()
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的评论')
        return
      }
      this.loading = true
      const ids = []
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id)
      }
      R.VideoComment.Delete({ ids: ids }).then(resp => {
        HeyUI.$Message.success('成功')
        this.getData()
      })
    }
  }
}
</script>
