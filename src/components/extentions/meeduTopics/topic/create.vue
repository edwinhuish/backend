<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加文章</span>
      <div class="h-panel-right">
        <Button color="primary" @click="create">添加</Button>
        <Button @click="$emit('close')" :text="true">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <Form mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :rules="rules" :model="topic">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="分类" prop="cid">
              <Select v-model="topic.cid" :datas="categories" keyName="id" titleName="name"></Select>
            </FormItem>
          </Cell>
          <Cell :width="18">
            <FormItem label="标题" prop="title">
              <input type="text" v-model="topic.title" />
            </FormItem>
          </Cell>
          <Cell :width="24">
            <FormItem label="封面" prop="thumb">
              <image-upload v-model="topic.thumb" name="封面"></image-upload>
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="显示" prop="is_show">
              <h-switch v-model="topic.is_show"></h-switch>
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="价格" prop="charge">
              <input type="number" min="0" max="2000" v-model="topic.charge" />
            </FormItem>
          </Cell>
          <Cell :width="3">
            <FormItem label="会员免费" prop="is_vip_free" v-if="topic.charge > 0">
              <h-switch v-model="topic.is_vip_free"></h-switch>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="排序时间" prop="sorted_at">
              <DatePicker v-model="topic.sorted_at" type="datetime"></DatePicker>
            </FormItem>
          </Cell>
        </Row>
        <FormItem label="免费内容" prop="free_content">
          <markdown @textChange="freeContentChange" id="freeContent" :text="topic.free_content"></markdown>
        </FormItem>
        <FormItem label="文章内容" prop="original_content">
          <markdown @textChange="contentChange" id="originalContent" :text="topic.original_content"></markdown>
        </FormItem>

        <Row :space="10">
          <Cell :width="12">
            <FormItem label="SEO关键字" prop="seo_keywords">
              <textarea v-model="topic.seo_keywords" rows="2"></textarea>
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="SEO描述" prop="seo_description">
              <textarea v-model="topic.seo_description" rows="2"></textarea>
            </FormItem>
          </Cell>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import markdown from '@/components/common/markdown';

export default {
  components: {
    markdown
  },
  data() {
    return {
      topic: {
        cid: '',
        title: '',
        is_show: 0,
        is_need_login: 0,
        is_vip_free: 0,
        free_content: '',
        free_content_render: '',
        charge: 0,
        original_content: '',
        render_content: '',
        sorted_at: null,
        thumb: '',
        seo_keywords: '',
        seo_description: ''
      },
      rules: {
        required: ['cid', 'title', 'is_show', 'original_content', 'thumb']
      },
      categories: []
    };
  },
  mounted() {
    R.Extentions.meeduTopics.Topic.Create().then(res => {
      this.categories = res.data;
    });

    this.topic.sorted_at = Utils.currentDate();
  },
  methods: {
    freeContentChange(ori, render) {
      this.topic.free_content = ori;
      this.topic.free_content_render = render;
    },
    contentChange(ori, render) {
      this.topic.original_content = ori;
      this.topic.render_content = render;
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.topic);
      }
    }
  }
};
</script>
