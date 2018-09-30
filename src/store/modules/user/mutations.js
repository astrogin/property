import {USER} from '@/constants/mutation-types';

export default {
  [USER.SET_DATA](state, payload) {
    state.data = payload;
  },
};
