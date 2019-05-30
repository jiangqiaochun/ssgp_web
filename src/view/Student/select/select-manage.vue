<template>
  <div class="student-select-main">
    <div class="student-select-search">
      <Button type="primary" style="background-color: #8c1515; border: 0; float: left" @click="goMySelection">查看我的选题</Button>
      <Select v-model="teacherId" style="width:200px" placeholder="请选择老师姓名" @on-change="getTeacherProject(teacherId)" >
        <Option v-for="item in teacherList" :value="item.id" :key="item.id"  >{{ item.teacherName }}</Option>
      </Select>
      <Input v-model="searchCondition" placeholder="请输入选题名称搜索" style="width: 50%" />
      <Button type="primary" style="background-color: #8c1515; border: 0" @click="getSelections">搜索</Button>
    </div>
    <div class="student-select-table">
      <Table border :columns="selectColumns" :data="selectionData" style="margin-top: 10px">
        <template slot-scope="{row}" slot="action" >
          <p v-if="row.selectedStudentName" v-html="row.selectedStudentName"></p>
          <Button type="primary" v-else @click="selectProject(row)">选择</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import {getSelectionData, selectProject, getTeacher, getProject} from '@/api/student'
export default {
  name: 'select-manage',
  data () {
    return {
      teacherId: '',
      teacherList: [],
      searchCondition: '',
      selectionData: [],
      selectColumns: [
        {
          title: '选题名称',
          key: 'projectName'
        },
        {
          title: '选题性质',
          key: 'projectNature'
        },
        {
          title: '选题分类',
          key: 'projectType'
        },
        {
          title: '指导老师',
          key: 'teacherName'
        },
        {
          title: '已选学生',
          slot: 'action'
          // render: (h, params) => {
          //   return h('div', {
          //     attrs: {
          //       // style: 'height: 40px;'
          //     }
          //   }, [
          //     h('span', {
          //       props: {},
          //       style: {
          //         cursor: 'pointer',
          //         marginRight: '10px',
          //         color: '#57a3f3'
          //       },
          //       on: {
          //         click: () => {
          //           this.selectProject(params.row)
          //         }
          //       }
          //     }, '选择')
          //   ])
          // }
        }
      ]
    }
  },
  mounted () {
    this.getSelections()
    this.getTeacherList()
  },
  methods: {
    goMySelection () {
      this.$router.push({ name: 'mySelection', params: {studentId: localStorage.getItem('userId')} })
    },
    getSelections () {
      getSelectionData(this.searchCondition).then(res => {
        if (res.data.code === 200) {
          this.selectionData = res.data.data
          console.log(this.selectionData)
        }
      })
    },
    selectProject (row) {
      console.log(row)
      let req = {
        studentId: localStorage.getItem('userId'),
        projectId: row.projectId
      }
      selectProject(req).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('选题成功！')
          this.getSelections()
        } else if (res.data.code === 1001) {
          this.$Message.info(res.data.message)
        }
      })
    },
    getTeacherList () {
      getTeacher().then(res => {
        if (res.data.code === 200) {
          this.teacherList = res.data.data
        }
      })
    },
    getTeacherProject (teacherId) {
      console.log('change')
      console.log(teacherId)
      getProject(teacherId).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.selectionData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import "select-manage.css";
</style>
