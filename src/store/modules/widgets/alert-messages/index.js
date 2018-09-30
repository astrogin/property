import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    notifications: [],
    loading: false,
    page: 1,
    limit: 15,
  },
  getters,
  actions,
  mutations,
};
