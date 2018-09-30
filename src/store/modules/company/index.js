import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    data: {
      id: '',
      name: '',
      site: '',
    },
  },
  getters,
  actions,
  mutations,
};
