<template>
  <el-form ref="form"
           :model="proxyValue" class="plan__container"
           label-position="top">
    <el-form-item label="Select a plan (paid yearly)">
      <el-radio-group v-model="proxyValue.plan">
        <el-radio label="gold">Gold</el-radio>
        <el-radio label="platinum">Platinum</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :xs="24" :md="8">
        <div class="price-plan-block">
          <div class="top-block clearfix">
            <h3>GOLD</h3>
          </div>
          <div class="btm-block clearfix">
            <h4>$49 <span>/ mo</span></h4>
            <h5>or $499 yearly</h5>
            <div class="block-txt clearfix">
              <dl>
                <dd class="clearfix">
                  <span class="txt-1">Included</span>
                  <span class="txt-2">Insurance</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Face Rec</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">App Buzz</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Visitor Codes</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Guest Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <span class="pl-3">-</span>
                  </div>
                  <span class="txt-2">Delivery Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <span class="pl-3">-</span>
                  </div>
                  <span class="txt-2">Vendor Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <span class="pl-3">-</span>
                  </div>
                  <span class="txt-2">Broker Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Device Backup</span>
                </dd>
                <dd class="clearfix">
                  <span class="txt-1">30 Day</span>
                  <span class="txt-2">Record Storage</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <span class="pl-3">-</span>
                  </div>
                  <span class="txt-2">Locker Integration</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="8">
        <div class="price-plan-block">
          <div class="top-block clearfix">
            <h3>PLATINUM</h3>
          </div>
          <div class="btm-block clearfix">
            <h4>$149 <span>/ mo</span></h4>
            <h5>or $1499 yearly</h5>
            <div class="block-txt clearfix">
              <dl>
                <dd class="clearfix">
                  <span class="txt-1">Included</span>
                  <span class="txt-2">Insurance</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Face Rec</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">App Buzz</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Visitor Codes</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Guest Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Delivery Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Vendor Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Broker Tracking</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Device Backup</span>
                </dd>
                <dd class="clearfix">
                  <span class="txt-1">3 Years</span>
                  <span class="txt-2">Record Storage</span>
                </dd>
                <dd class="clearfix">
                  <div class="txt-1">
                    <div class="el-step__icon is-text">
                      <i class="el-step__icon-inner is-status el-icon-check"/>
                    </div>
                  </div>
                  <span class="txt-2">Locker Integration</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  export default {
    mixins: [FormComponentModel],
  };
</script>
