<template>
  <div>
    <el-card style="width: 40%;margin: 10px">
      <el-form ref="form" :modal="form" label-width="" 80px>
        <el-from-item label="用户名">
          <el-input v-mode="form.username" disable></el-input>
        </el-from-item>
        <el-from-item label="昵称">
          <el-input v-mode="form.nickName" disable></el-input>
        </el-from-item>
        <el-from-item label="年龄">
          <el-input v-mode="form.age" disable></el-input>
        </el-from-item>
        <el-from-item label="性别">
          <el-input v-mode="form.sex" disable></el-input>
        </el-from-item>
        <el-from-item label="地址">
          <el-input v-mode="form.address" disable></el-input>
        </el-from-item>
        <el-from-item label="密码" >
          <el-input v-mode="form.password" show-password></el-input>
        </el-from-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: "Person",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    update() {
      request.post("/user/updatePersonInfo", this.form).then(res => {
        if (res.code == "0") {
          this.$message({
            type: "success",
            message: "保存成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>