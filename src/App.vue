<template>
  <div id="app">
    <template id="login" v-if="!authenticated">
      <el-row type="flex" align="middle" justify="center" style="padding-top: 15rem;">
        <el-form :model="login" label-width="65px" ref="login">
          <el-form-item label="用户名" prop="username"
            :rules="[
              { required: true, message: '用户名不能为空'},
              // { pattern: /^1[34578][0-9]{9}$/, message: '手机号格式错误'}
            ]"
          >
            <el-input v-model.number="login.username" auto-complete="off" @keyup.enter.native="submit('login')" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password"
            :rules="[
              { required: true, message: '密码不能为空'},
            ]"
          >
            <el-input v-model="login.password" auto-complete="off" type="password" @keyup.enter.native="submit('login')" ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" :loading="loading" @click="submit('login')">登录</el-button>
            <el-button type="primary" @click="resetForm('login')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </template>

    <template id="admin" v-if="authenticated">
      <el-container>
        <div class="aside">
          <h2 class="tc">
            <a class="cf no-underline" href="#/">{{user.name}}</a>
          </h2>

          <el-aside width="200px">
            <menus :group-id=depList[depIndex].role_id></menus>
          </el-aside>
        </div>

        <el-container>
          <el-header style="height: 50px;">
            <el-row type="flex" justify="space-between" class="pt10">
              <el-col :span=4>
                <el-select v-model="depIndex" placeholder="请选择角色" :onchange="changeDep()" >
                  <el-option
                    v-for="(item, index) in depList"
                    :key="index"
                    :label="item.department.name+'-'+item.name"
                    :value="index">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :span=2 class="tc">
                <el-dropdown @command="onUserDropdown">
                <span class="el-dropdown-link">
                  {{user.name}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>

          <el-main style="max-height: 95vh">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </div>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import app from './service/app'
import helper from './service/helper'
import Menus from './components/Menu'
import './muyi.css'

export default {
  name: 'App',
  data () {
    return {
      loading: false,
      authenticated: false,
      depList: [],
      depIndex: 0,
      roleId: 0,
      depId: 0,
      user: {},
      login: {
        username: '',
        password: ''
      }
    }
  },

  components: { Menus },

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
          this.loading = true
          app.login({
            username: this.login.username,
            password: sha1(this.login.password)
          }).then((res) => {
            const user = res.user
            const token = res.access_token
            const success = helper.setItem('token', token) &&
              helper.setItem('userId', user.id) && helper.setItem('user', JSON.stringify(user)) && helper.setItem('depIndex', this.depIndex)
            if (success) {
              this.authenticated = true
              this.user = user
              this.depList = user.role_list
              this.roleId = this.depList[this.depIndex].role_id
              this.depId = this.depList[this.depIndex].department_id
              axios.defaults.headers.common['access-token'] = token
              axios.defaults.headers.common['role-id'] = this.roleId
              axios.defaults.headers.common['department-id'] = this.depId
              axios.defaults.params = { test: user.name }
              this.loading = false
            }
          })
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    changeDep () {
      this.roleId = this.depList[this.depIndex].role_id
      this.depId = this.depList[this.depIndex].department_id
      helper.setItem('depIndex', this.depIndex)
    },

    onUserDropdown (command) {
      if (command === 'logout') {
        this.logout()
      }
    },

    async autoLogin () {
      const userId = helper.getItem('userId')
      const token = helper.getItem('token')
      const user = JSON.parse(helper.getItem('user'))
      if (!(userId && token && user)) return false

      this.loading = true
      this.depIndex = parseInt(helper.getItem('depIndex'))
      this.depList = user.role_list
      this.roleId = this.depList[this.depIndex].role_id
      this.depId = this.depList[this.depIndex].department_id

      axios.defaults.headers.common['access-token'] = token
      axios.defaults.params = { test: user.name }
      axios.defaults.headers.common['role-id'] = this.roleId
      axios.defaults.headers.common['department-id'] = this.depId
      this.user = await app.getUserInfo(userId)
      this.authenticated = true
      this.loading = false
    },

    logout () {
      const token = helper.getItem('token')

      app.logout({ 'access-token': token })

      const success = helper.removeItem('token') &&
        helper.removeItem('userId') && helper.removeItem('user') && helper.setItem('depIndex', 0)

      if (success) this.authenticated = false
    },

    // axios设置
    configAxios () {
      if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = '/admin'
      }
      // 客户端=30
      axios.defaults.headers.common['client'] = 30

      // 添加响应拦截器
      axios.interceptors.response.use((response) => {
        // 对响应数据做点什么
        return response.data
      }, (error) => {
        if (error.response.status === 401) {
          this.$message.error('登陆失效，请重新登陆')
        } else {
          this.$message.error(error.response.data.message)
        }
        this.loading = false

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
  color: #2c3e50;
  height: 100vh;
  overflow-y: hidden;
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
