import Vue from 'vue';
import Vuex from 'vuex';

import GateGuard from './modules/gateguard';
import Widgets from './modules/widgets';
import User from './modules/user';
import Company from './modules/company';
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    GateGuard,
    Widgets,
    User,
    Company,
  },
});
