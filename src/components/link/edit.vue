<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="link">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="链接名" prop="name">
              <input v-model="link.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="URL" prop="url">
              <input v-model="link.url" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="升序" prop="sort">
              <input v-model="link.sort" type="number">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import Link from 'model/Link'

export default {
  props: ['id'],
  data() {
    return {
      link: Link.parse({}),
      rules: {
        required: ['name', 'url', 'sort']
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Link.Edit({ id: this.id }).then(res => {
        this.link = res.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Link.Update(this.link).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
