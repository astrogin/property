import {COMPANY} from '@/constants/mutation-types';

export default {
  [COMPANY.SET_DATA](state, payload) {
    state.data = payload;
  },
};
