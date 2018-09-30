import {NEWS} from '@/constants/mutation-types';

export default {
  [NEWS.GET_NEWS_START](state) {
    state.loading = true;
  },
  [NEWS.SET_NEWS](state, articles) {
    state.articles = articles;
  },
  [NEWS.GET_NEWS_FINAL](state) {
    state.loading = false;
  },
};
