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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="relation">
        <template v-if="relation.other_id">
          <FormItem label="课程名" prop="name">
            <template v-slot:label>课程名</template>
            <input v-model="relation.name" type="text">
          </FormItem>
          <FormItem label="课程封面" prop="thumb">
            <template v-slot:label>课程封面</template>
            <image-upload v-model="relation.thumb" name="课程封面" />
          </FormItem>
          <FormItem label="课程价格" prop="charge">
            <template v-slot:label>课程价格</template>
            <div v-width="200" class="h-input-group">
              <input v-model="relation.charge" type="text">
              <span class="h-input-addon">元</span>
            </div>
          </FormItem>
        </template>

        <FormItem label="升序" prop="sort">
          <template v-slot:label>升序</template>
          <div v-width="200" class="h-input-group">
            <input v-model="relation.sort" type="text">
          </div>
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
      relation: {
        name: null,
        thumb: null,
        charge: null,
        sort: null,
        other_id: null,
        type: null
      },
      rules: {
        required: ['type', 'name', 'thumb', 'charge', 'sort', 'other_id']
      },
      types: [],
      lists: []
    }
  },
  mounted() {
    R.Extentions.learningPaths.Relation.Edit({ id: this.id }).then(resp => {
      this.relation = resp.data.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.learningPaths.Relation.Update(this.relation).then(() => {
          this.$emit('success')
        })
      }
    }
  }
}
</script>
