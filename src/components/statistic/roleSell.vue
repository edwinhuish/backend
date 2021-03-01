<style lang="less"></style>
<template>
  <div class="h-panel w-1200">
    <div class="h-panel-bar">
      <span class="h-panel-title">会员每日销售数量</span>
      <div class="h-panel-right">
        <Button :text="true" @click="$emit('close')">取消</Button>
      </div>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Form :label-width="110">
          <Row :space="10">
            <Cell :width="12">
              <FormItem label="会员">
                <Select v-model="role_id" :datas="roles" key-name="id" title-name="name" :filterable="true" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="时间范围">
                <DateRangePicker v-model="daterange" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem>
                <Button color="primary" @click="getData(true)">过滤</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>
      <div class="float-box mb-10">
        <line-chart :height="200" :chart-data="data" />
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from 'components/common/chartjs/line'

export default {
  components: {
    LineChart
  },
  props: ['id'],
  data() {
    return {
      data: {},
      daterange: {
        start: null,
        end: null
      },
      role_id: null,
      roles: []
    }
  },
  mounted() {
    R.Role.All().then(res => {
      this.roles = res.data.data
    })
    this.getData()
  },
  methods: {
    getData() {
      const data = {}
      if (this.daterange.start !== null) {
        data.start_at = this.daterange.start
      }
      if (this.daterange.end !== null) {
        data.end_at = this.daterange.end
      }
      data.role_id = this.role_id
      R.Statistic.roleSell(data).then(resp => {
        const data = {
          labels: resp.data.labels,
          datasets: [
            {
              label: '销量',
              data: resp.data.dataset
            }
          ]
        }
        this.data = data
      })
    }
  }
}
</script>
