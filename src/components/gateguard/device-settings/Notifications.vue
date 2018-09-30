<template>
  <el-form ref="form"
           :model="proxyValue"
           label-position="top"
           class="notification__container">
    <el-form-item>
      <el-checkbox v-model="proxyValue.land_line"
                   class="el-checkbox--flex">
        If the device loses landline internet within
        <el-select
          v-model="proxyValue.land_line_notifications"
          placeholder="Select"
          style="margin-right:15px;"
          class="el-checkbox--flex">
          <el-option
            v-for="item in timeInterval"
            :key="item.name"
            :label="item.name"
            :value="item.name"/>
        </el-select>
        minutes
      </el-checkbox>
      <h4>(Services like Spectrum can lose
      internet for 8-25 minutes at a time throughout the day)</h4>
      <div class="sub-section__container">
        Via:
        <el-checkbox-group v-model="proxyValue.services"
                           class="el-checkbox-group--flex">
          <el-checkbox :label="0">SMS</el-checkbox>
          <el-checkbox :label="1">Email</el-checkbox>
          <el-checkbox :label="2">PropertyPanel Alert</el-checkbox>
          <el-checkbox :label="3">Slack (click to integrate)</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-checkbox v-model="proxyValue.fourG"
                   class="el-checkbox--flex">
        If the device loses 4G internet within
        <el-select
          v-model="proxyValue.fourGNotifications"
          collapse-tags
          placeholder="Select"
          style="margin-right:15px;"
          class="el-checkbox--flex">
          <el-option
            v-for="item in timeInterval"
            :key="item.name"
            :label="item.name"
            :value="item.name"/>
        </el-select>
        minutes
      </el-checkbox>
      <el-checkbox v-model="proxyValue.online"
                   class="el-checkbox--flex">
        If the device comes back online
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  export default {
    mixins: [FormComponentModel],
    data() {
      return {
        timeInterval: [
          {
            name: '1',
          },
          {
            name: '15',
          },
          {
            name: '30',
          },
          {
            name: '45',
          },
          {
            name: '90',
          },
        ],
      };
    },
  };
</script>
