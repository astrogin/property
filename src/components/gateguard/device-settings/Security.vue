<template>
  <el-form ref="form"
           :model="proxyValue"
           label-position="top">
    <el-form-item label="Delay showing “Unlock Door”
    button when requiring selfie">
      <el-select v-model="proxyValue.selected_delay_option"
                 placeholder="Select"
                 default-first-option>
        <el-option
          v-for="option in form.delayOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="proxyValue.show_selfie"
                   class="el-checkbox--flex">
        Show selfie video on motion detection
      </el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  const delayOptions = [];
  for (let i = 0; i < 31; i++) {
    let obj = {
      label: '',
      value: i,
    };
    obj.label = i + ' seconds';
    if (i === 0) {
      obj.label = 'None';
    }
    if (i === 1) {
      obj.label = i + ' second';
    }
    delayOptions.push(obj);
  }
  export default {
    mixins: [FormComponentModel],
    data() {
      return {
        form: {
          delayOptions: delayOptions,
        },
      };
    },
  };
</script>
