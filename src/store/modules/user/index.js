import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    data: {
      id: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
    },
  },
  getters,
  actions,
  mutations,
};
