/* eslint-disable no-undef */
<template>
  <div class="root-box">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>新增数据</span>

          </div>
          <div class="card-content">
            <div class="flex-item">
              <p>50</p>
              <p>新增用户</p>
            </div>
            <div class="flex-item">
              <p>70</p>
              <p>新增会议</p>
            </div>
            <div class="flex-item">
              <p>50</p>
              <p>新增物料</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>系统公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多 >>></el-button>
          </div>
          <div class="card-content-col">
            <div class="flex-item-row">
              <span><a href="">内部培训通知</a></span>
              <span>2019-06-10 09:00:01</span>

            </div>
            <div class="flex-item-row">
              <span><a href="">内部培训通知</a></span>
              <span>2019-06-10 09:00:01</span>
            </div>
            <div class="flex-item-row">
              <span><a href="">内部培训通知</a></span>
              <span>2019-06-10 09:00:01</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>

          </div>
          <div class="card-content">
            <div class="flex-item">
              <p>50</p>
              <p>待分名额</p>
            </div>
            <div class="flex-item">
              <p>70</p>
              <p>待审物料</p>
            </div>
            <div class="flex-item">
              <p>50</p>
              <p>代发物料</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>会议统计</span>

          </div>
          <div id="main">

          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      option: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created () {},
  mounted () {
    // eslint-disable-next-line no-unused-vars
    var myChart = echarts.init(document.getElementById('main'))

    var option = {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 61, name: '已完成' },
            { value: 21, name: '正举办' },
            { value: 18, name: '未举办' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    myChart.setOption(option)
  }
}
</script>

<style lang="stylus" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.box-card {
  width: 500px;
  // height:400px;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.clearfixafter {
  clear: both;
}

.card-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.flex-item
  display: flex;
  flex-direction: column;
  align-items: center;
  p
    margin 20px 0
    &:first-child
      font-size: 40px

.flex-item-row {
  display: flex;
  justify-content: space-between;
  padding: 12px;
}

#main
  width: 100%;
  height: 300px;
</style>
