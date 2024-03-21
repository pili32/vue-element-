import request from '@/utils/request'

//待审批和已审批
export function visitorPageAuditList(data) {
  console.log(data);
  return request({
    url: '/business/visitor/auditList',
    method: 'post',
    data
  })
}

//审批通过和不通过
export function examineApi(data) {
  console.log(data);
  return request({
    url: '/business/visitor/examine',
    method: 'post',
    data
  })
}
