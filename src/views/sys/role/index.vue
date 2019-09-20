<template>
  <div class="app-container ">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入内容" clearable @keyup.enter.native="getTableData">
          <template slot="prepend">搜索角色名</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="exports">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :key="tableKey" :data="tableData" stripe border fit width="100%" max-height="700px">
      <el-table-column label="ID" prop="roleId" width="80" sortable />
      <el-table-column label="角色名" prop="roleName" width="120" />
      <el-table-column label="菜单权限" prop="deptNames" width="280">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.deptNames" :key="item" type="success" class="roleTag">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <!--[{"roleId":10041,"roleName":"admin","remark":"1","createUserId":1,"createTime":null,"createUserName":"zlhjadmin","menus":null}]-->
      <el-table-column v-for="column in columns" :key="column" :label="column" :prop="column" min-width="100" />
      <el-table-column label="操作" fixed="right" prop="createdate" width="200" sortable>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="padding">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>

    <el-dialog :visible="showRowDataDialog" :title="rowDataTitle">
      <el-form
        ref="rowDataForm"
        v-model="rowData"
        label-position="left"
        label-width="100px"
        :rules="rowDataFormRules"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名">
          <el-input v-model="rowData.roleName" type="text" />
        </el-form-item>
        <el-form-item label="菜单">
          <el-select
            v-model="rowData.deptList"
            multiple
            :value="rowData.deptList"
            placeholder="请选择"
          >
            <el-option v-for="item in deptSelectList" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="rowData.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRowDataDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rolePage, save, update } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      rowData: {
        id: 0,
        roleName: '',
        deptNames: [],
        deptList: [],
        createUserName: '',
        createDate: '',
        remark: ''
      },
      rowDataTitle: '',
      showRowDataDialog: false,
      allColumns: ['createTime', 'createUserName', 'remark'],
      tableKey: 1,
      columns: ['createTime', 'createUserName', 'remark'],
      deptSelectList: null,
      tableData: null,
      form: {
        roleName: ''
      },
      rowDataFormRules: {
        roleName: { required: true, message: 'roleName is required', trigger: 'change' }
      }
    }
  },
  computed: {
    checkColumns: {
      get() {
        return this.columns
      },
      set(v) {
        this.columns = this.allColumns.filter(item => v.indexOf(item) >= 0)
        this.tableKey += 1
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    submit() {
      const msg = res => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? 'success' : 'error'
        })
      }
      if (this.rowData.id) {
        save(this.rowData).then(res => {
          this.showRowDataDialog = false
          msg(res)
        })
      } else {
        update(this.rowData).then(res => {
          msg(res)
        })
      }
    },
    reSetRowData() {
      this.rowData = {
        id: 0,
        username: '',
        roleNames: [],
        roleList: [],
        phone: '',
        email: '',
        remark: ''
      }
    },
    handleSizeChange(val) {
      console.log(`每页${val}行`)
      this.getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页数在${val}`)
      this.getTableData()
    },
    exports() {
      console.log('exports')
    },
    add() {
      this.reSetRowData()
      this.showRowDataDialog = true
      this.rowDataTitle = '新增'
    },
    handleDelete(scope) {
      const message = this.$message
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const thisLoading = this.$loading({
          text: '正在删除...'
        })
        setTimeout(function() {
          thisLoading.close()
          message({
            type: 'success',
            message: '删除成功!'
          })
        }, 1000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(scope) {
      this.showRowDataDialog = true
      this.rowDataTitle = '修改'
      this.rowData = Object.assign({}, scope.row)
    },
    roleSelectVal(val) {
      this.form.roleId = val
      this.getTableData()
    },
    getTableData() {
      rolePage(this.form.roleName, this.currentPage, this.pageSize).then(({ data }) => {
        console.log(data)
        this.total = data.count
        this.tableData = data.data
      })
    }
  }
}
</script>

<style scoped>
  .padding {
    padding: 0.5%;
  }
</style>
