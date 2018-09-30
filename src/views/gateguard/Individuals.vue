<template>
  <div class="organizations_view_container">
    <div class="organizations_view_header_container">
      <h2>Individuals</h2>
      <individual-modal @ind-created="pushTable"></individual-modal>
    </div>
    <div class="col-md-3 search_container" style="float: right; padding-right: 0">
      <el-input placeholder="Search for ..." v-model="search" class="input" size="mini"
                @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" size="mini" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <el-table
      v-loading="loading"
      :data="table"
      class="element-table-custom"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="org_name"
        label="Organization"
        width="100">
      </el-table-column>
      <el-table-column
        prop="parent_org_name"
        label="Parent organization"
        width="100">
      </el-table-column>
      <el-table-column
        prop="first_name"
        label="First name">
      </el-table-column>
      <el-table-column
        prop="last_name"
        label="Last name">
      </el-table-column>
      <el-table-column
        prop="last_buzz"
        label="Last buzz">
      </el-table-column>
      <el-table-column
        prop="last_entry"
        label="Last entry">
      </el-table-column>
      <el-table-column
        prop="visitors"
        label="TTL guests">
      </el-table-column>
      <el-table-column
        prop="visitors_30"
        label="TTL guests 30 days">
      </el-table-column>
      <el-table-column
        label="Buildings">
        <template slot-scope="props">
          <ul id="example-2">
            <li v-for="(item, index) in props.row.property">
              {{ item.name }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_delivery"
        label="Last delivery">
      </el-table-column>
      <el-table-column
        prop="last_delivery_30"
        label="TTL delivery 30 days">
      </el-table-column>
      <el-table-column
        prop="ttl_work_orders"
        label="TTL work orders">
      </el-table-column>
      <el-table-column
        prop="ttl_work_orders_open"
        label="TTL work orders open">
      </el-table-column>
      <el-table-column
        label="Edit"
        width="46">
        <template slot-scope="scope">
          <a :href='"/dashboard/tenants/edit/" + scope.row.id' target="_blank">
            <button class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="View logs"
        width="46">
        <template slot-scope="scope" style="text-align: center">
          <a :href="'/dashboard/tenants/log?user_id=' + scope.row.id" target="_blank">
            <button class="btn btn-default btn-sm"><i class="fa fa-file-text-o"></i></button>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <div class="organizations_pagination_container">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pagination.per_page"
        :total="pagination.total"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import IndApi from '@/api/gateguard/individuals';
  import IndividualModal from
    '@/components/gateguard/individuals/AddIndividualModal';

  export default {
    components: {
      IndividualModal,
    },
    data() {
      return {
        table: [],
        currentPage: 1,
        pagination: {},
        loading: false,
        search: '',
      };
    },
    created() {
      IndApi.get({page: this.currentPage}).then((res) => {
        this.table = res.data.data;
        this.pagination = res.data.meta;
      });
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loading = true;
        IndApi.get({page: this.currentPage}).then((res) => {
          this.table = res.data.data;
          this.pagination = res.data.meta;
          this.loading = false;
        });
      },
      handleSearch() {
        let params = {
          page: this.currentPage,
        };
        if (this.search.length) {
          params.search = this.search;
        }
        this.loading = true;
        IndApi.get(params).then((res) => {
          this.table = res.data.data;
          this.pagination = res.data.meta;
          this.loading = false;
        });
      },
      pushTable(newInd) {
        console.log('emmit');
        console.log(newInd);
        this.table.push(newInd);
      },
    },
  };
</script>
