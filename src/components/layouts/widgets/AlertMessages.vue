<template>
  <div class="box no-border-box alerts-messages">
    <div class="box-body no-padding ">
      <div v-if="loading" class="overlay" style="padding: 50px;">
        <i class="fa fa-refresh fa-spin" />
      </div>
      <table v-if="!loading" class="table alerts-messages__table
      table-condensed table-responsive no-padding">
        <thead>
          <th colspan="2" class="alerts-messages__table__title
          alerts-messages__table__title--first">
            Alerts & Messages
          </th>
          <th class="alerts-messages__table__title">FROM</th>
          <th class="alerts-messages__table__title">TIME</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in notifications" :key="index"
              style="cursor: pointer;"
              @click="onRowClick(item)">
            <td style="width: 20px;"
                class="alerts-messages__table__column
                alerts-messages__table__column--first">
              <span :class="newAgencyAlertClass(item)"
                    class="alerts-messages__table__column__badge"/>
            </td>
            <td v-if="isNewAgencyAlert(item)">
              {{item.data.title}}
            </td>
            <td v-if="!isNewAgencyAlert(item)">
              {{item.data.body | truncate('30')}}
            </td>
            <td>
              {{ isNewAgencyAlert(item) ?
              'AgencyAlert' : item.data.title}}
            </td>
            <td>
              <span :class="{'label label-info': item.created_at}">
                {{ item.created_at ?  item.created_at : 'New' | dateFormat}}
              </span>
            </td>
          </tr>
      </tbody></table>
    </div>
  </div>
</template>

<script>
  import Http from '@/bootstrap/http';
  // import Socket from '@/bootstrap/socket';
  export default {
    props: {
      notifications: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    mounted() {
      // this.reload();
      // if (typeof Socket.instance !== 'undefined') {
      //   Socket.instance.on('connect', function(data) {
      //     Socket.instance.emit('subscribe', {channel: 'chat.room'});
      //   });
      //   Socket.instance.emit('join', {
      //     room: 'notifications-' + Socket.currentSocketUser,
      //   });

      //   Socket.instance.on('private-notifications', (data) => {
      //     this.reload();
      //   });
      // }
    },
    methods: {
      reload: function() {
        this.loaded = false;
        Http.get('/notifications?limit=15').then((res) => {
          this.notifications = res.data.notifications;
          this.loaded = true;
        });
        // if (typeof socket !== 'undefined') {
        //   Http.get('/notifications?limit=15', (data) => {
        //     this.notifications = data.notifications;
        //     this.loaded = true;
        //   });
        // }
      },
      isNewAgencyAlert(item) {
        return item.type.indexOf('NewAgencyAlert') !== -1;
      },
      newAgencyAlertClass(item) {
        return {
          'alerts-messages__table__column__badge--red': this.isNewAgencyAlert(
            item
          ),
          'alerts-messages__table__column__badge--green':
            !this.isNewAgencyAlert(
              item
            ),
        };
      },
      onRowClick(item) {
        window.location = item.data.action_url;
      },
    },
  };
</script>
