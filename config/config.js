//开发环境使用配置，发布模式配置请去config.json修改
let GLOBAL = {
  BASE_SERVER: 'http://10.128.12.106:5100',
  // BASE_SERVER: 'http://10.44.2.178:11010',
  // BASE_SERVER: 'http://localhost:9528/api',
  // TEST_SERVER: 'http://10.128.244.52:8282',
  LOGOUT_SERVER: 'http://10.128.12.106:5100',
};
//调取config.json修改发布配置
if (process.env.NODE_ENV === 'production') {
  let pXmlRequest;
  let pResponseData;
  if (window.XMLHttpRequest) {
    pXmlRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    pXmlRequest = new window.ActiveXObject();
  }
  if (pXmlRequest) {
    pXmlRequest.open('GET', 'config.json', false);
    pXmlRequest.send(null);
    if (pXmlRequest.status === 200 && pXmlRequest.responseText) {
      pResponseData = JSON.parse(pXmlRequest.responseText);
      GLOBAL = pResponseData;
    }
  }
}

export default GLOBAL;
