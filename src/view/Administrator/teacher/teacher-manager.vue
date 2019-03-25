<template>
  <div class="student-table">
    <Button :size="buttonSize" type="default">清空老师信息</Button>
    <Button :size="buttonSize" type="primary">导入新的老师信息</Button>
    <Table border :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
  </div>
</template>

<script>
export default {
  name: 'TeacherManage',
  data () {
    return {
      columns1: [
        {
          title: '教工号',
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
          title: '职称',
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
  }
}
</script>

<style scoped>

</style>
