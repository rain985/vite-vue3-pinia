<template>
  <div class="login-page">
    <a-form
      :model="formState"
      name="basic"
      ref="loginFormRef"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="login(loginFormRef)" html-type="submit"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { initDynamicRouter } from '@/router//modules/dynamicRouter.js'
import { GlobalStore } from '@/store/index.js'
import { getLoginApi } from '@/service/modules//login'
import { message } from 'ant-design-vue'
const formState = reactive({
  username: '',
  password: '',
  remember: true
})

const loginFormRef = ref(null)
const router = useRouter()
const globalStore = GlobalStore()

function login(formEl) {
  if (!formEl) return
  formEl.validateFields().then(async () => {
    try {
      // 1.请求登录接口
      const {
        data: { token }
      } = await getLoginApi(formState)
      globalStore.setToken(token)
      // 2.添加动态路由
      await initDynamicRouter()

      // 3.跳转主页
      router.push('/layout')
    } catch (error) {
      message.error('登录失败')
    }
  })
}
</script>
