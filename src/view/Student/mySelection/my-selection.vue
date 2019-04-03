<template>
  <div class="my-selection-main">
    <Button style="background-color: #8c1515; color: white" shape="circle" icon="ios-undo-outline" @click="goBack"></Button>
    <Divider style="color: #8c1515">我的选题</Divider>
    <Row>
      <Col span="12">
        <Form>
          <FormItem label="标题">
            <p>毕业论文选题系统</p>
          </FormItem>
          <FormItem label="选题分类">
            <p>应用</p>
          </FormItem>
          <FormItem label="选题性质">
            <p>设计</p>
          </FormItem>
        </Form>
      </Col>
      <Col span="10">
        <Form>
          <FormItem label="老师姓名">
            <p>陈荣元</p>
          </FormItem>
          <FormItem label="老师职称">
            <p>博士</p>
          </FormItem>
          <FormItem label="联系方式">
            <p>15616146720</p>
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
export default {
  name: 'select-manage',
  methods: {
    goBack () {
      this.$router.push({name: 'studentSelect'})
    },
    deleteSelection () {
      this.$Modal.confirm({
        title: '是否确定删除？',
        content: '<p>删除后需重新选择</p>',
        onOk: () => {
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import "my-selection.css";
</style>
