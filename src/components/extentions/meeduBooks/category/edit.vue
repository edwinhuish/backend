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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="category">
        <FormItem label="分类名" prop="name">
          <input v-model="category.name" type="text">
        </FormItem>
        <FormItem label="升序" prop="sort">
          <input v-model="category.sort" type="number">
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      category: {
        name: '',
        sort: 0
      },
      rules: {
        required: ['name', 'sort']
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Extentions.meeduBooks.Category.Edit({ id: this.id }).then(res => {
        this.category = res.data
      })
    },
    create() {
      this.$emit('success', this.category)
    }
  }
}
</script>
