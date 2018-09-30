<template>
  <el-form ref="form"
           :rules="rules"
           :model="proxyValue" class="camera-form__container"
           label-position="top">
    <el-form-item>
      <el-radio-group v-model="proxyValue.camera_option"
                      class="radio-group--block">
        <el-radio label="own">I have a camera system in the building</el-radio>
        <el-radio label="request">I would like to add a
        camera system to the building
        </el-radio>
        <el-radio label="none">I do not have a
        camera system and do not want one
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="proxyValue.camera_option === 'own'">
      <el-form-item>
        <el-checkbox v-model="proxyValue.access">
          I can access it remotely
        </el-checkbox>
      </el-form-item>
      <h4 class="title">My login info is:</h4>
      <div v-if="proxyValue.access">
        <el-form-item prop="login_id" label="ID">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-input v-model="proxyValue.login_id" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="login_pass" label="PIN / Password">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-input v-model="proxyValue.login_pass" />
            </el-col>
          </el-row>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  export default {
    mixins: [FormComponentModel],
    data() {
      return {
        rules: {
          login_id: {
            required: true,
            trigger: 'change',
            message: 'Please enter Login ID info',
          },
          login_pass: {
            required: true,
            trigger: 'change',
            message: 'Please enter Login Password info',
          },
        },
      };
    },
  };
</script>
