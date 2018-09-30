<template>
  <div>
    <el-dialog
      :visible.sync="addUserVisible"
      :append-to-body="true"
      title="Add User">

      <el-form
        v-loading="loading"
        ref="form-add-user"
        :model="addUserForm"
        label-position="top">
        <el-form-item label="First Name">
          <el-input v-model="addUserForm.first_name" />
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="addUserForm.last_name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="addUserForm.email" />
        </el-form-item>
        <el-form-item label="Mobile">
          <el-input v-model="addUserForm.phone_number" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="addUser()"
        >Submit</el-button>
      </span>
    </el-dialog>
    <el-form ref="form"
             :model="proxyValue"
             label-position="top"
             class="installation-day__container">
      <h4>You MUST have someone at the building who
        can provide access to the basement / utility area so we can get power:</h4>
      <el-form-item label="Select the staff person who will be present">
        <p v-if="aLengthValidate" style="color: red">Please, input 3 or more symbols</p>
        <el-select
          :remote-method="searchUsers"
          :loading="loading"
          @change="handleChangeUsers"
          v-model="a_managers"
          filterable
          remote
          multiple
          reserve-keyword
          value-key="first_name"
          placeholder="Select"
          style="margin-right:15px;">
          <el-option
            v-for="(item,index) in property_managers"
            :key="item.id"
            :label="item.first_name + ' ' + item.last_name"
            :value="item" />
        </el-select>
        <a href="#"
           class="d-block"
           @click="addUserVisible = true">+ Add a person</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import FormComponentModel from '@/mixins/form-component-model';
  import UserApi from '@/api/gateguard/user';
  export default {
    mixins: [FormComponentModel],
    data() {
      return {
        loading: false,
        addUserVisible: false,
        property_managers: [],
        aLengthValidate: false,
        a_managers: [],
        addUserForm: {
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
        },
        i: 1,
      };
    },
    watch: {
      'proxyValue.access_managers'(val) {
        console.log(val);
        if (this.i === 1) {
          //if (!this.property_managers.length) {
            this.property_managers = val;
          //}
          this.a_managers = val;
          this.i++
        }
      }
    },
    methods: {
      ...mapActions({
        createNewUser: 'User/createNewUser',
      }),
      addUser() {
        const h = this.$createElement;
        this.loading = true;
        this.createNewUser(this.addUserForm)
          .then((res) => {
            this.property_managers.push(this.addUserForm);
            this.loading = false;
            this.$notify({
              title: 'User creating',
              message: h('i', {style: 'color: green'}, 'Success.'),
            });
            this.addUserVisible = false;
            this.addUserForm = {
              first_name: '',
              last_name: '',
              email: '',
              phone_number: '',
            };
          })
          .catch((err) => {
            this.loading = false;
            this.$notify({
              title: 'User creating',
              message: h('i', {style: 'color: red'}, 'Failed.'),
            });
          });
      },
      searchUsers(query) {
        let self = this;
        if (query !== '') {
          if (query.length >= 3) {
            self.loading = true;
            self.aLengthValidate = false;
            UserApi.getUsers({q: query}).then((res) => {
              self.property_managers = res.data;
              self.loading = false;
            });
          } else {
            self.aLengthValidate = true;
          }
        } else {
          self.aLengthValidate = false;
        }
      },
      handleChangeUsers() {
        console.log(this.a_managers);
        this.proxyValue.access_managers = this.a_managers;
      },
    },
  };
</script>
