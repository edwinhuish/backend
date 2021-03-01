<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="slider">
        <FormItem label="排序" prop="sort">
          <template v-slot:label>排序</template>
          <input v-model="slider.sort" type="number" placeholder="小的数靠前">
        </FormItem>
        <FormItem label="图片" prop="thumb">
          <template v-slot:label>图片</template>
          <image-upload v-model="slider.thumb" name="图片" />
        </FormItem>
        <FormItem label="地址" prop="url">
          <template v-slot:label>地址</template>
          <input v-model="slider.url" type="text">
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
      slider: {
        sort: 0,
        thumb: null,
        url: null
      },
      rules: {
        required: ['url', 'sort', 'thumb']
      }
    }
  },
  mounted() {
    R.Extentions.templateOne.Slider.Edit({ id: this.id }).then(res => {
      this.slider = res.data.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.slider)
      }
    }
  }
}
</script>
