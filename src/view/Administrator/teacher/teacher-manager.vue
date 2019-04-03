<template>
  <div class="student-table">
    <Row>
      <Col span="2">
        <Button :size="buttonSize" type="default">清空老师信息</Button>
      </Col>
      <Col span="2">
        <Upload action="http://192.168.80.196:9001/upload/teachers" :format="['xls','xlsx']" :on-format-error="handleFormatError">
          <Button style="background-color: #8c1515; color: white " icon="ios-cloud-upload-outline">上传老师信息</Button>
        </Upload>
      </Col>
    </Row>
  <Table border :columns="columns1" :data="teacherList" style="margin-top: 10px"></Table>
</div>
</template>

<script>
import {getTeacherList} from '@/api/admin'
export default {
  name: 'TeacherManage',
  data () {
    return {
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
  mounted () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList () {
      getTeacherList().then(res => {
        if (res.data.code === 200) {
          this.teacherList = res.data.data
        }
      }).catch(e => {
        this.$Message.error('网络错误' + e.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
