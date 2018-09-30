<template>
  <div style="display: inline-block; vertical-align: top">
    <button class="btn btn btn-primary"
            @click="dialogVisible = true">
      + ADD INDIVIDUAL
    </button>

    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      class="individuals_modal"
      title="Add new Individual">
      <div v-loading="loading">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="property">
            <label for="property">Property</label><br>
            <el-select
              id="property"
              :remote-method="getProperties"
              :loading="loadingProp"
              v-model="form.property"
              size="mini"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="Search property">
              <el-option
                v-for="(item, index) in properties"
                :key="index"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item prop="buildings">
            <label for="building">Buildings</label><br>
            <el-select
              id="building"
              :remote-method="getBuildings"
              :loading="loadingBuilding"
              v-model="form.buildings"
              size="mini"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Search building">
              <el-option
                v-for="(item, index) in buildings"
                :key="index"
                :label="item.full_name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item prop="companies">
            <label for="companies">Organizations</label><br>
            <el-select
              id="companies"
              :remote-method="getCompanies"
              :loading="loadingOrg"
              v-model="form.companies"
              size="mini"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Search Organizations">
              <el-option
                v-for="(item, index) in companies"
                :key="index"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item prop="role">
            <label for="role">Role</label>
            <el-select
              id="role"
              v-model="form.role"
              size="mini"
              reserve-keyword
              placeholder="Set user role">
              <el-option
                v-for="(item, index) in roles"
                :key="index"
                :label="item.name"
                :value="item.name" />
            </el-select>
          </el-form-item>

          <el-form-item prop="first_name">
            <label for="firs_name">First name</label>
            <input id="firs_name" v-model="form.first_name"
                   type="text" class="form-control"
                   placeholder="First name">
          </el-form-item>
          <el-form-item prop="last_name">
            <label for="last_name">Last name</label>
            <input id="last_name" v-model="form.last_name"
                   type="text" class="form-control"
                   placeholder="Last name">
          </el-form-item>
          <el-form-item prop="mobile_phone">
            <label for="mob_phone">Mobile phone</label>
            <input id="mob_phone" v-model="form.mobile_phone"
                   format="9999999999" type="text" class="form-control"
                   placeholder="Mobile phone">
          </el-form-item>
          <el-form-item prop="email">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="text"
                   class="form-control" placeholder="Email">
          </el-form-item>
          <div class="form-group" style="text-align: right">
            <span slot="footer" class="dialog-footer"
                  style="display: inline-block">
              <el-button size="mini" @click="dialogVisible = false">
                Close
              </el-button>
              <el-button size="mini" type="success" @click="saveFormTrigger">
                Add
              </el-button>
            </span>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import PropertyApi from '@/api/gateguard/property';
  import BuildingApi from '@/api/gateguard/building';
  import OrganizationApi from '@/api/gateguard/organizations';
  import IndividualApi from '@/api/gateguard/individuals';
  export default {
    data() {
      return {
        loading: false,
        loadingProp: false,
        loadingBuilding: false,
        loadingOrg: false,
        companies: [],
        properties: [],
        buildings: [],
        dialogVisible: false,
        roles: [
          {name: 'owner'},
          {name: 'tenant'},
          {name: 'guest'},
        ],
        form: {
          property: null,
          buildings: [],
          companies: [],
          role: '',
          email: '',
          mobile_phone: '',
          first_name: '',
          last_name: '',
        },
        rules: {
          property: [
            {
              required: true,
              message: 'Please choose property',
              trigger: 'change',
            },
          ],
          buildings: [
            {
              required: true,
              message: 'Please choose building(s)',
              trigger: 'change',
            },
          ],
          companies: [
            {
              required: true,
              message: 'Please choose organization(s)',
              trigger: 'change',
            },
          ],
          role: [
            {
              required: true,
              message: 'Please choose user role',
              trigger: 'change',
            },
          ],
          first_name: [
            {
              required: true,
              message: 'Please input user first name',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 255,
              message: 'Length should be 3 to 255',
              trigger: 'blur',
            },
          ],
          last_name: [
            {
              required: true,
              message: 'Please input user last name',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 255,
              message: 'Length should be 3 to 255',
              trigger: 'blur',
            },
          ],
          mobile_phone: [
            {
              required: true,
              pattern: /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/,
              message: 'Please input valid phone(min 10 numbers)',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              message: 'Please enter you email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    methods: {
      saveFormTrigger() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const h = this.$createElement;
            this.loading = true;
            IndividualApi.create(this.form).then((res) => {
              this.loading = false;
              this.$notify({
                title: 'Individual added',
                message: h('i', {style: 'color: green'}, 'Success.'),
              });
              this.$emit('ind-created', res.data.data);
              this.dialogVisible = false;
            }).catch((err) => {
              this.loading = false;
              this.$notify({
                title: 'Individual didn\'t add',
                message: h('i', {style: 'color: red'}, 'Failed.'),
              });
              this.dialogVisible = false;
            });
          } else {
            return false;
          }
        });
      },
      getBuildings(search) {
        let ids = [];
        this.loadingBuilding = true;
        if (this.properties) {
          this.properties.forEach(function(value, index) {
            ids.push({id: value.id});
          });
        }
        let params = {
          q: search,
          properties: ids,
        };
        BuildingApi.search(params).then((resp) => {
          this.buildings = resp.data;
          this.loadingBuilding = false;
        }).catch((err) => {
          this.loadingBuilding = false;
        });
      },
      getProperties(search) {
        this.loadingProp = true;
        PropertyApi.search({q: search}).then((resp) => {
          this.properties = resp.data;
          this.loadingProp = false;
        }).catch((err) => {
          this.loadingProp = false;
        });
      },
      getCompanies(search) {
        this.loadingOrg = true;
        OrganizationApi.search({q: search}).then((res) => {
          this.companies = res.data.data;
          this.loadingOrg = false;
        }).catch((err) => {
          this.loadingOrg = false;
        });
      },
    },
  };
</script>
