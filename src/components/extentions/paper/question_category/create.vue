<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="category">
        <Row :space="10">
          <Cell :width="8">
            <FormItem label="父级" prop="parent_id">
              <Select v-model="category.parent_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="分类名" prop="name">
              <input v-model="category.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="排序" prop="sort">
              <input v-model="category.sort" type="number">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: {
        name: '',
        sort: 0,
        parent_id: 0
      },
      categories: [],
      rules: {
        required: ['name', 'sort']
      }
    }
  },
  mounted() {
    R.Extentions.paper.QuestionCategory.Create().then(res => {
      this.categories = res.data.categories
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.category)
        this.close()
      }
    },
    cancel() {
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
