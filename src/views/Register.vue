<template>
  <div style="width: 100%;height: 100vh;background-color: cornflowerblue;overflow: hidden">
    <div style="width: 400px;margin: 100px auto;">
      <div style="color: #cccccc;font-size: 30px;text-align: center;padding:30px 0">欢迎注册</div>
      <el-form ref="form" :model="form" size="normal">
        <el-form-item>
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" v-model="form.confirm" show-password></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="register">注 册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: "Register",
  data() {
    return {
      form: {},
    }
  },
  methods: {
    register() {
      if (this.form.password !== this.form.confirm) {
        this.$message({
          type: "error",
          message: "两次的密码输入不一致！"
        });
        return false;
      }
      request.post("/user/register", this.form).then(res => {
        if (res.code == "0") {
          this.$message({
            type: "success",
            message: "注册成功"
          });
          this.$router.push("/login");  //登录成功之后进行页面的跳转，跳转到登录页面
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