<style lang="less"></style>
<template>
  <div class>
    <div class="h-panel w-800">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑</span>
        <div class="h-panel-right">
          <Button color="primary" @click="create">保存</Button>
          <Button :text="true" @click="$emit('close')">取消</Button>
        </div>
      </div>
      <div class="h-panel-body">
        <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="category">
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input v-model="category.sort" type="number">
          </FormItem>
          <FormItem label="分类名" prop="name">
            <template v-slot:label>分类名</template>
            <input v-model="category.name" type="text">
          </FormItem>
          <FormItem label="显示" prop="is_show">
            <template v-slot:label>显示</template>
            <h-switch v-model="category.is_show" :true-value="1" :false-value="0" />
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      category: {
        sort: 0,
        name: '',
        parent_id: 0,
        is_show: 0
      },
      rules: {
        required: ['sort', 'name', 'is_show']
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.CourseCategory.Edit({ id: this.id }).then(resp => {
        this.category = resp.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.category)
      }
    }
  }
}
</script>
