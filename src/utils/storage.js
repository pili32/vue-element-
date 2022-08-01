/**
 * sessionStorage 操作
 * @description
 * 将 sessionStorage 获取/设置为 json 数据类型。
 */

/**
 * 获取 sessionStorage 数据
 * @param {string} name sessionStorage 名称
 */
 export function getLocalData(name) {
    const data = sessionStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }
  
  /**
   * 设置 sessionStorage 数据
   * @param {string} name sessionStorage 名称
   * @param {*} data 存储的内容
   */
  export function setLocalData(name, data) {
    sessionStorage.setItem(name, JSON.stringify(data));
  }
  
  /**
   * 清理 sessionStorage 数据
   * @param {string} name sessionStorage 名称
   */
  export function clearLocalData(name) {
    sessionStorage.removeItem(name);
  }
  