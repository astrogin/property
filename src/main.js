require('bootstrap');
require('./old-vendor/app.js');
require('./old-vendor/typeahead.js');

import Vue from 'vue';

import ElementUI from 'element-ui';
import ElementLocaleEN from 'element-ui/lib/locale/lang/en.js';
import ElementLocale from 'element-ui/lib/locale';

import 'element-ui/lib/theme-chalk/index.css';
import './styles/app.scss';

import router from './router/index';
import store from './store/index';

import '@/utils/filters';
import gateGuardRightBar from './layouts/gateguard/RightBar';
import Widgets from '@/components/Widgets';

Vue.config.productionTip = false;

ElementLocale.use(ElementLocaleEN);
Vue.use(ElementUI);

new Vue({
  el: '#propertypanel-app',
  components: {
    gateGuardRightBar,
    Widgets,
  },
  router,
  store,
  created() {
    console.log('created');
  },
});
