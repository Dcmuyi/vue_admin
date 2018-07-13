// 医药公司财务

export default [{
  index: 'order',
  name: '订单',
  type: 'group',
  children: [{
    index: 'order',
    name: '全部订单'
  }]
}, {
  index: 'medical-company-client',
  name: '客户管理'
}, {
  index: 'medical-company-product',
  name: '商品管理'
}, {
  index: 'bonus',
  name: '佣金管理'
}, {
  index: 'rebate',
  name: '充值返利'
}, {
  index: 'cut',
  name: '返券活动',
  children: [{
    index: '555',
    name: '满5万送5万'
  }, {
    index: '333',
    name: '满3万送3万'
  }]
}, {
  index: 'cut',
  name: '砍价活动'
}]
