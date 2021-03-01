<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">照片</span>
      <div class="h-panel-right">
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Button class="h-btn h-btn-primary h-btn-s" @click="showPreview(0)">预览全部照片</Button>
        <p-del-button permission="addons.Snapshot.images.delete" text="批量删除" @click="deleteMulti" />
      </div>
      <div class="float-box mb-10">
        <Table ref="table" :datas="images" :checkbox="true">
          <TableItem prop="id" title="ID" :width="80" />
          <TableItem prop="created_at" title="拍照时间" />
          <TableItem title="操作" align="center" :width="200">
            <template slot-scope="{ data }">
              <Button color="primary" @click="preview(data.thumb)">查看照片</Button>
            </template>
          </TableItem>
        </Table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['images', 'rid'],
  data() {
    return {}
  },
  methods: {
    showPreview(index) {
      const images = []
      this.images.forEach(item => {
        images.push(item.thumb)
      })
      this.$ImagePreview(images, index)
    },
    preview(url) {
      this.$ImagePreview(url)
    },
    deleteMulti() {
      const items = this.$refs.table.getSelection()
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的图片')
        return
      }
      this.loading = true
      const ids = []
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id)
      }
      R.Extentions.Snapshot.Images.Delete({ ids: ids, rid: this.rid }).then(resp => {
        HeyUI.$Message.success('成功')
        this.$emit('success')
      })
    }
  }
}
</script>
