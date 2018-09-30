import Notifications from '@/api/gateguard/notifications';
import {ALERT_MESSAGES} from '@/constants/mutation-types';

export default {
  getNotifications({commit, state}, payload) {
    commit(ALERT_MESSAGES.GET_NOTIFICATIONS_START);
    Notifications.getNotifications({limit: state.limit})
      .then((res) => {
        commit(ALERT_MESSAGES.SET_NOTIFICATIONS, res.data.notifications || []);
      })
      .catch((err) => {

      })
      .finally(() => {
        commit(ALERT_MESSAGES.GET_NOTIFICATIONS_FINAL);
      });
  },
};
