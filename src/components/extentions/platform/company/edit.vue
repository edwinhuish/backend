<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑机构</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="form">
        <Row :space="10">
          <Cell :width="24">
            <FormItem label="机构名" prop="name">
              <input v-model="form.name" type="text" placeholder="请输入机构名">
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="机构简介" prop="desc">
              <textarea v-model="form.desc" placeholder="请输入简介" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="8">
            <FormItem prop="vod_service" label="点播服务">
              <Select v-model="form.vod_service" :datas="options.vodServices" :filterable="true" key-name="value" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem prop="live_service" label="直播服务">
              <Select v-model="form.live_service" :datas="options.liveServices" :filterable="true" key-name="value" title-name="name" />
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
      form: {
        name: '',
        desc: '',
        vod_service: '',
        live_service: ''
      },
      options: {
        vodServices: [
          {
            name: '阿里云',
            value: 'aliyun'
          },
          {
            name: '腾讯云',
            value: 'tencent'
          }
        ],
        liveServices: [
          {
            name: '阿里云',
            value: 'aliyun'
          },
          {
            name: '腾讯云',
            value: 'tencent'
          }
        ]
      },
      rules: {
        required: ['name', 'desc', 'vod_service', 'live_service']
      }
    }
  },
  mounted() {
    R.Extentions.Platform.Company.Edit(this.id).then(resp => {
      this.form = resp.data
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.form)
      }
    }
  }
}
</script>
