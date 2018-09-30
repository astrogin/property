import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    articles: [],
    loading: false,
    limit: 8,
  },
  getters,
  actions,
  mutations,
};
