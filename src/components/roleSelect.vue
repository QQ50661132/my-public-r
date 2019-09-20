<template>
  <el-select id="roleSelect" :value="localSelectedId" v-model="localSelectedId" v-bind="$attrs" clearable filterable placeholder="按角色过滤">
    <el-option
      v-for="item in list"
      :key="item.roleId"
      :label="item.roleName"
      :value="item.roleId"
    />
  </el-select>
</template>

<script>
export default {
  name: 'Selector',
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    },
    selectedId: {
      type: Number,
      default: null
    }
  },
  computed: {
    localSelectedId: {
      get() {
        return this.selectedId
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    selectedId: function(oldVal) {
      console.log('selectedId:' + oldVal)
    },
    localSelectedId: function(oldVal) {
      console.log('localSelectedId:' + oldVal)
    }
  }
}
</script>

<style scoped>

</style>
