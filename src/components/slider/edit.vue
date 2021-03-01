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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="slider">
        <Row :space="10">
          <Cell :width="8">
            <FormItem label="平台" prop="platform">
              <Select v-model="slider.platform" :datas="platforms" key-name="id" title-name="title" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="URL" prop="url">
              <input v-model="slider.url" type="text">
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="升序" prop="sort">
              <input v-model="slider.sort" type="number">
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem label="封面" prop="thumb">
              <image-upload v-model="slider.thumb" name="封面" help="长宽比3:1，建议尺寸：1200x400像素" />
            </FormItem>
          </Cell>
        </Row>
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
        thumb: '',
        url: '',
        sort: 0
      },
      platforms: [
        {
          id: 'PC',
          title: 'PC'
        },
        {
          id: 'H5',
          title: 'H5'
        },
        {
          id: 'APP',
          title: 'APP'
        },
        {
          id: 'MINI',
          title: '微信小程序'
        }
      ],
      rules: {
        required: ['thumb', 'url', 'sort', 'platform']
      }
    }
  },
  mounted() {
    R.Slider.Edit({ id: this.id }).then(res => {
      this.slider = res.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Slider.Update(this.slider).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
