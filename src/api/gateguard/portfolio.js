import Http from '@/bootstrap/http';

export default {
  search(params) {
    return Http.get(`/dashboard/gateguard/portfolio/search?q=${params.q}`);
  },
};
