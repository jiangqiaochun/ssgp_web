<template>
  <div class="select-main">
    <sidebar :selectedIndex="0"></sidebar>
    <div class="select-rate">
      <Row>
        <Col span="6">
          <Card style="height: 160px; line-height: 40px;">
            <a href="#" slot="extra" @click.prevent="changeTime">
              修改>>
            </a>
            <div style="text-align:center">
              <h3>选题时间</h3>
              <p v-html="'开始时间：' + startTime"></p>
              <p v-html="'结束时间：' + endTime"></p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选学生</h3>
              <h1 v-html="selectedStudent"></h1>
              <p v-html="unselectedStudent + '人未选'"></p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <div style="text-align:center">
              <h3>已选题目</h3>
              <h1 v-html="selectedProject"></h1>
              <p v-html="unselectedProject + '题未被选择'"></p>
            </div>
          </Card>
        </Col>
        <Col span="6">
          <Card style=" height: 160px; line-height: 40px;">
            <a href="#" slot="extra" @click.prevent="goTeacher">
              查看详情>>
            </a>
            <div style="text-align:center">
              <h3>老师总数量</h3>
              <h1 v-html="teacherCount"></h1>
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
    <Modal v-model="changeTimeModal">
      <Divider>设置选题时间</Divider>
      <Form>
        <FormItem label="开始时间" v-model="startTime">
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" v-model="endTime">
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>s

<script>
import {getAllSelections, getStatistics} from '@/api/admin'
export default {
  name: 'select',
  data () {
    return {
      selectedStudent: 0,
      unselectedStudent: 0,
      selectedProject: 0,
      unselectedProject: 0,
      teacherCount: 0,
      changeTimeModal: false,
      startTime: '',
      endTime: '',
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
    this.getStatistics()
  },
  methods: {
    getAllSelection () {
      getAllSelections().then(res => {
        if (res.data.code === 200) {
          this.allSelectionData = res.data.data
        }
      })
    },
    changeTime () {
      this.changeTimeModal = true
    },
    goTeacher () {
      this.$router.push('teacherManage')
    },
    getStatistics () {
      getStatistics().then(res => {
        if (res.data.code === 200) {
          let response = res.data.data
          this.selectedStudent = response.selectedStudent
          this.unselectedStudent = response.studentCount - response.selectedStudent
          this.selectedProject = response.selectedProject
          this.unselectedProject = response.projectCount - response.selectedProject
          this.teacherCount = response.teacherCount
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  @import "select.css";
</style>
