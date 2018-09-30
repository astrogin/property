import Http from '@/bootstrap/http';

export default {
  get(params) {
    if (params && params.q) {
      return Http.get(`/dashboard/gateguard/organizations?page=${params.page}&q=${params.q}`);
    }
    return Http.get(`/dashboard/gateguard/organizations?page=${params.page}`);
  },
  search(params) {
    return Http.get(`/dashboard/gateguard/organizations/search?q=${params.q}`);
  },
  create(params) {
    return Http.post(`/dashboard/gateguard/organization`, params);
  },
};
