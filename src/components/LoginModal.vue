<template>
  <div class="modalbg">
    <div class="mask">
      <div class="maskhead">手机登录</div>
      <div class="maskmain">
        <el-form :model="loginForm">
          <el-form-item label="手机号：">
            <el-input v-model="loginForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
let loginForm = reactive({
  phone: "",
  password: "",
});
</script>
<style lang="scss" scoped>
.modalbg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  .mask {
    width: 530px;
    height: 360px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #2d2d2d;
    .maskhead {
      line-height: 58px;
      text-align: center;
      font-size: 1.8rem;
    }
  }
}
</style>
