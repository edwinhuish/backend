<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form ref="form" mode="block" :valid-on-change="true" :show-error-tip="true" :rules="rules" :model="goods">
        <Row :space="10">
          <Cell :width="6">
            <FormItem prop="goods_type" label="类型">
              <Select v-model="goods.goods_type" :datas="types" :filterable="true" key-name="value" title-name="name" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="other_id" label="商品">
              <Select v-model="goods.other_id" :datas="goodsList" :filterable="true" key-name="id" title-name="title" @change="goodsChange" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="goods_title" label="商品名">
              <input v-model="goods.goods_title" type="text">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="original_charge" label="商品原价">
              <input v-model="goods.original_charge" type="number" min="0">
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem prop="goods_thumb" label="商品封面">
              <image-upload v-model="goods.goods_thumb" name="商品封面" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem prop="desc" label="详细介绍">
              <tinymce-editor v-model="goods.desc" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="4">
            <FormItem prop="charge" label="价格">
              <input v-model="goods.charge" type="text" min="0" placeholder="单位：元">
            </FormItem>
          </Cell>
          <Cell :width="4">
            <FormItem prop="charge" label="人数">
              <input v-model="goods.people_num" type="number" min="0" placeholder="组团上限">
            </FormItem>
          </Cell>
          <Cell :width="4">
            <FormItem prop="charge" label="有效期">
              <input v-model="goods.time_limit" type="number" min="0" placeholder="单位：天">
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="charge" label="开始时间">
              <DatePicker v-model="goods.started_at" type="datetime" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem prop="charge" label="结束时间">
              <DatePicker v-model="goods.ended_at" type="datetime" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem prop="page_title" label="页面标题">
              <input v-model="goods.page_title" type="text" placeholder="pc或者手机打开团购页面显示的标题">
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '@/components/common/tinymce'

export default {
  components: { TinymceEditor },
  data() {
    return {
      goods: {
        other_id: null,
        goods_title: null,
        goods_thumb: null,
        goods_type: null,
        charge: null,
        original_charge: null,
        people_num: null,
        started_at: null,
        ended_at: null,
        page_title: null,
        desc: null
      },
      rules: {
        required: [
          'other_id',
          'goods_type',
          'goods_title',
          'goods_thumb',
          'people_num',
          'charge',
          'original_charge',
          'started_at',
          'end_at',
          'page_title',
          'desc'
        ]
      },
      goodsList: [],
      types: []
    }
  },
  watch: {
    'goods.goods_type'() {
      this.goods.goods_id = null
      this.goods.goods_title = null
      this.goods.goods_charge = null
      this.goods.goods_thumb = null
      this.getGoodsList()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getGoodsList()
    },
    getGoodsList() {
      R.Extentions.tuanGou.Goods.Create({ type: this.goods.goods_type }).then(res => {
        this.types = res.data.types
        this.goodsList = res.data.data
      })
    },
    goodsChange(goods) {
      this.goods.original_charge = goods.charge
      this.goods.goods_title = goods.title
      this.goods.goods_thumb = goods.thumb
    },
    create() {
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        R.Extentions.tuanGou.Goods.Store(this.goods).then(resp => {
          HeyUI.$Message.success('成功')
          this.$emit('success')
        })
      }
    }
  }
}
</script>
