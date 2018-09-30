import Http from '@/bootstrap/http';

export default {
  getNotifications(params) {
    let query = '';
    if (typeof params.limit !== 'undefined' && params.limit > 0) {
      query += `limit${params.limit}`;
    }
    return Http.get(`/notifications?${query}`);
  },
};
