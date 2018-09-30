import Http from '@/bootstrap/http';

export default {
  create(params) {
    return Http.post(
      `/dashboard/gateguard/user`, params
    );
  },
  getUsers(params) {
    if (params && params.q) {
      return Http.get(`/dashboard/gateguard/users?q=${params.q}`);
    }
    return Http.get('/dashboard/gateguard/users');
  },
};
