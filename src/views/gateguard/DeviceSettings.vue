<template>
  <div v-loading="loading" class="device-settings__container">

    <el-menu ref="mobileSteps"
             :collapse-transition="false"
             :unique-opened="true"
             default-active="1"
             class="settings-steps-mobile"
             mode="horizontal">
      <el-menu-item v-if="active < steps.length"
                    index="1"
                    class="current-step">
        {{`${active + 1}. ${steps[active] ? steps[active].title: 'Finished'}`}}
      </el-menu-item>
      <el-submenu :popper-append-to-body="false"
                  :show-timeout="0"
                  :hide-timeout="0"
                  index="2"
                  class="remain-steps">
        <template slot="title">
          {{active === steps.length - 1 ?
            'Finished' : `${active + 2}. ${
          steps[active + 1] ? steps[active + 1].title : ''}`}}
        </template>
        <el-menu-item v-for="(step, index) in steps"
                      v-if="index !== active"
                      :key="step.title"
                      :index="`2-${index}`"
                      @click="setStep(index)"
                      @click.native="setStep(index)">
          {{`${index + 1}. ${step.title}`}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <br>
    <br>
    <hr>
    <br>
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component ref="currentForm"
                   v-bind:is="currentForm.component"
                   v-model="currentForm.model"/>
      </keep-alive>
    </transition>
    <el-button style="margin-top: 12px;" @click="next">
      {{active === steps.length - 1 ? `Submit`: `Next step`}}
    </el-button>
    <el-button v-if="active !== steps.length - 1"
               type="success" style="margin-top: 12px;" @click="submit">
      Save
    </el-button>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import Building from '@/components/gateguard/device-settings/Building';
  import PinFace from '@/components/gateguard/device-settings/PinFace';
  import HomeScreen from '@/components/gateguard/device-settings/HomeScreen';
  import Visitors from '@/components/gateguard/device-settings/Visitors';
  import Security from '@/components/gateguard/device-settings/Security';
  import Camera from '@/components/gateguard/device-settings/Camera';
  import Plan from '@/components/gateguard/device-settings/Plan';
  import Delivery from '@/components/gateguard/device-settings/Delivery';
  import InternetRouter from
    '@/components/gateguard/device-settings/InternetRouter';
  import InstallationDay from
    '@/components/gateguard/device-settings/InstallationDay';
  import Notifications from
    '@/components/gateguard/device-settings/Notifications';
  export default {
    components: {
      Building,
      PinFace,
      HomeScreen,
      Visitors,
      Security,
      Camera,
      Plan,
      Delivery,
      InternetRouter,
      InstallationDay,
      Notifications,
    },
    props: {
      id: {
        required: true,
      },
    },
    data() {
      return {
        loading: false,
        active: 0,
        steps: [
          {
            title: 'Building',
            description: 'Some description',
          },
          {
            title: 'PIN / Face / Fob',
            description: 'Some description',
          },
          {
            title: 'Home Screen',
            description: 'Some description',
          },
          {
            title: 'Visitors',
            description: 'Some description',
          },
          {
            title: 'Security',
            description: 'Some description',
          },
          {
            title: 'Camera',
            description: 'Some description',
          },
          {
            title: 'Plan',
            description: 'Some description',
          },
          {
            title: 'Delivery Services',
            description: 'Some description',
          },
          {
            title: '4G Internet Router',
            description: 'Some description',
          },
          {
            title: 'Installation Day',
            description: 'Some description',
          },
          {
            title: 'Notifications',
            description: 'Some description',
          },
        ],
      };
    },
    computed: {
      currentForm() {
        switch (this.active) {
        case 0:
          return {
            component: 'Building',
            model: this.building,
          };
        case 1:
          return {
            component: 'PinFace',
            model: this.pinface,
          };
        case 2:
          return {
            component: 'HomeScreen',
            model: this.homeScreen,
          };
        case 3:
          return {
            component: 'Visitors',
            model: this.visitors,
          };
        case 4:
          return {
            component: 'Security',
            model: this.security,
          };
        case 5:
          return {
            component: 'Camera',
            model: this.camera,
          };
        case 6:
          return {
            component: 'Plan',
            model: this.plan,
          };
        case 7:
          return {
            component: 'Delivery',
            model: this.delivery,
          };
        case 8:
          return {
            component: 'InternetRouter',
            model: this.internetRouter,
          };
        case 9:
          return {
            component: 'InstallationDay',
            model: this.installationDay,
          };
        case 10:
          return {
            component: 'Notifications',
            model: this.notifications,
          };
        }
      },
      ...mapGetters({
        building: 'GateGuard/DeviceSettings/getBuildingSettings',
        pinface: 'GateGuard/DeviceSettings/getPinfaceSettings',
        homeScreen: 'GateGuard/DeviceSettings/getHomeScreenSettings',
        visitors: 'GateGuard/DeviceSettings/getVisitorsSettings',
        security: 'GateGuard/DeviceSettings/getSecuritySettings',
        camera: 'GateGuard/DeviceSettings/getCameraSettings',
        plan: 'GateGuard/DeviceSettings/getPlanSettings',
        delivery: 'GateGuard/DeviceSettings/getDeliverySettings',
        internetRouter: 'GateGuard/DeviceSettings/getInternetRouterSettings',
        installationDay: 'GateGuard/DeviceSettings/getInstallationDaySettings',
        notifications: 'GateGuard/DeviceSettings/getNotificationsSettings',
        getPendingStatus: 'GateGuard/DeviceSettings/getPendingStatus',
      }),
    },
    watch: {
      getPendingStatus(state) {
        this.loading = state;
      },
    },
    created() {
      this.getBuildingSettings({id: this.id});
    },
    methods: {
      ...mapActions({
        setBuildingSettings:
          'GateGuard/DeviceSettings/setCurrentBuildingSetting',
        getBuildingSettings:
          'GateGuard/DeviceSettings/getCurrentBuildingSettings',
      }),
      next() {
        const containerEl = document
          .querySelector('#propertypanel-app .wrapper .content-wrapper');
        this.$refs.currentForm.$refs.form.validate((valid) => {
          if (valid) {
            containerEl.scrollTo(0, 0);
            if (this.active === this.steps.length - 1) {
              this.submit();
              return;
            }
            this.active += 1;
          } else {
            setTimeout(() => {
              let firstInvalidEl =
                document.querySelector('.el-form-item__error');
              containerEl.scrollTo(
                firstInvalidEl.offsetLeft, firstInvalidEl.offsetTop
              );
              return false;
            }, 100);
          }
        });
      },
      submit() {
        const h = this.$createElement;
        this.loading = true;
        this.setBuildingSettings({
          id: this.id,
          building: this.building,
          pinface: this.pinface,
          homeScreen: this.homeScreen,
          visitors: this.visitors,
          security: this.security,
          camera: this.camera,
          plan: this.plan,
          delivery: this.delivery,
          internetRouter: this.internetRouter,
          installationDay: this.installationDay,
          notifications: this.notifications,
        }).then((res) => {
          this.loading = false;
          this.$notify({
            title: 'Update settings',
            message: h('i', {style: 'color: green'}, 'Success.'),
          });
        }).catch((err) => {
          this.loading = false;
          this.$notify({
            title: 'Update settings',
            message: h('i', {style: 'color: red'}, 'Failed.'),
          });
        });
      },
      stepStatus(index, stepsOnEachRow, rowIndex, currentStep) {
        if (currentStep === index) {
          return 'process';
        } else if (index < currentStep) {
          return 'success';
        } else {
          return 'wait';
        }
      },
      setStep(index) {
        this.active = index;
        setTimeout(() => {
          this.$refs.mobileSteps.close('2');
        }, 100);
      },
    },
  };
</script>
