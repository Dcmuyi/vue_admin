// 医药公司管理员

export default [{
  index: 'medical-company-department',
  name: '部门管理'
}, {
  index: 'medical-company-salesman',
  name: '业务员管理'
}, {
  index: 'medical-company-level',
  name: '佣金等级管理'
}, {
  index: 'medical-company-client',
  name: '客户管理'
}, {
  index: 'medical-company-product',
  name: '商品',
  type: 'group',
  children: [{
    index: 'medical-company-product',
    name: '商品管理'
  }, {
    index: 'intent-product-no-audit',
    name: '免审商品'
  }, {
    index: 'gift',
    name: '赠品库'
  }]
}, {
  index: 'order',
  name: '订单',
  type: 'group',
  children: [{
    index: 'order',
    name: '全部订单'
  }]
}, {
  index: 'sale',
  name: '活动',
  type: 'group',
  children: [{
    index: 'sale',
    name: '活动方案'
  }, {
    index: 'activity',
    name: '抽奖活动'
  }, {
    index: 'cut',
    name: '砍价活动'
  }, {
    index: 'coupon-template',
    name: '抵用券模版'
  }]
}, {
  index: 'user',
  name: '用户管理'
}]
