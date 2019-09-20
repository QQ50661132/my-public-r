<template>
  <div class="padding">
    <el-input placeholder="请输入内容" v-model="role_filter">
      <template slot="prepend">Http://</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'DecisionTree',
  data() {
    return {
      'list': null,
      name_filter: ''
    }
  }
}
</script>

<style scoped>
  .padding {
    padding: 0.5%;
  }
</style>
