<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加权限</span></div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form ref="form" v-width="400" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="permission">
          <FormItem label="角色名" prop="display_name">
            <template v-slot:label>角色名</template>
            <input v-model="permission.display_name" type="text">
          </FormItem>
          <FormItem label="Slug" prop="slug">
            <template v-slot:label>Slug</template>
            <input v-model="permission.slug" type="text">
          </FormItem>
          <FormItem label="描述" prop="description">
            <template v-slot:label>描述</template>
            <input v-model="permission.description" type="text">
          </FormItem>
          <FormItem label="Method" prop="method">
            <template v-slot:label>Method</template>
            <Select v-model="permission.method" :multiple="true" :datas="methods" />
          </FormItem>
          <FormItem label="URL" prop="url">
            <template v-slot:label>URL</template>
            <input v-model="permission.url" type="text">
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">创建</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Permission from 'model/AdministratorPermission'

export default {
  data() {
    return {
      permission: Permission.parse({}),
      rules: {
        required: ['display_name', 'slug', 'description', 'url', 'method']
      },
      methods: [
        {
          title: 'GET',
          key: 'GET'
        },
        {
          title: 'POST',
          key: 'POST'
        },
        {
          title: 'PUT',
          key: 'PUT'
        },
        {
          title: 'DELETE',
          key: 'DELETE'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
    back() {
      this.$router.push({ name: 'AdministratorPermission' })
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.AdministratorPermission.Create(this.permission).then(resp => {
          HeyUI.$Message.success('成功')
          this.$router.push({ name: 'AdministratorPermission' })
        })
      }
    }
  }
}
</script>
