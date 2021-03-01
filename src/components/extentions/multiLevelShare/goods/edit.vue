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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="goods">
        <Row :space="10">
          <Cell :width="6">
            <FormItem prop="goods_title" label="商品名">
              <input v-model="goods.goods_title" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="original_charge" label="商品价格">
              <input v-model="goods.goods_charge" type="number" min="0">
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem prop="goods_thumb" label="商品封面">
              <image-upload v-model="goods.goods_thumb" name="商品封面" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="8">
            <FormItem prop="reward" label="一级奖励">
              <input v-model="goods.reward" type="text" min="0" placeholder="单位：元">
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem prop="reward" label="二级奖励">
              <input v-model="goods.reward2" type="text" min="0" placeholder="单位：元">
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem prop="reward" label="三级奖励">
              <input v-model="goods.reward3" type="text" min="0" placeholder="单位：元">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
// import TinymceEditor from '@/components/common/tinymce'

export default {
  // components: { TinymceEditor },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      goods: {
        goods_title: null,
        goods_thumb: null,
        goods_charge: null,
        reward: null,
        reward2: null,
        reward3: null
      },
      rules: {
        required: ['goods_charge', 'goods_title', 'reward', 'reward2', 'reward3']
      },
      goodsList: [],
      types: []
    }
  },
  mounted() {
    this.getGoods()
  },
  methods: {
    getGoods() {
      R.Extentions.multiLevelShare.Goods.Edit({ id: this.id }).then(res => {
        this.goods = res.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.multiLevelShare.Goods.Update(this.goods).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
