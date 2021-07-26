<template>
<div>
  <el-menu
      default-active="user"
      class="el-menu-vertical-demo"
      router
      style="width: 200px; min-height: calc(100vh - 50px)"
     >
    <el-submenu index="1">
      <template #title>系统管理</template>
      <el-menu-item index="user">用户管理</el-menu-item>
      <el-menu-item index="book">书籍管理</el-menu-item>
    </el-submenu>
<!--    <el-submenu index="2">-->
<!--      <template #title>数据管理</template>-->
<!--      <el-menu-item index="user">用户管理</el-menu-item>-->
<!--    </el-submenu>-->
  </el-menu>

</div>
</template>

<script>
export default {
  name: "Aside.vue"
}
</script>

<style scoped>

</style>