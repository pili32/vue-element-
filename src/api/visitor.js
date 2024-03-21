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

