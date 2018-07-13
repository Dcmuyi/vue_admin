// 业务员

export default [{
  index: 'medical-company-salesman',
  name: '业务员管理'
}, {
  index: 'order',
  name: '订单管理'
}, {
  index: 'product',
  name: '商品管理',
  type: 'group',
  children: [{
    index: 'index',
    name: '商品列表'
  }, {
    index: 'client-price',
    name: '一客一价'
  }]
}, {
  index: 'client',
  name: '客户管理',
  type: 'group',
  children: [{
    index: 'index',
    name: '商品列表'
  }, {
    index: 'client-price',
    name: '一客一价'
  }, {
    index: 'client-price',
    name: '一客一价'
  }, {
    index: 'client-price',
    name: '一客一价'
  }, {
    index: 'client-price',
    name: '一客一价'
  }, {
    index: 'client-price',
    name: '一客一价'
  }, {
    index: 'client-price',
    name: '一客一价'
  }]
}, {
  index: 'medical-company-client',
  name: '客户管理'
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
}]
