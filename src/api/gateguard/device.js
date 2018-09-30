import Http from '@/bootstrap/http';

export default {
  search(params) {
    return Http.get(`/dashboard/gateguard/devices/search?q=${params.q}`);
  },
};
