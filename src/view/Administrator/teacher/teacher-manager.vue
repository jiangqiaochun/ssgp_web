<template>
  <div class="student-table">
    <Row>
      <Col span="2">
        <Button :size="buttonSize" type="default">清空老师信息</Button>
      </Col>
      <Col span="2">
        <Upload action="http://localhost:9001/upload/teachers" :format="['xls','xlsx']" :on-format-error="handleFormatError">
          <Button style="background-color: #8c1515; color: white " icon="ios-cloud-upload-outline">上传老师信息</Button>
        </Upload>
      </Col>
    </Row>
    <Table border :columns="columns1" :data="teacherList" style="margin-top: 10px"></Table>
    <Modal v-model="selections" style="width: 800px">
      <Table border :columns="selectionColumn" :data="selectionList" style="margin-top: 10px">
        <template slot="action" slot-scope="{row}">
          <p style="color: #57a3f3; cursor: pointer" @click="examineProject(row)">审核通过</p>
        </template>
      </Table>
    </Modal>
  </div>
</template>

<script>
import {getTeacherList, getTeacherSelection, examineProject} from '@/api/admin'
export default {
  name: 'TeacherManage',
  data () {
    return {
      selections: false,
      teacherId: 0,
      selectionList: [],
      teacherList: [],
      columns1: [
        {
          title: '教工号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'teacherName'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '职称',
          key: 'jobTitle'
        },
        {
          title: '联系电话',
          key: 'phoneNum'
        },
        {
          title: '操作',
          width: '150px',
          render: (h, params) => {
            return h('div', {
              attrs: {
              // style: 'height: 40px;'
              }
            }, [
              h('span', {
                props: {},
                style: {
                  cursor: 'pointer',
                  marginRight: '10px',
                  color: '#57a3f3'
                },
                on: {
                  click: () => {
                    this.showTeacherSelection(params.row)
                  }
                }
              }, '详情'),
              // h('span', {
              //   props: {},
              //   style: {
              //     cursor: 'pointer',
              //     marginRight: '10px',
              //     color: '#57a3f3'
              //   },
              //   on: {
              //     click: () => {
              //       this.showUpdateStaffModel(params.row)
              //     }
              //   }
              // }, '修改'),
              h('span', {
                props: {},
                style: {
                  cursor: 'pointer',
                  marginRight: '10px',
                  color: 'rgba(255, 0, 0, 0.6)'
                },
                on: {
                  click: () => {
                    this.removeStaff(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      selectionColumn: [
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
          title: '题目状态',
          key: 'projectStatus'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  mounted () {
    this.getTeacherList()
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确， 请选择表格文件'
      })
    },
    getTeacherList () {
      getTeacherList().then(res => {
        if (res.data.code === 200) {
          this.teacherList = res.data.data
        }
      }).catch(e => {
        this.$Message.error('网络错误' + e.message)
      })
    },
    showTeacherSelection (row) {
      this.selections = true
      this.teacherId = row.id
      getTeacherSelection(row.id).then(res => {
        if (res.data.code === 200) {
          this.selectionList = res.data.data
        }
      })
    },
    examineProject (row) {
      examineProject(row.projectId).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('审核完成')
          this.getTeacherSelection(this.teacherId)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
