import {USER} from '@/constants/mutation-types';
import UserApi from '@/api/gateguard/user';

export default {
  createNewUser({commit, state}, payload) {
    commit(USER.SET_DATA, payload);
    return UserApi.create(state.data);
  },
};
