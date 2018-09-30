import Http from '@/bootstrap/http';

export default {
  getTenant(params) {
    return Http.get('/tenant/access/' + params.id + '/' + params.device_id);
  },
  getUserPin(params) {
    return Http.get('/dashboard/gateguard/tenant/access/' + params.id + '/' + params.device_id);
  },
  import(params) {
    return Http.post('/dashboard/gateguard/tenants/import/', params);
  },
};
