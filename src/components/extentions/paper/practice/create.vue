<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="practice">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="category_id">
              <Select v-model="practice.category_id" :datas="categories" key-name="id" title-name="name" :filterable="true" />
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="练习名" prop="name">
              <input v-model="practice.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="封面" prop="thumb">
              <image-upload v-model="practice.thumb" name="封面" />
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="免费" prop="is_free">
              <h-switch v-model="practice.is_free" :true-value="1" :false-value="0" />
              <warn text="所有人都可以参与考试。" />
            </FormItem>
          </Cell>
        </Row>

        <Row v-if="practice.is_free === 0" :space="10">
          <Cell :width="6">
            <FormItem label="会员免费" prop="is_vip_free">
              <h-switch v-model="practice.is_vip_free" :true-value="1" :false-value="0" />
              <warn text="购买VIP会员的用户都可以参与考试。" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="价格" prop="charge">
              <input v-model="practice.charge" type="number">
              <warn text="价格大于0的话用户可以购买此练习参与练习" />
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
      practice: {
        category_id: null,
        name: null,
        thumb: null,
        is_free: null,
        is_vip_free: null,
        charge: null
      },
      rules: {
        required: ['category_id', 'name', 'thumb']
      },
      createParams: {},
      categories: []
    }
  },
  mounted() {
    this.init()

    this.practice.is_free = 1
    this.practice.is_vip_free = 0
  },
  methods: {
    init() {
      R.Extentions.paper.Practice.Create().then(res => {
        this.categories = res.data.categories
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.paper.Practice.Store(this.practice).then(resp => {
          HeyUI.$Message.success('添加成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
