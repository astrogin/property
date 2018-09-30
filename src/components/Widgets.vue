<template>
  <div class="side-widget__container">
    <el-row>
      <el-col :span="24">
        <AlertMessages :notifications="notifications"
                       :loading="notificationsLoading"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <News :articles="articles" :loading="articlesLoading"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import AlertMessages from '@/components/layouts/widgets/AlertMessages';
  import News from '@/components/layouts/widgets/News';
  export default {
    name: 'widgets',
    components: {
      AlertMessages,
      News,
    },
    computed: {
      ...mapGetters({
        notifications: 'Widgets/AlertMessages/notifications',
        notificationsLoading: 'Widgets/AlertMessages/loading',
        articles: 'Widgets/News/articles',
        articlesLoading: 'Widgets/News/loading',
      }),
    },
    mounted() {
      this.getNotifications();
      this.getNews();
    },
    methods: {
      ...mapActions({
        getNotifications: 'Widgets/AlertMessages/getNotifications',
        getNews: 'Widgets/News/getNews',
      }),
    },
  };
</script>
