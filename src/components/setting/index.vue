<style lang="less">
.body {
  border: 1px solid rgb(240, 246, 255);

  .left-box {
    border-right: 1px solid rgb(240, 246, 255);
    max-height: 520px;
    overflow-y: auto;

    .left-menu-item {
      width: 100%;
      height: auto;
      float: left;
      font-size: 0.9rem;
      cursor: pointer;

      &.active {
        background-color: @primary-color;
        color: white;
      }

      &:hover {
        background-color: @primary-color;
        color: white;
      }

      span {
        display: inline-block;
        padding: 10px 0 10px 20px;
      }
    }
  }

  .right-box {
    max-height: 520px;
    overflow-y: auto;
  }
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">系统配置</span>
    </div>
    <div v-if="!loading" class="h-panel-body">
      <div class="mb-10">
        <p-button glass="h-btn h-btn-primary" permission="setting.save" text="保存" @click="save()" />
      </div>
      <Row class="body">
        <Cell width="4" class="left-box">
          <Row>
            <Cell v-for="(item, index) in setting" :key="index" width="24" class="left-menu-item" :class="{ active: index === activeItem }">
              <span style="display: inline-block; width: 100%" @click="switchItem(index)">{{ index }}</span>
            </Cell>
          </Row>
        </Cell>
        <Cell v-for="(item, index) in setting" v-show="activeItem === index" :key="'tab' + index" class="right-box" width="20">
          <Form mode="block" class="p-20">
            <template v-for="c in item">
              <FormItem :key="c.id">
                <template v-slot:label>{{ c.name }}</template>

                <input v-if="c.field_type === 'text'" v-model="c.value" type="text">
                <input v-else-if="c.field_type === 'number'" v-model="c.value" type="number">
                <textarea v-else-if="c.field_type === 'textarea'" v-model="c.value" rows="3" />
                <h-switch v-else-if="c.field_type === 'switch'" v-model="c.value" />
                <wang-editor v-else-if="c.field_type === 'longtext'" v-model="c.value" />
                <image-upload v-else-if="c.field_type === 'image'" v-model="c.value" :name="c.name" />
                <Select v-else-if="c.field_type === 'select'" v-model="c.value" :datas="c.option_value" />

                <warn v-if="c.help" :text="c.help" />
              </FormItem>
            </template>
          </Form>
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
import WangEditor from '../common/wangEditor'

export default {
  components: { WangEditor },
  data() {
    return {
      loading: true,
      activeItem: '系统',
      setting: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      R.Setting.Get().then(resp => {
        this.loading = false
        this.setting = resp.data
      })
    },
    switchItem(item) {
      this.activeItem = item
    },
    save() {
      const data = {}
      for (const index in this.setting) {
        for (const index2 in this.setting[index]) {
          const item = this.setting[index][index2]
          data[item.key] = item.value
        }
      }
      R.Setting.Save({ config: data }).then(resp => {
        HeyUI.$Message.success('成功')
        this.init()
      })
    }
  }
}
</script>
