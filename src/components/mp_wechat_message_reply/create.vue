<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">新建</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="message">
        <FormItem label="消息类型" prop="type">
          <Select v-model="message.type" :datas="types" key-name="id" title-name="name" />
        </FormItem>

        <template v-if="message.type === 'text'">
          <FormItem label="匹配规则" prop="rule">
            <input v-model="message.rule" type="text">
            <warn text="支持正则表达式" />
          </FormItem>
        </template>
        <template v-else-if="message.type === 'event'">
          <FormItem label="事件" prop="event_type">
            <Select v-model="message.event_type" :datas="eventTypes" key-name="id" title-name="name" />
          </FormItem>
          <FormItem label="事件key" prop="event_key">
            <input v-model="message.event_key" type="text">
          </FormItem>
        </template>

        <FormItem label="回复内容" prop="reply_content">
          <textarea v-model="message.reply_content" rows="3" placeholder="回复内容" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: {
        type: null,
        event_type: null,
        event_key: null,
        rule: null,
        reply_content: null
      },
      rules: {
        required: ['type', 'reply_content']
      },
      types: [],
      eventTypes: [
        {
          id: 'subscribe',
          name: '用户关注'
        },
        {
          id: 'unsubscribe',
          name: '用户取消关注'
        },
        {
          id: 'SCAN',
          name: '二维码扫描事件'
        },
        {
          id: 'CLICK',
          name: '自定义菜单事件'
        }
      ]
    }
  },
  mounted() {
    R.MpWechatMessageReply.Create().then(res => {
      this.types = res.data.types
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.MpWechatMessageReply.Store(this.message).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
