import Vue from 'vue';
import moment from 'moment';

export default Vue.filter('dateFormat', function(text, length, clamp) {
  let currentDate = moment().format('YYYY-MM-DD');
  let createdDateArr = text.split(' ');
  if (currentDate === createdDateArr[0]) {
    return 'Today';
  } else {
    return moment(text).format('MMM DD h:mm a');
  }
});
