<template>
  <el-form ref="form"
           :model="proxyValue"
           class="deliver__container">
    <h4>We are paid by couriers to access our buildings 24/7
    (that’s how we’re so cheap!)
    but you can buy codes for each service
    </h4>
    <el-form-item>
      <el-checkbox-group v-model="proxyValue.services"
                         :disabled="proxyValue.all_services"
                         class="el-checkbox-group--flex">
        <el-checkbox label="ups">
          Yes, create a 24/7 code for UPS   ($1/unit/mo)
        </el-checkbox>
        <el-checkbox label="fedex">
          Yes, create a 24/7 code for FedEx  ($1/unit/mo)
        </el-checkbox>
        <el-checkbox label="amazon">
          Yes, create a 24/7 code for Amazon   ($1.5/unit/mo)
        </el-checkbox>
        <el-checkbox label="jet">
          Yes, create a 24/7 code for Jet   ($1.5/unit/mo)
        </el-checkbox>
        <el-checkbox label="dhl">
          Yes, create a 24/7 code for DHL   ($0.50/unit/mo)
        </el-checkbox>
        <el-checkbox label="usps">
          Yes, create a 24/7 code for USPS ($0.50/unit/mo)
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <p>Or:</p>
    <el-form-item>
      <el-checkbox v-model="proxyValue.all_services">
        Buy for all services (discount) : $4.50/unit/mo
      </el-checkbox>
    </el-form-item>
    <p>
      Do not create a code for these services without using this form.<br>
      The Fee for creating a code for any such service without
      payment is $10K + 3x the listed price for the full 10 years.
    </p>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  export default {
    mixins: [FormComponentModel],
  };
</script>
