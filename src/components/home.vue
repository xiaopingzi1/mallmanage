<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <img src="@/assets/logo.png" alt="">
        </el-col>
          <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h2>后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a href="" class="loginout" @click.prevent="handleLoginOut">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 导航 -->
        <el-menu default-active="2"
        :unique-opened="true"
        router
        >
        <!-- 加：提取的是字符串的值 -->
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="users">
              <i class="el-icon-location"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              角色列表
            </el-menu-item>

            <el-menu-item index="2-2">
              <i class="el-icon-location"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              商品列表
            </el-menu-item>
             <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              分类参数
            </el-menu-item>
             <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-d-arrow-right"></i>
              <span>数据统计</span>
            </template>

            <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
   // 在组件渲染之前判断用户是否登录
  beforeCreate() {
    if (!localStorage.getItem("token")){
      // 回到登录
      this.$router.push({
        name:"login"
      });
      this.$message.warning('请先登录');
    }
    },
  methods:{
    handleLoginOut() {
      // 清除token
      localStorage.clear(); 
      // 回到登录界面
      this.$router.push({
        name:"login"
      });
      // 退出成功
      this.$message.success("退出成功");
    },

  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color:#B3C0D1;

}
.middle {
  text-align:center;
  line-height: 60px;
  color: #fff;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
  color: black;
}
</style>
