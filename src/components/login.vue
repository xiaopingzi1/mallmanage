
<template>
<div class="login-wrap">
<el-form 
  class="form"
  :label-position="labelPosition" 
  label-width="80px" 
  :model="formData">
  <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formData.username"></el-input>
  </el-form-item>

  <el-form-item label="密码">
    <el-input v-model="formData.password"></el-input>
  </el-form-item>

  <el-row>
    <el-button type="primary" class="btn" @click="handleLogin">登录</el-button>
  </el-row>

</el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      formData: {
        username: '',
        password: '',
      }
    }
  },
  methods:{
    async handleLogin() {
      // 简化代码 es7中await async
    const res = await this.$http.post("login",this.formData);
     const {data:{data,meta:{msg,status}}} = res;
      if (status===200) {
        //保存token值
        localStorage.setItem('token',data.token);
        this.$router.push({
          name:'home'
        });
      } else {
        this.$message.warning(msg)
      }

    }
  // handleLogin() {
  //   this.$http.post("login",this.formData)
  //   .then((res)=> {
  //     console.log(res);
  //     const {data:{data,meta:{msg,status}}} = res;
  //     if (status===200) {
  //       // 渲染home组件
  //       this.$router.push({
  //         name:'home'
  //       });
  //       // this.$message.success(msg)
  //       // this.$message({
  //       //   message:msg,
  //       //   type:'success'
  //       // })      
  //     } else {
  //       this.$message.warning(msg)
        // this.$message({
        //   message:msg,
        //   type:'error'
        // })  
      // }
    // })
  // }
},

}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 10px;
}
.btn {
  width: 100%;
  margin-top: 10px;
}
</style>
