<template>
  <div class="student-table">
    <Row>
      <Col span="2">
        <Button :size="buttonSize" type="default">清空学生信息</Button>
      </Col>
      <Col span="2">
        <Upload action="http://192.168.80.196:9001/upload/students" :format="['xls','xlsx']" :on-format-error="handleFormatError">
          <Button style="background-color: #8c1515; color: white " icon="ios-cloud-upload-outline">上传学生信息</Button>
        </Upload>
        <!--<input type="file" value="" id="file" @change="uploadExcel">-->
      </Col>
    </Row>
    <Table border :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
  </div>
</template>

<script>
import {upload} from '@/api/admin'
export default {
  name: 'StudentManage',
  data () {
    return {
      columns1: [
        {
          title: '学号',
          key: 'studentId'
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
          key: 'class'
        },
        {
          title: '联系电话',
          key: 'studentTel'
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
              h('span', {
                props: {},
                style: {
                  cursor: 'pointer',
                  marginRight: '10px',
                  color: '#57a3f3'
                },
                on: {
                  click: () => {
                    this.showUpdateStaffModel(params.row)
                  }
                }
              }, '修改'),
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
      ]
    }
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确， 请选择表格文件'
      })
    },
    uploadExcel (e) {
      upload(e).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
