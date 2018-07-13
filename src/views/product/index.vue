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
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.keyword" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryChange">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- query end -->

    <!-- table start -->
    <el-table :data="list" stripe border class="w100" v-loading.body="loading">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="图片"
        width="80">
        <template slot-scope="scope">
          <div >
            <img :src="imgHost + scope.row.pic" width="32" height="32" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="specs"
        label="规格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="manufacture_name"
        label="生产厂商"
        width="200">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="status"-->
        <!--label="审核状态"-->
        <!--width="100"-->
        <!--:formatter="formatterStatus">-->
      <!--</el-table-column>-->
      <el-table-column
        label="操作">
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
        status: undefined,
        expand: 'tags,department,skus,rate'
      }
    }
  },
  created () {
    this.getList()
    const te = this.pagination.currentPage
    console.log(te)
  },

  methods: {
    async getList () {
      this.loading = true
      const {items, _meta} = await productService.query(this.query)
      this.list = items
      this.pagination = _meta
      this.loading = false
    }
  }
}
</script>
