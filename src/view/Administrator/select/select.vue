<template>
  <div class="select-main">
    <sidebar :selectedIndex="0"></sidebar>
    <div class="select-rate">
      <Row>
        <Col span="6">
          <Card style="height: 160px; line-height: 40px;">
            <a href="#" slot="extra" @click.prevent="changeLimit">
              修改>>
            </a>
            <div style="text-align:center">
              <h3>选题时间</h3>
              <p>开始时间：2018.11.20</p>
              <p>结束时间：2018.12.01</p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选学生</h3>
              <h1>80</h1>
              <p>50人未选</p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选题目</h3>
              <h1>80</h1>
              <p>80题未被选择</p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <a href="#" slot="extra" @click.prevent="changeLimit">
              查看详情>>
            </a>
            <div style="text-align:center">
              <h3>老师总数量</h3>
              <h1>80</h1>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <div class="select-table">
      <Button type="primary" style="background-color: #8c1515;border: #8c1515" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
      <br>
      <Table border :columns="columns1" :data="allSelectionData" style="margin-top: 10px"></Table>
      <Page :total="100" show-total style="margin-top: 10px; float: right" />
    </div>
  </div>
</template>s

<script>
import {getAllSelections} from '@/api/admin'
export default {
  name: 'select',
  data () {
    return {
      allSelectionData: [],
      columns1: [
        {
          title: '姓名',
          key: 'studentName',
          width: '80px'
        },
        {
          title: '学号',
          key: 'studentId',
          width: '150px'
        },
        {
          title: '班级',
          key: 'studentClassNum',
          width: '100px'
        },
        {
          title: '学生电话',
          key: 'studentPhoneNum'
        },
        {
          title: '选题名称',
          key: 'projectName'
        },
        {
          title: '选题性质',
          key: 'projectNature',
          width: '100px'
        },
        {
          title: '选题分类',
          key: 'projectType',
          width: '100px'
        },
        {
          title: '指导老师',
          key: 'teacherName'
        },
        {
          title: '职称',
          key: 'teacherJobTitle'
        },
        {
          title: '老师电话',
          key: 'teacherPhoneNum'
        }
      ]
    }
  },
  mounted () {
    this.getAllSelection()
  },
  methods: {
    getAllSelection () {
      getAllSelections().then(res => {
        if (res.data.code === 200) {
          this.allSelectionData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  @import "select.css";
</style>
