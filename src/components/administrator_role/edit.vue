<style lang="less">
.permissions-box {
  width: 100%;
  height: auto;
  float: left;

  .permission-item {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 10px;

    .title {
      width: 100%;
      height: auto;
      float: left;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .content {
      width: 100%;
      height: auto;
      float: left;

      .h-checkbox {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
      <div class="h-panel-right">
        <Button color="primary" @click="save">保存</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :label-width="110" :rules="rules" :model="role">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="角色名" prop="display_name">
              <input v-model="role.display_name" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="Slug" prop="slug">
              <input v-model="role.slug" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="描述" prop="description">
              <input v-model="role.description" type="text">
            </FormItem>
          </Cell>
        </Row>
        <Row :space="10">
          <Cell :width="24">
            <div class="permissions-box">
              <div v-for="(items, title) in permissions" :key="title" class="permission-item">
                <div class="title">{{ title }}</div>
                <div class="content">
                  <Checkbox v-for="item in items" :key="item.id" v-model="role.permission_ids" :value="item.id">{{ item.display_name }}</Checkbox>
                </div>
              </div>
            </div>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import Role from 'model/AdministratorRole'

export default {
  props: ['id'],
  data() {
    return {
      role: Role.parse({}),
      rules: {
        required: ['display_name', 'description']
      },
      permissions: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.AdministratorRole.Edit({ id: this.id }).then(resp => {
        this.role = resp.data
      })

      R.AdministratorRole.Create().then(res => {
        const data = res.data.permissions
        this.permissions = data
      })
    },
    save() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        this.$emit('success', this.role)
      }
    }
  }
}
</script>
