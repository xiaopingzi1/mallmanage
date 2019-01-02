<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-col>
      <el-col>
        <el-input  placeholder="请输入内容" v-model="query" class="input-with-select" clearable @clear="getAllUsers()"> 
          <el-button slot="append" icon="el-icon-search" @click="searchUser()" ></el-button>
        </el-input>
        <el-button type="success" plain @click="showDiaAdd()">添加用户</el-button>
      </el-col>
    </el-col>
    <!-- 列表  prop数据来源是el-table中的data的属性值-->
    <el-table height="360px" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column  label="创建日期" width="120">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="180">
        <template slot-scope="scope">
          <!-- scope是tabledata -->
            <el-button type="primary" icon="el-icon-edit" circle  plain size="mini" @click="showDiaEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="showDeleteConfirm(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-check" circle plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" >
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary"  @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit" >
      <el-form :model="form">
        <el-form-item  label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary"  @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  created() {
    // 在created中调用函数
    this.getTableData();
  },
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total:-1,
      form:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      formLabelWidth:"100px",
      // 添加对话框的显示隐藏
      dialogFormVisibleAdd:false,
      dialogFormVisibleEdit:false,
    };
  },
  methods: {
    // 展示编辑对话框
    showDiaEdit(){
      this.dialogFormVisibleEdit = true;
    },
    // 编辑用户
    editUser() {

    },
    // 展示删除对话框
    showDeleteConfirm(user) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发送删除的请求 id是用户id
          const res = await this.$http.delete(`users/${user.id}`);
          const {meta:{msg,status}} = res.data;
          if (status === 200) {
            this.$message.success("删除成功");
            this.pagenum = 1;
            this.getTableData();
          }
        }).catch(() => {
          this.$message.success("已取消删除");
        });
    },
    // 点击按钮添加数据
    async addUser() {
      // 发送请求 关闭对话框 刷新表格
      const res = await this.$http.post('users',this.form);
      console.log(res);
      const {data:{meta:{msg,status}} }= res;
      if (status === 201) {
        this.$message.success(msg);
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      } else {
        this.$message.warning(msg);
        this.form = {};
      }

    },
    // 获取数据
    async getTableData() {
      // 在发请求前需要设置请求头
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        data: {
          data: { total, users },
          meta: { msg, status }
        }
      } = res;
      if (status===200) {
        // 给表格数据赋值
        this.tableData = users;
        this.total = total;
        this.$message.success(msg);
      }
      console.log(res);
    },
    // 分页相关功能
    handleSizeChange(val) {
      // 点击显示第几条val的值就是几
      this.pagesize = val;
      this.pagenum = 1;
      this.getTableData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
      console.log(`当前页: ${val}`);
    },
    // 搜索用户
    searchUser() {
      // 发请求前将页码重置为1
      this.pagenum = 1;
      this.getTableData();
    },
    // 点击清除按钮重新发起请求
    getAllUsers() {
      this.getTableData();
    },
    // 展示添加对话框
    showDiaAdd() {
      // 在打开对话框之前先清空列表
      this.form = {};
      this.dialogFormVisibleAdd = true
    },
    
  }
}
</script>

<style>
.card {
  height: 100%;
}
.input-with-select {
  width: 300px;
  margin-top: 20px;
}
</style>
