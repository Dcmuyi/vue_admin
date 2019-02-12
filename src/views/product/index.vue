<template>
  <div class="contain-index">
    <el-row type="flex" justify="space-between" style="border-bottom: 1px solid #ebeef5;height: 50px;">
      <el-col :span=3 class="mt10 header">
        <span>商品列表</span>
      </el-col>

      <el-col :span=2 >
        <el-button type="default" class="mb1">新增</el-button>
      </el-col>
    </el-row>

    <!-- query start -->
    <el-row class="mt1">
      <el-form :inline="true" :model="query">
        <el-form-item>
          <el-select v-model="query.manufacture_name" placeholder="生产厂商" @change="onQueryChange()" clearable >
            <el-option
              v-for="(item, index) in manufacturer"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.tag" placeholder="标签" @change="onQueryChange()" clearable >
            <el-option
              v-for="(item, index) in tagText"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.status" placeholder="是否上架" @change="onQueryChange()" clearable >
            <el-option
              v-for="(item, index) in statusText"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字" @change="onQueryChange" clearable suffix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- query end -->

    <!-- table start -->
    <el-table :data="list" stripe border class="w100" v-loading.body="loading">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="图片"
        width="100">
        <template slot-scope="scope">
          <div >
            <img :src="imgHost + scope.row.pic" width="32" height="32" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="specs"
        label="规格"
        width="200">
      </el-table-column>
      <el-table-column
        prop="manufacture_name"
        label="生产厂商"
        width="300">
      </el-table-column>
      <el-table-column
        prop="department.name"
        label="所属部门"
        width="200">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="200"
        :formatter="formatterStatus">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
          <el-button type="text" size="medium">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="pt1 tr">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.perPage"
        :total="pagination.totalCount"
        :page-count="pagination.pageCount"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import productService from 'service/product'

export default {
  name: 'product',
  data () {
    return {
      list: [],
      pagination: {},
      loading: false,
      imgHost: process.env.IMG_HOST,
      query: {
        keyword: undefined,
        manufacture_name: undefined,
        tag: undefined,
        status: undefined,
        expand: 'tags,department,skus,rate'
      },
      statusText: [
        { label: '已下架', value: '0' },
        { label: '正常', value: '100' }
      ],
      tagText: [],
      manufacturer: []
    }
  },
  created () {
    this.getList()
    this.getFilterList()
  },

  methods: {
    async getList () {
      this.loading = true
      const {items, _meta} = await productService.query(this.query)
      this.list = items
      this.pagination = _meta
      this.loading = false
    },
    async getFilterList () {
      const params = {'per-page': 99}
      const [tagData, manufacturerData] = await Promise.all([
        productService.getTags(params),
        productService.getManufacturer(params)
      ])

      this.tagText = tagData.items.map(tag => {
        return {label: tag.tag, value: tag.tag}
      })

      this.manufacturer = manufacturerData.items.map(manufacturer => {
        return {label: manufacturer.name, value: manufacturer.name}
      })

      console.log(this.tagText)
      console.log(this.manufacturer)
    },
    onSizeChange (size) {
      this.query['page'] = 1
      this.query['per-page'] = size
      this.getList()
    },
    onCurrentChange (page) {
      this.query.page = page
      this.getList()
    },
    onQueryChange () {
      this.query['page'] = 1
      this.getList()
    },
    formatterStatus (row) {
      // if (row.status === 100) return '已下架:' + row.range
      const statusList = this.statusText.filter(item => {
        return +item.value === +row.status
      })
      return statusList['0'].label
    }
  }
}
</script>
