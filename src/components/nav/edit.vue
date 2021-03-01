<style lang="less"></style>
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
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="80" :rules="rules" :model="nav">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="平台" prop="platform">
              <Select v-model="nav.platform" :datas="platforms" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="上级" prop="parent_id">
              <Select v-model="nav.parent_id" :disabled="nav.platform === 'h5'" :datas="navs" key-name="id" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="升序" prop="sort">
              <input v-model="nav.sort" type="number">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="链接名" prop="name">
              <input v-model="nav.name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="链接地址" prop="url">
              <input v-model="nav.url" type="text">
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="Active" prop="active_routes">
              <input v-model="nav.active_routes" type="text">
              <warn text="不清楚可不填写" />
            </FormItem>
          </Cell>
          <Cell v-if="nav.platform === 'PC'" :width="24">
            <FormItem label="新窗口打开" prop="blank">
              <h-switch v-model="nav.blank" :true-value="1" :false-value="0" />
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import Nav from 'model/Nav'

export default {
  props: ['id'],
  data() {
    return {
      nav: Nav.parse({}),
      platforms: [],
      navs: [],
      rules: {
        required: ['sort', 'name', 'url']
      }
    }
  },
  watch: {
    'nav.platform'() {
      if (this.nav.platform === 'h5') {
        this.nav.parent_id = 0
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Nav.Create().then(res => {
        const data = []
        for (let i = 0; i < res.data.navs.length; i++) {
          if (res.data.navs[i].id !== this.id) {
            data.push(res.data.navs[i])
          }
        }
        this.navs = data
        this.platforms = res.data.platforms
      })

      R.Nav.Edit({ id: this.id }).then(resp => {
        this.nav = resp.data
      })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Nav.Update(this.nav).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
