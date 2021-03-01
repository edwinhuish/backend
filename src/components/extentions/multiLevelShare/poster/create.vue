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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="poster">
        <FormItem label="升序" prop="sort">
          <input v-model="poster.sort" type="number">
        </FormItem>
        <FormItem label="海报名" prop="name">
          <input v-model="poster.name" type="text">
        </FormItem>
        <FormItem label="海报" prop="thumb">
          <image-upload v-model="poster.thumb" name="海报" />
        </FormItem>
        <FormItem label="参数" prop="config">
          <textarea v-model="poster.config" rows="3" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      poster: {
        name: '',
        sort: 0,
        thumb: null,
        config: null
      },
      rules: {
        required: ['name', 'sort', 'thumb', 'config']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.poster)
      }
    }
  }
}
</script>
