<template>
  <div class="my-selection-main">
    <Button style="background-color: #8c1515; color: white" shape="circle" icon="ios-undo-outline" @click="goBack"></Button>
    <Divider style="color: #8c1515">我的选题</Divider>
    <Row>
      <Col span="12">
        <Form>
          <FormItem label="标题">
            <p v-html="projectName"></p>
          </FormItem>
          <FormItem label="选题分类">
            <p v-html="this.projectType"></p>
          </FormItem>
          <FormItem label="选题性质">
            <p v-html="this.projectNature"></p>
          </FormItem>
          <FormItem label="选题状态">
            <p v-html="this.status"></p>
          </FormItem>
        </Form>
      </Col>
      <Col span="10">
        <Form>
          <FormItem label="老师姓名">
            <p v-html="teacherName"></p>
          </FormItem>
          <FormItem label="老师职称">
            <p v-html="teacherJobTitle"></p>
          </FormItem>
          <FormItem label="联系方式">
            <p v-html="teacherPhoneNum"></p>
          </FormItem>
        </Form>
      </Col>
      <Col span="2">
        <Button style="background-color: #8c1515; color: white" @click="deleteSelection">删除</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import {getMySelection, deleteMySelection} from '@/api/student'
export default {
  name: 'select-manage',
  data () {
    return {
      id: '',
      projectId: '',
      projectName: '',
      projectNature: '',
      projectType: '',
      teacherName: '',
      teacherJobTitle: '',
      teacherPhoneNum: '',
      status: ''
    }
  },
  mounted () {
    this.getMySelection()
  },
  methods: {
    goBack () {
      this.$router.push({name: 'studentSelect'})
    },
    deleteSelection () {
      this.$Modal.confirm({
        title: '是否确定删除？',
        content: '<p>删除后需重新选择</p>',
        onOk: () => {
          console.log('ok')
          deleteMySelection(this.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功！')
            }
          })
        },
        onCancel: () => {
        }
      })
    },
    getMySelection () {
      getMySelection().then(res => {
        console.log(res)
        if (res.data.code === 200) {
          let response = res.data.data
          this.id = response.id
          this.projectId = response.projectId
          this.projectName = response.projectName
          this.projectNature = response.projectNature
          this.projectType = response.projectType
          this.teacherName = response.teacherName
          this.teacherJobTitle = response.teacherJobTitle
          this.teacherPhoneNum = response.teacherPhoneNum
          this.status = response.status
        } else if (res.data.code === 1001) {
          this.$Message.info('暂无选题')
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import "my-selection.css";
</style>
