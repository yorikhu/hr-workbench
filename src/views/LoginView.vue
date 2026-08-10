<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
})

const handleLogin = () => {
  // 这里添加登录逻辑
  console.log('Login:', loginForm)
  // 登录成功后跳转到主页面
  router.push('/dashboard/overview')
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>用户登录</h2>
      </template>
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="loginForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="loginForm.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <el-link type="primary">忘记密码？</el-link>
        <el-link type="primary">注册账号</el-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login-card {
    width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    :deep(.el-card__header) {
      text-align: center;
      background: #f8f9fa;

      h2 {
        margin: 0;
        color: #333;
      }
    }
  }

  .login-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
