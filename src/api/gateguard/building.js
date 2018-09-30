import Http from '@/bootstrap/http';

export default {
  setSettings(params) {
    return Http.post(
      `/dashboard/gateguard/building/${params.id}/more-settings`, params
    );
  },
  getSettings(params) {
    return Http.get(
      `/dashboard/gateguard/building/${params.id}/settings`
    );
  },
  search(params) {
    return Http.get('/dashboard/gateguard/building/search', {
      params: params,
    });
  },
  searchLLC(params) {
    return Http.get(`/dashboard/gateguard/building/llc/search?q=${params.q}`);
  },
};
