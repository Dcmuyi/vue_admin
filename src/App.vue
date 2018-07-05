<template>
  <div id="app">
    <div id="login" v-if="!authenticated">
      <el-row type="flex" align="middle" justify="center" style="padding-top: 15rem;">
        <el-form :model="login" label-width="65px" ref="login">
          <el-form-item label="用户名" prop="username"
            :rules="[
              { required: true, message: '用户名不能为空'},
              // { pattern: /^1[34578][0-9]{9}$/, message: '手机号格式错误'}
            ]"
          >
            <el-input v-model.number="login.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"
            :rules="[
              { required: true, message: '密码不能为空'},
            ]"
          >
            <el-input v-model="login.password" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" :loading="loading" @click="submit('login')">登录</el-button>
            <el-button type="primary" @click="resetForm('login')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

    <div id="admin" v-if="authenticated" style="margin-top: 60px;">
      <img src="./assets/logo.png">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import app from './service/app'
import { Message } from 'element-ui'
import helper from './service/helper'

export default {
  name: 'App',
  data () {
    return {
      loading: false,
      authenticated: false,
      user: {},
      login: {
        username: '',
        password: ''
      }
    }
  },

  created () {
    this.configAxios()
    this.autoLogin()
  },

  methods: {
    async submit (formName) {
      // // 不验证表单异步提交
      // const {user, access_token: token} = await app.login({
      //   username: this.login.username,
      //   password: sha1(this.login.password)
      // })
      //
      // console.log(user)
      // console.log(token)

      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          app.login({
            username: this.login.username,
            password: sha1(this.login.password)
          }).then((res) => {
            this.loading = true
            const user = res.user
            const token = res.access_token
            const success = helper.setItem('token', token) &&
              helper.setItem('userId', user.id)
            if (success) {
              this.authenticated = true
              this.user = user
              this.loading = false
              axios.defaults.headers.common['access-token'] = token
              axios.defaults.params = { test: user.name }
            }
          })
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    async autoLogin () {
      const userId = helper.getItem('userId')
      const token = helper.getItem('token')
      if (!userId || !token) return false

      this.loading = true
      axios.defaults.headers.common['access-token'] = token
      axios.defaults.params = { test: 'test' }

      const res = await app.getUserInfo(userId)
      this.user = res
      this.authenticated = true
      this.loading = false
    },

    // axios设置
    configAxios () {
      if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = '/admin'
      }
      // 客户端=30
      axios.defaults.headers.common['client'] = 30

      // 添加响应拦截器
      axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data
      }, function (error) {
        if (error.response.status === 401) {
          Message.error('登陆失效，请重新登陆')
        } else {
          Message.error(error.response.data.message)
        }
        return Promise.reject(error)
      })
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#login {
  width: 100vw;
  height: 100vh;
  background-image: url(http://pic.616pic.com/bg_w1180/00/03/29/Wcsb9keWmv.jpg!/fw/1120);
  background-size: cover;
}
#login form {
  padding: 35px 80px 10px 60px;
  background-color: rgba(255,255,255,.9);
  border-radius: 8px;
}
</style>
