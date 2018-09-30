<template>
  <div class="box no-border-box news-block">
    <div class="box-header ">
      <h3 class="box-title news-block__title">Real Estate News</h3>
    </div>
    <div class="box-body">
      <div class="news-block__row">
        <div v-if="loading" class="overlay" style="padding: 50px;">
          <i class="fa fa-refresh fa-spin" />
        </div>
        <div v-for="article in articles"
             :key="article.id"
             class="news-block__card">
          <div class="news-block__card__left">
            <a :href="`/dashboard/article/${article.id}`" class="news_link">
              <div :style="{'background-image': `url('${article.photo1_url}')`}"
                   class="news-block__card__left__image"/>
            </a>
          </div>
          <div class="news-block__card__right">
            <div class="news-block__card__right__header">
              <a :href="`/dashboard/article/${article.id }`"
                 class="news_link">
                {{ article.title }}
              </a>
            </div>
            <div :title="article.publication.title"
                 class="news-block__card__right__source text-uppercase">
              {{article.publication.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      articles: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
