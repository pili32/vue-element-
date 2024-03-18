import { login } from "@/api/user";
import { getToken,setToken } from '@/utils/auth'

const state ={
  token: getToken(),

}
const actions = {
  //添加登录,储存登录数据
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
};
export default {
  actions,
  mutations,
  state
};
