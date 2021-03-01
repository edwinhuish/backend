<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="relation">
        <FormItem label="课程类型" prop="type">
          <template v-slot:label>课程类型</template>
          <Select v-model="relation.type" :datas="types" key-name="value" title-name="key" />
        </FormItem>

        <FormItem label="课程" prop="other_id">
          <template v-slot:label>课程</template>
          <Select v-model="relation.other_id" :datas="lists" key-name="id" title-name="name" />
        </FormItem>

        <template v-if="relation.other_id">
          <FormItem label="课程名" prop="name">
            <template v-slot:label>课程名</template>
            <input v-model="relation.name" type="text">
          </FormItem>
          <FormItem label="课程封面" prop="thumb">
            <template v-slot:label>课程封面</template>
            <image-upload v-model="relation.thumb" name="课程封面" />
          </FormItem>
          <FormItem label="课程价格" prop="charge">
            <template v-slot:label>课程价格</template>
            <div v-width="200" class="h-input-group">
              <input v-model="relation.charge" type="text">
              <span class="h-input-addon">元</span>
            </div>
          </FormItem>
        </template>

        <FormItem label="升序" prop="sort">
          <template v-slot:label>升序</template>
          <div v-width="200" class="h-input-group">
            <input v-model="relation.sort" type="text">
          </div>
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
      relation: {
        step_id: this.id,
        name: null,
        thumb: null,
        charge: null,
        sort: null,
        other_id: null,
        type: null
      },
      rules: {
        required: ['step_id', 'type', 'name', 'thumb', 'charge', 'sort', 'other_id']
      },
      types: [],
      lists: []
    }
  },
  watch: {
    'relation.type'() {
      this.relation.other_id = null
      this.relation.name = null
      this.relation.thumb = null
      this.relation.charge = null

      R.Extentions.learningPaths.Relation.Create({ step_id: this.id, type: this.relation.type }).then(resp => {
        this.lists = resp.data.data
      })
    },
    'relation.other_id'() {
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === this.relation.other_id) {
          const data = this.lists[i]
          this.relation.name = data.name
          this.relation.charge = data.charge
          this.relation.thumb = data.thumb
          break
        }
      }
    }
  },
  mounted() {
    R.Extentions.learningPaths.Relation.Create({ step_id: this.id }).then(resp => {
      this.types = resp.data.types
    })
  },
  methods: {
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.learningPaths.Relation.Store(this.relation).then(() => {
          this.$emit('success')
        })
      }
    }
  }
}
</script>
