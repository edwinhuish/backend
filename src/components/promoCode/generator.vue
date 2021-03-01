<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">创建</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">确认生成</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="promoCode">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="统一前缀" prop="prefix">
              <input v-model="promoCode.prefix" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="生成数量" prop="num">
              <input v-model="promoCode.num" type="number">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="到期时间" prop="expired_at">
              <DatePicker v-model="promoCode.expired_at" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="面值" prop="money">
              <input v-model="promoCode.money" type="number">
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
      promoCode: {
        prefix: null,
        num: null,
        expired_at: null,
        money: null
      },
      rules: {
        required: ['money', 'expired_at', 'num', 'prefix']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.PromoCode.Generator(this.promoCode).then(() => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
