import Http from '@/bootstrap/http';

export default {
  search(params) {
    return Http.get(`/dashboard/gateguard/property/search?q=${params.q}`);
  },
};
