import Http from '@/bootstrap/http';

export default {
  getNews(params) {
    let limit = params.limit || 8;
    let query = '';
    if (params.publication) {
      query += `?publication_slug=${params.publication}`;
    }
    return Http.get(`/dashboard/articles/${limit}${query}`);
  },
};
