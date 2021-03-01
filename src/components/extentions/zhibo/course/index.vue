<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">直播课程</span>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Form>
          <Row :space="10">
            <Cell :width="6">
              <FormItem label="分类" prop="category_id">
                <Select v-model="filter.category_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="讲师" prop="teacher_id">
                <Select v-model="filter.teacher_id" :datas="teachers" key-name="id" title-name="name" :filterable="true" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="搜索" prop="title">
                <input v-model="filter.keywords" type="text" placeholder="请输入关键字">
              </FormItem>
            </Cell>
            <Cell :width="6">
              <Button color="primary" @click="getData()">过滤</Button>
              <Button @click="reset">重置</Button>
            </Cell>
          </Row>
        </Form>
      </div>
      <div class="float-box mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.Zhibo.course_category.list"
          text="直播课程分类"
          @click="showCategoryPage()"
        />
        <p-button
          glass="h-btn h-btn-primary"
          permission="addons.Zhibo.course_comment"
          text="直播课程评论"
          @click="showCourseCommentPage()"
        />
        <p-button glass="h-btn h-btn-primary" icon="h-icon-plus" permission="addons.Zhibo.course.store" text="添加" @click="create()" />
      </div>
      <div class="float-box mb-10">
        <Table :loading="loading" :datas="datas">
          <TableItem prop="id" title="ID" :width="80" />
          <TableItem title="分类" :width="100">
            <template slot-scope="{ data }">
              <span v-if="data.category">{{ data.category.name }}</span>
              <span v-else class="red">已删除</span>
            </template>
          </TableItem>
          <TableItem title="讲师" :width="100">
            <template slot-scope="{ data }">
              <span v-if="data.teacher">{{ data.teacher.name }}</span>
              <span v-else class="red">已删除</span>
            </template>
          </TableItem>
          <TableItem prop="title" title="课程名" />
          <TableItem prop="charge" title="价格" unit="元" :width="80" />
          <TableItem prop="join_user_times" title="学员" :width="100" unit="人" />
          <TableItem title="会员" :width="50">
            <template slot-scope="{ data }">
              <span v-if="data.vip_can_view === 1" class="red">免费</span>
              <span v-else>否</span>
            </template>
          </TableItem>
          <TableItem title="操作" align="center" :width="400">
            <template slot-scope="{ data }">
              <p-del-button permission="addons.Zhibo.course.delete" @click="remove(datas, data)" />
              <p-button glass="h-btn h-btn-s h-btn-primary" permission="addons.Zhibo.course.update" text="编辑" @click="edit(data)" />

              <p-button
                glass="h-btn h-btn-s h-btn-primary"
                permission="addons.Zhibo.course_chapter.list"
                text="章节"
                @click="goChapters(data)"
              />

              <p-button
                glass="h-btn h-btn-s h-btn-primary"
                permission="addons.Zhibo.course_video.list"
                text="内容安排"
                @click="goVideosPage(data)"
              />

              <p-button
                glass="h-btn h-btn-s h-btn-primary"
                permission="addons.Zhibo.course.users"
                text="购买用户"
                @click="subscribeUsers(data)"
              />
            </template>
          </TableItem>
        </Table>
      </div>

      <div class="float-box mb-10">
        <Pagination v-if="pagination.total > 0" v-model="pagination" class="mt-10" align="right" @change="changePage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 0,
        keywords: ''
      },
      filter: {
        teacher_id: null,
        category_id: null,
        keywords: null
      },
      loading: false,
      teachers: [],
      categories: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    reset() {
      this.filter = {
        teacher_id: null,
        category_id: null,
        keywords: null
      }
      this.getData(true)
    },
    changePage() {
      this.getData()
    },
    getData(reset = false) {
      if (reset) {
        this.pagination.page = 1
        this.keywords = ''
      }
      this.loading = true
      const data = this.pagination
      Object.assign(data, this.filter)
      R.Extentions.zhibo.Course.List(data).then(resp => {
        this.datas = resp.data.data.data
        this.pagination.total = resp.data.data.total
        this.teachers = resp.data.teachers
        this.categories = resp.data.categories
        this.loading = false
      })
    },
    create() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./create'], resolve)
          }
        },
        events: {
          success: (modal, data) => {
            modal.close()
            this.getData(true)
          }
        }
      })
    },
    remove(data, item) {
      R.Extentions.zhibo.Course.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功')
        this.getData()
      })
    },
    edit(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./edit'], resolve)
          },
          datas: {
            id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close()
            this.getData()
          }
        }
      })
    },
    goChapters(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_chapter/index'], resolve)
          },
          datas: {
            course_id: item.id
          }
        }
      })
    },
    showCategoryPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_category/index'], resolve)
          }
        }
      })
    },
    showTeacherPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../teacher/index'], resolve)
          }
        }
      })
    },
    showCourseCommentPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_comment/index'], resolve)
          }
        }
      })
    },
    goVideosPage(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../course_video/index'], resolve)
          },
          datas: {
            course_id: item.id
          }
        }
      })
    },
    subscribeUsers(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./users'], resolve)
          },
          datas: {
            course_id: item.id
          }
        }
      })
    }
  }
}
</script>
