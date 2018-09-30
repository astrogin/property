import News from '@/api/gateguard/news';
import {NEWS} from '@/constants/mutation-types';

export default {
  getNews({commit, state}) {
    commit(NEWS.GET_NEWS_START);
    News.getNews({limit: state.limit})
      .then((res) => {
        commit(NEWS.SET_NEWS, res.data);
      })
      .catch((err) => {

      })
      .finally(() => {
        commit(NEWS.GET_NEWS_FINAL);
      });
  },
};
