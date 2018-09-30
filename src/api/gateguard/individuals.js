import Http from '@/bootstrap/http';

export default {
  get(params) {
    if (params && params.search) {
      return Http.get(
        `/dashboard/gateguard/individuals?
        page=${params.page}&search=${params.search}`
      );
    }
    return Http.get(`/dashboard/gateguard/individuals?page=${params.page}`);
  },
  create(params) {
    return Http.post(`/dashboard/gateguard/individuals`, params);
  },
};
