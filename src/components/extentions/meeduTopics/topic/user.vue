<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">订单</span>
      <div class="h-panel-right">
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
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
            <Cell :width="12">
              <FormItem>
                <Button color="primary" @click="getData(true)">过滤</Button>
                <Button @click="reset()">重置</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>

      <div class="float-box mb-10">
        <Table :loading="loading" :datas="datas">
          <TableItem title="用户ID" prop="user_id" :width="120" />
          <TableItem title="用户">
            <template slot-scope="{ data }">
              <span v-if="data.user">{{ data.user.nick_name }}</span>
              <span v-else class="c-red">已删除</span>
            </template>
          </TableItem>
          <TableItem prop="charge" title="价格" unit="元" :width="100" />
          <TableItem prop="created_at" title="时间" :width="200" />
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
  props: ['id'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      filter: {
        user_id: null
      },
      datas: [],
      loading: false
    }
  },
  mounted() {
    this.getData(true)
  },
  methods: {
    reset() {
      this.filter.user_id = null
      this.getData(true)
    },
    changePage() {
      this.getData()
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1
      }
      this.loading = true
      const data = this.pagination
      data.topic_id = this.id
      data.user_id = this.filter.user_id
      R.Extentions.meeduTopics.Order.Index(data).then(resp => {
        this.datas = resp.data.data.data
        this.pagination.total = resp.data.data.total
        this.loading = false
      })
    }
  }
}
</script>
