<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="category">
        <FormItem label="父级" prop="parent_id">
          <template v-slot:label>父级</template>
          <Select v-model="category.parent_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
        </FormItem>
        <FormItem label="分类名" prop="name">
          <template v-slot:label>分类名</template>
          <input v-model="category.name" type="text">
        </FormItem>
        <FormItem label="排序" prop="sort">
          <template v-slot:label>排序</template>
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
      categories: [],
      rules: {
        required: ['name', 'sort']
      }
    }
  },
  mounted() {
    R.Extentions.xiaoBanKe.CourseCategory.Create().then(res => {
      this.categories = res.data.categories
    })
    R.Extentions.xiaoBanKe.CourseCategory.Edit({ id: this.id }).then(res => {
      this.category = res.data.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.xiaoBanKe.CourseCategory.Update(this.category).then(res => {
          this.$emit('success')
        })
      }
    }
  }
}
</script>
