<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">积分变动</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">确认操作</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="record">
        <FormItem label="变动金额" prop="credit1">
          <template v-slot:label>变动金额</template>
          <input v-model="record.credit1" type="number">
        </FormItem>
        <FormItem label="变动说明" prop="remark">
          <template v-slot:label>变动说明</template>
          <textarea v-model="record.remark" rows="2" />
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
      record: {
        credit1: 0,
        remark: null
      },
      rules: {
        required: ['credit1', 'remark']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        const data = this.record
        data.user_id = this.id
        this.$emit('success', data)
      }
    }
  }
}
</script>
