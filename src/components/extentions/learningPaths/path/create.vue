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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="paths">
        <FormItem label="路径名" prop="name">
          <template v-slot:label>路径名</template>
          <input v-model="paths.name" type="text">
        </FormItem>
        <FormItem label="封面" prop="thumb">
          <template v-slot:label>封面</template>
          <image-upload v-model="paths.thumb" name="封面" />
        </FormItem>
        <FormItem label="原价" prop="original_charge">
          <template v-slot:label>原价</template>
          <div v-width="200" class="h-input-group">
            <input v-model="paths.original_charge" type="text">
            <span class="h-input-addon">元</span>
          </div>
        </FormItem>
        <FormItem label="现价" prop="charge">
          <template v-slot:label>现价</template>
          <div v-width="200" class="h-input-group">
            <input v-model="paths.charge" type="text">
            <span class="h-input-addon">元</span>
          </div>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <template v-slot:label>描述</template>
          <textarea v-model="paths.desc" />
        </FormItem>
        <FormItem label="显示" prop="is_show">
          <template v-slot:label>显示</template>
          <h-switch v-model="paths.is_show" :true-value="1" :false-value="0" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paths: {
        name: '',
        is_show: 1,
        thumb: '',
        charge: 0,
        original_charge: 0,
        desc: ''
      },
      rules: {
        required: ['name', 'is_show', 'thumb', 'charge', 'original_charge', 'desc']
      }
    }
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.paths)
      }
    }
  }
}
</script>
