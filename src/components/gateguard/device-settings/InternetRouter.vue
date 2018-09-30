<template>
  <el-form ref="form"
           :model="proxyValue"
           label-position="top"
           class="internet-router__container">
    <el-form-item label="Do you want to use
                  the device as a 4G router for your building?">
      <el-checkbox-group v-model="proxyValue.use_device"
                         class="el-checkbox-group--flex">
        <el-checkbox :label="0">
          Yes, run an ethernet cable from
          the device to my basement/utility room (+ $849 / day)
        </el-checkbox>
        <el-checkbox :label="1">
          Yes, provide an 8-port switch at the end of
          the cable into-which I can plug my water,
          boiler, and camera systems ($349)
        </el-checkbox>
        <el-checkbox :label="2">
          Yes, provide a locking rack [$499] to protect the device
        </el-checkbox>
        <el-checkbox :label="3">
          Yes, provide a battery backup [$349] (rack required)
          for my internet and switcs
        </el-checkbox>
        <el-checkbox :label="4">
          Yes, connect to my landline internet as fallback
          (ethernet wiring & switch required)
          <br>
          (recommended for larger buildings & ongoing camera streaming)
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="My internet provider is">
      <el-select
        v-model="proxyValue.internet_provider"
        :disabled="proxyValue.internet_provider_none"
        collapse-tags
        placeholder="Select"
        style="margin-right:15px;"
        class="mb-5">
        <el-option
          v-for="item in internetProviders"
          :key="item.name"
          :label="item.name"
          :value="item.name"/>
      </el-select>
      <el-checkbox v-model="proxyValue.internet_provider_none"
                   class="el-checkbox--flex">
        I do not know
      </el-checkbox>
      <el-checkbox v-model="proxyValue.internet_live"
                   class="el-checkbox--flex">
        I have checked that my internet is live now
        (such as by checking cameras remotely).
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
        internetProviders: [
          {
            name: 'Verizon FiOS',
          },
          {
            name: 'Verizon DSL',
          },
          {
            name: 'Spectrum',
          },
          {
            name: 'RCN',
          },
          {
            name: 'Optimum',
          },
        ],
      };
    },
  };
</script>
