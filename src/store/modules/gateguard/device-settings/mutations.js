import {DEVICE_SETTINGS} from '@/constants/mutation-types';
export default {
  [DEVICE_SETTINGS.SET_SETTINGS](state, payload) {
    state.currentBuilding.settings = payload;
  },
  [DEVICE_SETTINGS.SET_PENDING](state, payload) {
    state.pending = payload;
  },
};
