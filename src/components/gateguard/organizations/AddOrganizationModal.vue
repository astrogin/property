<template>
  <div style="display: inline-block; vertical-align: top">
    <div @click="show">
      <slot name="button">
        <button class="btn btn btn-primary">+ ADD ORGANIZATION</button>
      </slot>
    </div>

    <el-dialog
      class="individuals_modal"
      title="Add organization"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <div v-loading="loading">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="devices">
            <label for="device">Devices</label><br>
            <el-select
              :remote-method="getDevices"
              v-model="form.devices"
              size="mini"
              filterable
              multiple
              remote
              reserve-keyword
              placeholder="Search devices"
              id="device">
              <el-option
                v-for="(item, index) in devices"
                :key="index"
                :label="item.bbl"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <div class="form-group">
            <label for="building">Parent Organization</label><br>
            <el-select
              :remote-method="getOrganizations"
              v-model="form.parent"
              size="mini"
              filterable
              remote
              reserve-keyword
              clearable
              :disabled="disableParentRow"
              placeholder="Search organizations"
              id="building">
              <el-option
                v-for="(item, index) in organizations"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-form-item prop="name">
            <label for="name">Name</label>
            <input id="name" type="text" class="form-control" v-model="form.name" placeholder="Organization name">
          </el-form-item>
          <div class="form-group" style="text-align: right">
            <span slot="footer" class="dialog-footer"
                  style="display: inline-block">
              <el-button size="mini" @click="dialogVisible = false">Close</el-button>
              <el-button size="mini" type="success" @click="saveFormTrigger">Add</el-button>
            </span>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import DeviceApi from '@/api/gateguard/device';
  import OrganizationApi from '@/api/gateguard/organizations';
  export default {
    props: {
      parentOrg: {
        type: Object,
      },
    },
    data() {
      return {
        loading: false,
        devices: [],
        dialogVisible: false,
        disableParentRow: false,
        organizations: [],
        form: {
          devices: [],
          parent: [],
          name: '',
        },
        rules: {
          devices: [
            {required: true, message: 'Please choose property', trigger: 'change'},
          ],
          name: [
            {required: true, message: 'Please input organization name', trigger: 'blur'},
            {min: 2, max: 255, message: 'Length should be 3 to 255', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      saveFormTrigger() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const h = this.$createElement;
            if (this.parentOrg) {
              this.form.parent = this.parentOrg.id;
            }
            this.loading = true;
            OrganizationApi.create(this.form).then((res) => {
              this.loading = false;
              this.$notify({
                title: 'Organization added',
                message: h('i', {style: 'color: green'}, 'Success.'),
              });
              this.$emit('org-created', res.data.data);
              this.dialogVisible = false;
            }).catch((err) => {
              this.loading = false;
              this.$notify({
                title: 'Organization didn\'t add',
                message: h('i', {style: 'color: red'}, 'Failed.'),
              });
              this.dialogVisible = false;
            });
          } else {
            return false;
          }
        });
      },
      getDevices(search) {
        DeviceApi.search({q: search}).then((resp) => {
          this.devices = resp.data
        })
      },
      getOrganizations(search) {
        OrganizationApi.search({q: search}).then((res) => {
          this.organizations = res.data.data
        });
      },
      show() {
        this.dialogVisible = true;
        if (this.parentOrg) {
          this.disableParentRow = true;
          this.form.parent = this.parentOrg.name;
        }
      },
    },
  };
</script>
