<style lang="less" scoped>
.original-charge {
  text-decoration: line-through;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">团购</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <Form>
          <Row :space="10">
            <Cell :width="6">
              <FormItem label="关键字">
                <input v-model="filter.keywords" type="text" placeholder="关键字搜索">
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="商品类型">
                <Select v-model="filter.type" :filterable="true" :datas="types" key-name="value" title-name="name" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <Button color="primary" @click="getData(true)">搜索</Button>
              <Button @click="reset">重置</Button>
            </Cell>
          </Row>
        </Form>
      </div>

      <div class="mb-10">
        <p-button glass="h-btn h-btn-primary" icon="h-icon-plus" permission="addons.TuanGou.goods.store" text="添加" @click="create()" />

        <p-button glass="h-btn h-btn-primary" permission="addons.TuanGou.orders" text="订单" @click="showOrdersPage()" />

        <p-button glass="h-btn h-btn-primary" permission="addons.TuanGou.refund" text="退款" @click="showRefundPage()" />
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID" :width="80" />
        <TableItem prop="other_id" title="商品ID" :width="80" />
        <TableItem prop="goods_type_text" title="类型" :width="80" />
        <TableItem prop="goods_title" title="商品" />
        <TableItem title="价格" :width="150">
          <template slot-scope="{ data }">
            <span>￥{{ data.charge }}</span>
            /
            <span class="original-charge">￥{{ data.original_charge }}</span>
          </template>
        </TableItem>
        <TableItem prop="people_num" title="人数" unit="人" :width="80" />
        <TableItem title="时间" :width="200">
          <template slot-scope="{ data }">
            <span>{{ data.started_at }}</span>
            -
            <span>{{ data.ended_at }}</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.TuanGou.goods.delete" @click="remove(datas, data)" />
            <p-button glass="h-btn h-btn-s h-btn-primary" permission="addons.TuanGou.goods.edit" text="编辑" @click="edit(data)" />

            <p-button glass="h-btn h-btn-s h-btn-primary" permission="addons.TuanGou.goods.items" text="团列表" @click="showItems(data)" />
          </template>
        </TableItem>
      </Table>

      <Pagination v-model="pagination" class="mt-10" align="right" @change="changePage" />
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
      courses: [],
      filter: {
        type: null,
        keywords: null
      },
      types: []
    }
  },
  mounted() {
    this.getData(true)
  },
  methods: {
    reset() {
      this.filter.type = null
      this.filter.keywords = null
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
      const data = Object.assign(this.filter, this.pagination)
      R.Extentions.tuanGou.Goods.List(data).then(resp => {
        this.datas = resp.data.data.data
        this.pagination.total = resp.data.data.total
        this.types = resp.data.types
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
      R.Extentions.tuanGou.Goods.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功')
        this.getData(true)
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
    showItems(item) {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./items'], resolve)
          },
          datas: {
            id: item.id
          }
        }
      })
    },
    showOrdersPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../orders/index'], resolve)
          }
        }
      })
    },
    showRefundPage() {
      this.$Modal({
        hasCloseIcon: true,
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['../refund/index'], resolve)
          }
        }
      })
    }
  }
}
</script>
