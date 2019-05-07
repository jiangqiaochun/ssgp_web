<template>
  <div>
<!--    <Row>-->
<!--      <Col span="2">-->
<!--        <Button type="primary" style="background-color: #8c1515; color: white;border: #8c1515 " @click="showCreateProject">新增</Button>-->
<!--      </Col>-->
<!--      <Col span="2">-->
<!--        <Upload action="http://localhost:9001/upload/students" :format="['xls','xlsx']" :on-format-error="handleFormatError">-->
<!--          <Button style="background-color: #8c1515; color: white;border: #8c1515 " icon="ios-cloud-upload-outline">上传表格</Button>-->
<!--        </Upload>-->
<!--        &lt;!&ndash;<input type="file" value="" id="file" @change="uploadExcel">&ndash;&gt;-->
<!--      </Col>-->
<!--    </Row>-->
    <Button type="primary" style="background-color: #8c1515; color: white;border: #8c1515 " @click="showCreateProject">新增</Button>
    <Table border :columns="columns1" :data="projectList" style="margin-top: 10px">
      <template slot-scope="{row}" slot="action">
        <Button :disabled="row.selectionStatus === '审核成功'" @click="examine(row)">审核</Button>
<!--        <Button :disabled="row.selectedStudentName">修改</Button>-->
        <Button :disabled="row.selectedStudentName"  @click="removeProject(row)">删除</Button>
      </template>
    </Table>
    <Modal v-model="createProjectModal">
      <h1 style="text-align: center">添加课题</h1>
      <Form :model="createProject" :label-width="80" style="margin-top: 40px">
        <FormItem label="选题名称">
          <Input type="text" v-model="createProject.name"></Input>
        </FormItem>
        <FormItem label="选题性质">
          <Select v-model="createProject.nature" style="width:200px">
            <Option v-for="item in natureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选题类型">
          <Select v-model="createProject.type" style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="createCancel">取消</Button>
        <Button type="primary" size="large" @click="postCreateProject">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {postCreateProject, getProjectList, deletById, examine} from '@/api/teacher'
export default {
  name: 'teacher-select-manage',
  data () {
    return {
      createProjectModal: false,
      natureList: [
        {
          label: '论文',
          value: '论文'
        },
        {
          label: '设计',
          value: '设计'
        }
      ],
      typeList: [
        {
          label: '理论',
          value: '理论'
        },
        {
          label: '应用',
          value: '应用'
        },
        {
          label: '其他',
          value: '其他'
        }
      ],
      createProject: {
        name: '',
        nature: '',
        type: ''
      },
      columns1: [
        {
          title: '题目名称',
          key: 'projectName'
        },
        {
          title: '题目类型',
          key: 'projectType',
          width: '90px'
        },
        {
          title: '题目性质',
          key: 'projectNature',
          width: '90px'
        },
        {
          title: '教务处状态',
          key: 'projectStatus',
          width: '110px'
        },
        {
          title: '已选学生',
          key: 'selectedStudentName'
        },
        {
          title: '选题状态',
          key: 'selectionStatus',
          width: '90px'
        },
        {
          title: '操作',
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
          //           this.showUpdateStaffModel(params.row)
          //         }
          //       }
          //     }, '修改'),
          //     h('span', {
          //       props: {},
          //       style: {
          //         cursor: 'pointer',
          //         marginRight: '10px',
          //         color: 'rgba(255, 0, 0, 0.6)'
          //       },
          //       on: {
          //         click: () => {
          //           this.removeProject(params.row)
          //         }
          //       }
          //     }, '删除')
          //   ])
          // }
        }
      ],
      projectList: []
    }
  },
  mounted () {
    this.getProjectList()
  },
  methods: {
    getProjectList () {
      getProjectList().then(res => {
        if (res.data.code === 200) {
          this.projectList = res.data.data
          console.log(this.projectList)
        } else {
          this.$Message.error('获取课题列表失败！')
        }
      }).catch(e => {
        this.$Message.error('网络错误！')
      })
    },
    showCreateProject () {
      this.createProjectModal = true
    },
    createCancel () {
      this.createProjectModal = false
    },
    postCreateProject () {
      let req = {
        projectName: this.createProject.name,
        projectType: this.createProject.type,
        projectNature: this.createProject.nature
      }
      postCreateProject(req).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('创建成功！')
          this.getProjectList()
        } else {
          this.$Message.error('网络错误：' + res.data.message)
        }
      }).catch(e => {
        this.$Message.error('网络错误：' + e.message)
      })
      this.createProjectModal = false
    },
    removeProject (row) {
      this.$Modal.confirm({
        title: '是否确定删除？',
        onOk: () => {
          deletById(row.projectId).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功！')
              this.getProjectList()
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
    examine (row) {
      console.log(row)
      examine(row.projectId).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('审核通过')
          this.getProjectList()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
