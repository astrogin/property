import Vue from 'vue';
import Router from 'vue-router';
import gateguard from '@/router/gateguard';
import propertyManagement from '@/router/property-management';
import {merge as _merge} from 'lodash';

Vue.use(Router);

export default new Router({
  history: true,
  mode: 'history',
  root: '/dashboard',
  routes: _merge(gateguard, propertyManagement),
});
