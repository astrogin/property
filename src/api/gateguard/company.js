import Http from '@/bootstrap/http';

export default {
  create(params) {
    return Http.post(
      `/dashboard/gateguard/company`, params
    );
  },
  getCompanies(params) {
    if (params && params.q) {
      return Http.get(`/dashboard/gateguard/companies?q=${params.q}`);
    }
    return Http.get('/dashboard/gateguard/companies');
  },
};
