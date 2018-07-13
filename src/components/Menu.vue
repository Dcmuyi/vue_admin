<template>
  <el-menu class="sidebar-container el-scrollbar" background-color="#324157" text-color="#fff" active-text-color="#409EFF" :router="true">
    <el-submenu :index="item.index" :title="item.children && item.name" v-for="(item, index) in menus" :key="index">
      <template slot="title">{{item.name}}</template>
      <el-menu-item :index="'/' + item.index + '/' + subItem.index" v-for="(subItem, subIndex) in (item.children || [item])" :key="subIndex">
        {{subItem.name}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import * as MENUS from '../config/menu'

export default {
  props: {
    groupId: {
      type: Number,
      required: true
    }
  },
  computed: {
    menus () {
      return MENUS[`MENU_${this.groupId}`]
    }
  }
}
</script>
