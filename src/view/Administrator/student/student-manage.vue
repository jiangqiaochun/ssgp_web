<template>
  <div class="student-table">
    <Row>
      <Col span="2">
        <Button :size="buttonSize" type="default" @click="deleteAll">清空学生信息</Button>
      </Col>
      <Col span="2">
        <Upload action="http://localhost:9001/upload/students" :format="['xls','xlsx']" :on-format-error="handleFormatError">
          <Button style="background-color: #8c1515; color: white " icon="ios-cloud-upload-outline">上传学生信息</Button>
        </Upload>
        <!--<input type="file" value="" id="file" @change="uploadExcel">-->
      </Col>
    </Row>
    <Table border :columns="columns1" :data="studentList" style="margin-top: 10px"></Table>
  </div>
</template>

<script>
import {getStudentList, deletAllStudent, deleteStudentById} from '@/api/admin'
export default {
  name: 'StudentManage',
  data () {
    return {
      studentList: [],
      columns1: [
        {
          title: '学号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'studentName'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '班级',
          key: 'classNum'
        },
        {
          title: '联系电话',
          key: 'phoneNum'
        },
        {
          title: '操作',
          width: '100px',
          render: (h, params) => {
            return h('div', {
              attrs: {
                // style: 'height: 40px;'
              }
            }, [
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
                    this.deleteById(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确， 请选择表格文件'
      })
    },
    getStudentList () {
      getStudentList().then(res => {
        if (res.data.code === 200) {
          console.log(res)
          this.studentList = res.data.data
        }
      }).catch(e => {
        this.$Message.error('网络错误' + e.message)
      })
    },
    deleteAll () {
      this.$Modal.confirm({
        title: '是否确定删除？',
        onOk: () => {
          deletAllStudent().then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功！')
            } else {
              this.$Message.error('删除失败！')
            }
          }).catch(e => {
            this.$Message.error('网络错误！')
          })
        },
        onCancel: () => {
        }
      })
    },
    deleteById (row) {
      this.$Modal.confirm({
        title: '是否确定删除?',
        onOk: () => {
          deleteStudentById(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功')
              this.getStudentList()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
