<template>
  <div class="organizations_view_container">
    <div class="organizations_view_header_container">
      <h2>Organizations</h2>
      <add-organization-modal @org-created="pushTable"></add-organization-modal>
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
      border
      class="element-table-custom"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="parent_name"
        label="Parent organization">
      </el-table-column>
      <el-table-column
        prop="staff_number"
        label="Staff number">
      </el-table-column>
      <el-table-column
        prop="visitors_number"
        label="Visitors number">
      </el-table-column>
      <el-table-column
        label="Add Sub-organization">
        <template slot-scope="scope">
          <add-organization-modal :parent-org="scope.row" @org-created="pushTable">
            <button class="btn btn-default btn-sm" slot="button">+ Add Sub-organization</button>
          </add-organization-modal>
        </template>
      </el-table-column>
    </el-table>
    <div class="organizations_pagination_container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagination.per_page"
        layout="total, prev, pager, next"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import OrgApi from '@/api/gateguard/organizations';
  import AddOrganizationModal from
    '@/components/gateguard/organizations/AddOrganizationModal';
  export default {
    components: {
      AddOrganizationModal,
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
      OrgApi.get({page: this.currentPage}).then((res) => {
        this.table = res.data.data;
        this.pagination = res.data.meta;
      });
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loading = true;
        OrgApi.get({page: this.currentPage}).then((res) => {
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
          params.q = this.search;
        }
        this.loading = true;
        OrgApi.get(params).then((res) => {
          this.table = res.data.data;
          this.pagination = res.data.meta;
          this.loading = false;
        });
      },
      pushTable(newOrg) {
        this.table.push(newOrg);
      },
    },
  };
</script>
