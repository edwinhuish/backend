<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="chapter">
        <Row :space="10">
          <Cell :width="12">
            <FormItem label="章节名" prop="name">
              <input v-model="chapter.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="升序" prop="sort">
              <input v-model="chapter.sort" type="number">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['pid'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        pid: this.pid
      },
      rules: {
        required: ['name', 'sort']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.paper.PracticeChapter.Store(this.chapter).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
