<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">提现处理</span>
      <div class="h-panel-right">
        <Button color="primary" @click="confirm">确认</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" :valid-on-change="true" :show-error-tip="true" mode="block" :rules="rules" :model="form">
        <FormItem label="状态" prop="status">
          <Select v-model="form.status" :datas="statusRows" key-name="id" title-name="name" />
        </FormItem>
        <FormItem label="备注" prop="remark">
          <textarea v-model="form.remark" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ids'],
  data() {
    return {
      form: {
        remark: '',
        status: 1
      },
      statusRows: [
        {
          id: 1,
          name: '提现成功'
        },
        {
          id: 2,
          name: '提现失败'
        }
      ],
      rules: {
        required: ['name', 'remark']
      }
    }
  },
  methods: {
    confirm() {
      const validResult = this.$refs.form.valid()
      if (!validResult.result) {
        return
      }
      R.Member.CreateInviteBalanceWithdrawOrder({ ids: this.ids, status: this.form.status, remark: this.form.remark }).then(resp => {
        HeyUI.$Message.success('处理成功')
        this.$emit('success')
      })
    }
  }
}
</script>
