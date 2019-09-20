<template>
  <div class="app-container ">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入内容" clearable @keyup.enter.native="getTableData">
          <template slot="prepend">搜索用户名</template>
        </el-input>
        <el-checkbox-group v-model="checkColumns" class="columnsCheck">
          <el-checkbox label="nickname" />
          <el-checkbox label="phone" />
          <el-checkbox label="email" />
          <el-checkbox label="birthday" />
          <el-checkbox label="createdate" />
          <el-checkbox label="createUserName" />
          <el-checkbox label="remark" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <RoleSelect :selected-id="form.roleId" :list="roleSelectList" @input="roleSelectVal" />
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
      <el-table-column label="ID" prop="id" width="80" sortable />
      <el-table-column label="姓名" prop="username" width="120" />
      <el-table-column label="角色" prop="roleNames" width="280">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.roleNames" :key="item" type="success" class="roleTag">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-for="column in columns" :key="column" :label="column" min-width="100" />
      <el-table-column label="操作" fixed="right" prop="createdate" width="200">
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
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名">
          <el-input v-model="rowData.username" type="text" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="rowData.roleNames"
            multiple
            :value="rowData.roleNames"
            placeholder="请选择"
            @change="selectRole(rowData.roleNames)"
          >
            <el-option v-for="item in roleSelectList" :key="item.roleId" :label="item.roleName" :value="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="rowData.phone" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="rowData.email" />
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
import { userPage, save, update } from '@/api/user'
import { roleList } from '@/api/role'
import RoleSelect from '../../../components/roleSelect'

export default {
  name: 'User',
  components: { RoleSelect },
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      rowData: {
        id: 0,
        username: '',
        roleNames: [],
        roleList: [],
        phone: '',
        email: '',
        remark: ''
      },
      rowDataTitle: '',
      showRowDataDialog: false,
      allColumns: ['nickname', 'phone', 'email', 'birthday', 'createdate', 'createUserName', 'remark'],
      tableKey: 1,
      columns: ['nickname', 'email', 'phone', 'remark'],
      roleSelectList: null,
      tableData: null,
      form: {
        roleId: null,
        username: ''
      },
      rowDataFormRules: {
        username: { required: true, message: 'username is required', trigger: 'change' }
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
    this.getRoleList()
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
    selectRole(val) {
      console.log(val)
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
    getRoleList() {
      roleList().then(({ data }) => {
        this.roleSelectList = data
      })
    },
    getTableData() {
      userPage(this.form.username, this.form.roleId, this.currentPage, this.pageSize).then(({ data }) => {
        this.total = data.count
        this.tableData = data.data.filter(item => {
          item.roleNames = item.roleNames.split(',')
          return true
        })
      })
    }
  }
}
</script>

<style scoped>
  .padding {
    padding: 20px;
  }

  .roleTag {
    margin-right: 1px;
  }

  .columnsCheck {
    padding-bottom: 0;
  }
</style>
