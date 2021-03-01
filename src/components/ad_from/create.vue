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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="adfrom">
        <Row :space="10">
          <Cell :width="12">
            <FormItem label="Name" prop="from_name">
              <input v-model="adfrom.from_name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="Key" prop="from_key"> <input v-model="adfrom.from_key" type="text"> </FormItem>cd
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import AdFrom from 'model/AdFrom'

export default {
  data() {
    return {
      adfrom: AdFrom.parse({}),
      rules: {
        required: ['from_name', 'from_key']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.AdFrom.Store(this.adfrom).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
