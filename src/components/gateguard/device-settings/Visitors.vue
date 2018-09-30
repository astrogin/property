<template>
  <el-form ref="form"
           :model="proxyValue"
           label-position="top">
    <el-form-item>
      <el-radio-group v-model="proxyValue.option"
                      class="radio-group--block">
        <el-radio label="all">
          Enable all residents to create visitor codes
        </el-radio>
        <el-radio label="me">
          I will enable specific residents to create visitor codes
        </el-radio>
        <el-radio label="none">
          Do not enable any visitor codes
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="proxyValue.option === 'all'"
                  label="Maximum Visitor Codes">
      <el-select v-model="proxyValue.maximum_visitor_codes"
                 placeholder="Select"
                 default-first-option>
        <el-option
          v-for="option in form.visitorCodesOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </el-select>
    </el-form-item>
    <p>
      <span class="font-weight-bold">Note:</span>&nbsp;
      We reserve control delivery rules for all buildings&nbsp;
      and reserve the right to reject/remove codes created&nbsp;
      for courier services (they pay for access).
    </p>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  const visitorCodesOptions = [];
  for (let i = 0; i < 21; i++) {
    let obj = {
      label: '',
      value: '',
    };
    obj.label = i === 0 ? 'Unlimited' : i;
    obj.value = i;
    visitorCodesOptions.push(obj);
  }
  export default {
    mixins: [FormComponentModel],
    data() {
      return {
        form: {
          visitorCodesOptions: visitorCodesOptions,
        },
      };
    },
  };
</script>
