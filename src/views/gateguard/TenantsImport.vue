<template>
  <div v-loading="loading" class="tenants-import-view-container">
    <div>
      <h1>Import Tenants</h1><br>
      <label for="device">Please choose building</label><br>
      <el-select
        id="device"
        :remote-method="getBuildings"
        v-model="form.building_id"
        size="mini"
        filterable
        clearable
        remote
        reserve-keyword
        placeholder="Search building">
        <el-option
          v-for="(item, index) in buildings"
          :key="index"
          :label="item.name"
          :value="item.id" />
      </el-select>
      <input v-if="form.building_id" type="file"
             class="form-control-file" @change="handleLoad">
      <div class="row">
        <el-card v-for="(item, index) in doc[0]" v-if="doc.length - 1"
                 :key="index + item" class="box-card col-md-4"
                 style="height: 200px;overflow-x: hidden; overflow-y: scroll;">
          <div slot="header" class="clearfix">
            <el-select v-model="columnsWithValue[index]" clearable
                       placeholder="Select column" @change="handleSelectChange">
              <el-option
                v-for="item in columns"
                v-if="item.visibility"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div v-for="(value, ind) in doc" :key="ind" class="text item">
            <div v-if="value[index]">
              {{ value[index] }}
            </div>
          </div>
        </el-card>
      </div>
      <br>
      <input v-if="form.building_id" type="submit"
             class="btn btn-primary" value="Send" @click="sendCsv">
    </div>
    <!--<div v-if="!isImported">
      <h1 style="color: #409EFF">We’re importing your tenants!</h1>
      <el-button type="primary" plain>Go to check it</el-button>
    </div>-->
  </div>
</template>

<script>
  import Papa from 'papaparse';
  import TenantsApi from '@/api/gateguard/tenants';
  import PropertyApi from '@/api/gateguard/property';

  export default {
    data() {
      return {
        loading: false,
        doc: [],
        columnsWithValue: [],
        buildings: [],
        //isImported: false,
        columns: [
          {label: 'UNIT', value: 0, visibility: true},
          {label: 'COMPANY NAME', value: 1, visibility: true},
          {label: 'FIRST NAME', value: 2, visibility: true},
          {label: 'LAST NAME', value: 3, visibility: true},
          {label: 'EMAIL', value: 4, visibility: true},
          {label: 'PHONE', value: 5, visibility: true},
        ],
        validateRules: {
          0: {required: false},
          1: {required: false},
          2: {required: true},
          3: {required: true},
          4: {required: true},
          5: {required: true},
        },
        form: {
          building_id: '',
          newTenants: [],
        },
      };
    },
    methods: {
      handleLoad(event) {
        let self = this;
        for (let key in this.columns) {
          if (this.columns[key]) {
            this.columns[key].visibility = true;
          }
        }
        this.columnsWithValue = [];
        Papa.parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete(results) {
            console.log('complete', results);
            self.doc = results.data;
          },
          error(errors) {
            console.log('error', errors);
          },
        });
      },
      handleSelectChange(e) {
        let self = this;
        for (let key in this.columns) {
          if (this.columns[key]) {
            this.columns[key].visibility = true;
          }
        }
        for (let key in this.columnsWithValue) {
          if (self.columns[this.columnsWithValue[key]]) {
            self.columns[this.columnsWithValue[key]].visibility = false;
          }
        }
      },
      sendCsv() {
        let self = this;
        window.location.href = `/dashboard/gateguard/tenants?sort=&page=3&per_page=25&q=&portfolio=All&device=${this.form.building_id}&act_status=all`;
        /*if (this._validate(this.columnsWithValue)) {
          this.loading = true;
          this.doc.forEach(function (value) {
            let keys = Object.keys(value);
            let arr = [];
            keys.forEach(function (item) {
              arr[self.columnsWithValue[item]] = value[item];
            });
            self.form.newTenants.push(arr);
          });
          const h = this.$createElement;
          TenantsApi.import(this.form).then((res) => {
            this.loading = false;
            this.$notify({
              title: 'Tenants added',
              message: h('i', {style: 'color: green'}, 'Success.'),
            });
            self.form.newTenants = [];

          }).catch((err) => {
            this.loading = false;
            self.form.newTenants = [];
          });
        }*/
      },
      getBuildings(search) {
        PropertyApi.search({q: search}).then((resp) => {
          this.buildings = resp.data;
        });
      },
      _validate(data) {
        let self = this;
        if (data instanceof Array && data.length - 1) {
          for (let rule in self.validateRules) {
            if (self.validateRules) {
              let item = self.validateRules[rule];
              if (item.required) {
                if (!self._inArray(rule, data)) {
                  this.$message({
                    dangerouslyUseHTMLString: true,
                    message: `<i>${self.columns[rule].label}.</i>` +
                    ' ' + '<strong> It\'s column required.</strong>',
                    showClose: true,
                    duration: 30000,
                    type: 'error',
                  });
                  return false;
                }
              }
            }
          }
          return true;
        }
      },
      _inArray(needle, haystack) {
        for (let key in haystack) {
          if (haystack[key] == needle) return true;
        }
        return false;
      },
    },
  };
</script>

