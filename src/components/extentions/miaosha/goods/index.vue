<style lang="less" scoped>
.original-charge {
  text-decoration: line-through;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">秒杀商品</span>
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
        <p-button glass="h-btn h-btn-primary" icon="h-icon-plus" permission="addons.MiaoSha.goods.store" text="添加" @click="create()" />
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID" :width="80" />
        <TableItem prop="goods_id" title="商品ID" :width="80" />
        <TableItem prop="goods_type_text" title="类型" :width="100" />
        <TableItem prop="goods_title" title="商品" />
        <TableItem title="价格" :width="150">
          <template slot-scope="{ data }">
            <span>￥{{ data.charge }}</span>/
            <span class="original-charge">￥{{ data.original_charge }}</span>
          </template>
        </TableItem>
        <TableItem title="库存" :width="120">
          <template slot-scope="{ data }">
            <span>{{ data.over_num }}</span>
            /
            <span>{{ data.num }}</span>
          </template>
        </TableItem>
        <TableItem title="时间">
          <template slot-scope="{ data }">
            <span>{{ data.started_at }}</span>
            -
            <span>{{ data.end_at }}</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <p-del-button permission="addons.MiaoSha.goods.delete" @click="remove(datas, data)" />
            <p-button glass="h-btn h-btn-s h-btn-primary" permission="addons.MiaoSha.goods.update" text="编辑" @click="edit(data)" />
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
      filter: {
        keywords: null,
        type: null
      },
      types: [],
      datas: [],
      loading: false
    }
  },
  mounted() {
    this.getData(true)
  },
  methods: {
    reset() {
      this.filter.keywords = null
      this.filter.type = null
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
      R.Extentions.miaoSha.Goods.List(data).then(resp => {
        this.datas = resp.data.data.data
        this.pagination.total = resp.data.data.total
        this.types = resp.data.types
        this.loading = false
      })
    },
    create() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./create'], resolve)
          }
        },
        events: {
          success: (modal, data) => {
            R.Extentions.miaoSha.Goods.Store(data).then(resp => {
              modal.close()
              HeyUI.$Message.success('成功')
              this.getData(true)
            })
          }
        }
      })
    },
    remove(data, item) {
      R.Extentions.miaoSha.Goods.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功')
        this.getData()
      })
    },
    edit(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
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
            R.Extentions.miaoSha.Goods.Update(data).then(resp => {
              modal.close()
              HeyUI.$Message.success('成功')
              this.getData(true)
            })
          }
        }
      })
    }
  }
}
</script>
