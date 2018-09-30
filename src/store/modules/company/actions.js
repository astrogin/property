import {COMPANY} from '@/constants/mutation-types';
import CompanyApi from '@/api/gateguard/company';

export default {
  createNewCompany({commit, state}, payload) {
    commit(COMPANY.SET_DATA, payload);
    return CompanyApi.create(state.data);
  },
};
