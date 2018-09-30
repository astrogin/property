import {ALERT_MESSAGES} from '@/constants/mutation-types';

export default {
  [ALERT_MESSAGES.SET_NOTIFICATIONS](state, notifications) {
    state.notifications = notifications;
  },
  [ALERT_MESSAGES.GET_NOTIFICATIONS_START](state) {
    state.loading = true;
  },
  [ALERT_MESSAGES.GET_NOTIFICATIONS_FINAL](state) {
    state.loading = false;
  },
};
