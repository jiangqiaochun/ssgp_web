<template>
  <div class="select-main">
    <sidebar :selectedIndex="0"></sidebar>
    <div class="select-rate">
      <Row>
        <Col span="8">
          <Card style="width:320px; height: 150px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选学生</h3>
              <h1>80</h1>
              <p>50人未选</p>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card style="width:320px; height: 150px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选题目</h3>
              <h1>80</h1>
              <p>80题未被选择</p>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card style="width:320px; height: 150px; line-height: 40px;">
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
      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
      <br>
      <Table border :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
      <Page :total="100" show-total style="margin-top: 10px; float: right" />
    </div>
  </div>
</template>s

<script>
export default {
  name: 'select',
  data () {
    return {
      columns1: [
        {
          title: '姓名',
          key: 'name',
          width: '80px'
        },
        {
          title: '学号',
          key: 'studentId',
          width: '150px'
        },
        {
          title: '班级',
          key: 'class',
          width: '100px'
        },
        {
          title: '学生电话',
          key: 'studentTel'
        },
        {
          title: '选题名称',
          key: 'selecetProjectName'
        },
        {
          title: '选题性质',
          key: 'nature',
          width: '100px'
        },
        {
          title: '选题分类',
          key: 'type',
          width: '100px'
        },
        {
          title: '指导老师',
          key: 'teacherName'
        },
        {
          title: '职称',
          key: 'jobTitle'
        },
        {
          title: '老师电话',
          key: 'teacgerTel'
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
  @import "select.css";
</style>
