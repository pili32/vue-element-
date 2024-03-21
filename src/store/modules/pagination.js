const state = {
  globalPageTotal: 0,
  globalPageNum: 1,
  globalPageSize: 10,
  clickCount: 0,
};

const mutations = {
  CHANGE_PAGENUM: (state, value) => {
    state.globalPageNum = value;
  },
  CHANGE_PAGESIZE: (state, value) => {
    state.globalPageSize = value;
  },
  CHANGE_PAGETOTAL: (state, value) => {
    state.globalPageTotal = value;
  },
  CHAHGE_INIT(state) {
    state.clickCount++;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
