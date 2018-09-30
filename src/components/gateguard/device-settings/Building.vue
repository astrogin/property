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

    <el-dialog
      :visible.sync="addCompanyVisible"
      :append-to-body="true"
      title="Add a Management Company">

      <el-form
        v-loading="loading"
        ref="form-add-company"
        :model="addCompanyForm"
        label-position="top">
        <el-form-item label="Management Company Name">
          <el-input v-model="addCompanyForm.name" />
        </el-form-item>
        <div v-if="!addCompanyForm.i_am_contact_person">
          <el-form-item
            label="Management Company Contact">
            <el-input
              v-model="addCompanyForm.first_name"
              placeholder="First name" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="addCompanyForm.last_name"
              placeholder="Last name" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="addCompanyForm.email"
              placeholder="Email" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="addCompanyForm.phone_number"
              placeholder="Mobile" />
          </el-form-item>
        </div>
        <el-form-item label="I’m the contact person">
          <el-switch v-model="addCompanyForm.i_am_contact_person" />
        </el-form-item>

        <el-form-item
          v-if="addCompanyForm.i_am_contact_person"
          label="My role">
          <el-radio-group v-model="addCompanyForm.role"
                          class="radio-group--block">
            <el-radio label="Executive" />
            <el-radio label="Property Manager"
                      class="el-radio-second-vertical" />
            <el-radio label="Other" class="el-radio-second-vertical" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Management Company Website">
          <el-input v-model="addCompanyForm.site" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCompanyVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="addCompany()"
        >Submit</el-button>
      </span>
    </el-dialog>
    <el-form
      ref="form"
      :model="proxyValue"
      :rules="rules"
      label-position="top">

      <!--<el-form-item label="Building Address" prop="building_address">
        <el-row>
          <el-col :sm="24" :md="12">
            <div class="el-input">
              <vue-google-autocomplete
                id="onwershipLLC"
                placeholder=""
                classname="el-input__inner"
                @inputChange="setAddress"/>
              <el-input v-model="proxyValue.building_address"
                        class="d-none"/>
            </div>
          </el-col>
        </el-row>
      </el-form-item>-->

      <el-form-item label="Building Name" prop="building_name">
        <el-row>
          <el-col :sm="24" :md="12">
            <el-input v-model="proxyValue.building_name" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Ownership LLC" prop="ownership_llc">
        <p v-if="lLengthValidate" style="color: red">Please, input 3 or more symbols</p>
        <el-row>
          <el-col :sm="24" :md="12">
            <el-autocomplete
              v-model="proxyValue.ownership_llc"
              :fetch-suggestions="searchLLC"
              placeholder="Please input"
              @select="handleLLCSelect"
              style="width: 100%">
              <template slot-scope="{ item }">
                <div class="value">{{ item }}</div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Property">
        <el-radio-group v-model="proxyValue.is_multiple"
                        class="radio-group--block">
          <el-radio :label="false">
            This is the only building on the property
          </el-radio>
          <el-radio :label="true" class="el-radio-second-vertical">
            There are multiple buildings on this property
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-if="proxyValue.is_multiple">
        <el-form-item label="Name the property">
          <el-input v-model="proxyValue.property_name" />
        </el-form-item>
      </div>

      <el-form-item label="Portfolio">
        <p v-if="pLengthValidate" style="color: red">Please, input 3 or more symbols</p>
        <el-select
          :remote-method="searchPortfolio"
          v-model="proxyValue.portfolio"
          filterable
          remote
          reserve-keyword
          clearable
          placeholder="Search portfolio">
          <el-option
            v-for="item in portfolios"
            :key="item.id"
            :label="item.name"
            :value="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="Management Company">
        <el-radio-group v-model="proxyValue.management_company_type"
                        class="radio-group--block">
          <el-radio label="company">
            Management Company
          </el-radio>
          <el-radio label="self_manage" class="el-radio-second-vertical">
            We self-manage this property, but are not a management company
          </el-radio>
          <el-radio
            label="self_manage_company"
            class="el-radio-second-vertical">
            We are the management company
          </el-radio>
        </el-radio-group>

      </el-form-item>

      <div v-if="proxyValue.management_company_type == 'company'">
        <el-form-item label="Select Company">
          <p v-if="cLengthValidate" style="color: red">Please, input 3 or more symbols</p>
          <el-select
            :remote-method="searchCompanies"
            :loading="loading"
            v-model="proxyValue.management_company_id"
            filterable
            remote
            multiple
            reserve-keyword
            placeholder="Select">
            <el-option
              v-for="(item,index) in companies"
              :key="index"
              :label="item.name"
              :value="item.name" />
          </el-select>
          <a href="#"
             class="d-block"
             @click="addCompanyVisible = true"
          >+ Add a Management Company</a>
        </el-form-item>
      </div>
      <el-form-item label="Property Manager(s)">
        <p v-if="uLengthValidate" style="color: red">Please, input 3 or more symbols</p>
        <el-select
          :remote-method="searchUsers"
          :loading="loading"
          @change="handleChangeUsers"
          v-model="form.property_managers"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="Select"
          value-key="first_name"
          style="margin-right:15px;">
          <el-option
            v-for="(item,index) in property_managers"
            :key="item.id"
            :label="item.first_name + ' ' + item.last_name"
            :value="item" />
        </el-select>
        <a href="#"
           class="d-block"
           @click="addUserVisible = true">+ Add a user</a>
        <el-checkbox v-model="proxyValue.apply_manager_to_all"
                     class="el-checkbox--flex">
          Apply this manager to all buildings on this property
        </el-checkbox>
      </el-form-item>

      <el-form-item label="Types of units">
        <b style="display:block;">Residential</b>
        <el-checkbox-group
          v-model="proxyValue.types_of_units.residential"
          multiple placeholder="Select"
          class="el-checkbox-group--flex">
          <el-checkbox
            v-for="item in residential"
            :key="item.value"
            :label="item.value"
            :value="item.value" />
        </el-checkbox-group>
        <b style="display:block;">Office</b>
        <el-radio-group v-model="proxyValue.types_of_units.office"
                        class="radio-group--block">
          <el-radio label="one">
            One company
          </el-radio>
          <el-radio label="many">
            Multiple companies
          </el-radio>
        </el-radio-group>
        <b style="display:block;">Industrial</b>
        <el-checkbox-group
          v-model="proxyValue.types_of_units.industrial"
          multiple placeholder="Select"
          class="el-checkbox-group--flex">
          <el-checkbox
            v-for="item in ['Warehouse', 'Factory']"
            :key="item"
            :label="item"
            :value="item" />
        </el-checkbox-group>

        <b style="display:block;">Educational</b>
        <el-checkbox-group
          v-model="proxyValue.types_of_units.educational"
          multiple placeholder="Select"
          class="el-checkbox-group--flex">
          <el-checkbox
            v-for="item in [
              'Nursery-Kindergarten',
              'Elementary-Middle',
              'High School',
              'College/University',
              'Professional',
              'Vocational'
            ]"
            :key="item"
            :label="item"
            :value="item" />
        </el-checkbox-group>

        <b style="display:block;">Athletic</b>
        <el-checkbox-group
          v-model="proxyValue.types_of_units.athletic"
          multiple placeholder="Select"
          class="el-checkbox-group--flex">
          <el-checkbox
            v-for="item in [
              'Gym (membership-based)',
              'Field (closed)',
              'Pool',
              'Other'
            ]"
            :key="item"
            :label="item"
            :value="item" />
        </el-checkbox-group>

        <b style="display:block;">Retail</b>
        <el-checkbox-group
          v-model="proxyValue.types_of_units.retail"
          multiple placeholder="Select"
          class="el-checkbox-group--flex">
          <el-checkbox
            v-for="item in [
              'Store',
              'Store office',
              'Showroom',
              'Employee Lounge'
            ]"
            :key="item"
            :label="item"
            :value="item" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import FormComponentModel from '@/mixins/form-component-model';
  import UserApi from '@/api/gateguard/user';
  import BuildingApi from '@/api/gateguard/building';
  import CompanyApi from '@/api/gateguard/company';
  import Portfolio from '@/api/gateguard/portfolio';
  import Building from '@/api/gateguard/building';
  export default {
    name: 'device-settings-building',
    components: {
      VueGoogleAutocomplete,
    },
    mixins: [FormComponentModel],
    data() {
      return {
        loading: false,
        residential: [
          {value: 'Private (1 family)'},
          {value: 'Rental'},
          {value: 'Condo'},
          {value: 'Coop'},
          {value: 'Mixed'},
          {value: 'Other'},
        ],
        property_managers: [],
        addCompanyVisible: false,
        addUserVisible: false,
        companies: [],
        portfolios: [],
        loadingLLC: false,
        addUserForm: {
          device_id: this.$route.params.id,
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
        },
        addCompanyForm: {
          device_id: this.$route.params.id,
          name: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          i_am_contact_person: false,
          role: '',
          site: '',
        },
        rules: {
          building_address: {
            required: true,
            message: 'Please input Building address',
            trigger: 'change',
          },
          building_name: {
            required: true,
            message: 'Please input Building name',
            trigger: 'blur',
          },
        },
        uLengthValidate: false,
        cLengthValidate: false,
        pLengthValidate: false,
        lLengthValidate: false,
        form: {
          building: {
            types_of_units: {
              residential: [],
              office: 'one',
              industrial: [],
              educational: [],
              athletic: [],
              retail: [],
            },
            property_managers: [],
            management_company_type: '',
            property_name: '',
            building_address: '',
            building_name: '',
            ownership_llc: '',
            is_multiple: 0,
          },
        },
        i: 1,
      };
    },
    watch: {
      'proxyValue.property_managers'(val) {
        if (this.i === 1) {
          this.property_managers = val;
          this.form.property_managers = val;
          this.i++
        }
      }
    },
    created() {
      CompanyApi.getCompanies().then((res) => {
        this.companies = res.data;
      });
    },
    methods: {
      ...mapActions({
        createNewUser: 'User/createNewUser',
        createNewCompany: 'Company/createNewCompany',
      }),
      addCompany() {
        const h = this.$createElement;
        this.loading = true;
        this.createNewCompany(this.addCompanyForm)
          .then((res) => {
            this.companies.push(this.addCompanyForm);
            this.loading = false;
            this.$notify({
              title: 'Company creating',
              message: h('i', {style: 'color: green'}, 'Success.'),
            });
            this.addCompanyVisible = false;
            this.addCompanyForm = {
              name: '',
              first_name: '',
              last_name: '',
              email: '',
              phone_number: '',
              i_am_contact_person: false,
              role: '',
              site: '',
            };
          })
          .catch((err) => {
            this.loading = false;
            this.$notify({
              title: 'Company creating',
              message: h('i', {style: 'color: red'}, 'Failed.'),
            });
        });
      },
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
      setAddress(changes) {
        this.proxyValue.building_address = changes.newVal;
      },
      searchCompanies(query) {
        let self = this;
        if (query !== '') {
          if (query.length >= 3) {
            self.loading = true;
            self.cLengthValidate = false;
            CompanyApi.getCompanies({q: query}).then((res) => {
              self.companies = res.data;
              self.loading = false;
            }).catch((err) => {
              self.loading = false;
            });
          } else {
            self.cLengthValidate = true;
          }
        } else {
          self.cLengthValidate = false;
        }
      },
      searchUsers(query) {
        let self = this;
        if (query !== '') {
          if (query.length >= 3) {
            self.loading = true;
            self.uLengthValidate = false;
            UserApi.getUsers({q: query}).then((res) => {
              self.property_managers = res.data;
              self.loading = false;
            });
          } else {
            self.uLengthValidate = true;
          }
        } else {
          self.uLengthValidate = false;
        }
      },
      searchPortfolio(query) {
        let self = this;
        if (query !== '') {
          if (query.length >= 3) {
            self.pLengthValidate = false;
            Portfolio.search({q: query}).then((res) => {
              self.portfolios = res.data;
            });
          } else {
            self.pLengthValidate = true;
          }
        } else {
          self.pLengthValidate = false;
        }
      },
      searchLLC(query, cb) {
        let self = this;
        if (query !== '') {
          if (query.length >= 3) {
            self.loadingLLC = true;
            self.lLengthValidate = false;
            Building.searchLLC({q: query}).then((res) => {
              let result = [];
              res.data.forEach(function (value) {
                result.push(value.owner_0 +
                  ' (' + value.property_addr + ')');
              });
              cb(result);
              self.loadingLLC = false;
            }).catch((err) => {
              self.loadingLLC = false;
            });
          } else {
            self.lLengthValidate = true;
          }
        } else {
          self.lLengthValidate = false;
        }
      },
      handleLLCSelect(item) {
        this.proxyValue.ownership_llc = item
      },
      handleChangeUsers() {
        this.proxyValue.property_managers = this.form.property_managers;
      },
    },
  };
</script>
