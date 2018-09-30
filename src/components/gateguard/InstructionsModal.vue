/* eslint-disable */
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>
    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%">
      <div slot="header" class="modal-header">
        <h4 class="modal-title">
          Send instructions to tenant
        </h4>
      </div>
      <div slot="body" class="modal-body">
        <div v-if="!loading && !result">
          <a :href="'/dashboard/gateguard/tenant/pdf/' + userData.id + '/' + userData.device_id"
             class="btn btn-default">
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            Dowload PDF
          </a>
          <hr />
          <div class="checkbox">
            <label>
              <input type="checkbox" checked="true" v-model="needEmail">
              <h4>Send Email</h4>
            </label>
          </div>
          <div v-if="needEmail">
            <h5>Addresses:</h5>
            <div class="checkbox" v-for="email in form.available_emails">
              <label>
                <input type="checkbox"
                       checked="true"
                       v-model="form.selected_emails"
                       :value="email">
                {{ email }}
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="form.customAddress">
                <input type="email"
                       name="custom_email"
                       v-model="form.custom_email"
                       class="form-control"
                       v-show="form.customAddress">
                <span v-show="!form.customAddress">Another address</span>
              </label>
            </div>
            <button class="btn btn-default btn-sm"
                    v-if="!emailPreview"
                    @click="emailPreview = true">
              Show preview
            </button>
            <button class="btn btn-default btn-sm"
                    v-if="emailPreview"
                    @click="emailPreview = false"
                    style="margin-bottom: 10px">
              Hide preview
            </button>
            <pre v-show="emailPreview">
Hi {{ userData.first_name }} {{ userData.last_name }},
To use the intercom at {{ userData.bbl }}:

  1.Download the app (iOS or Android) : https://teman.com/tenant
  2.Enter ID: {{ userData.login_id }} and PIN: {{ userPin }}
  3.Go to the Device, press "RESIDENT" > "NEW RESIDENT" and follow the instructions to enroll.

Questions? support.team@teman.com
Let us know how we can be helpful.
</pre>
            <hr />
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" checked="true" v-model="needSms">
              <h4>Send SMS</h4>
            </label>
          </div>
          <div v-if="needSms">
            <div class="checkbox" v-for="number in form.available_phone_numbers">
              <label>
                <input type="checkbox"
                       checked="true"
                       v-model="form.selected_phones"
                       :value="number">
                {{ number }}
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="form.customNumber">
                <input type="text"
                       name="custom_phone"
                       v-model="form.custom_phone_number"
                       class="form-control"
                       v-show="form.customNumber"
                       v-masked-input format="+19999999999">
                <span v-show="!form.customNumber">Another number</span>
              </label>
            </div>
            <button class="btn btn-default btn-sm"
                    v-if="!smsPreview"
                    @click="smsPreview = true">
              Show preview
            </button>
            <button class="btn btn-default btn-sm"
                    v-if="smsPreview"
                    @click="smsPreview = false">
              Hide preview
            </button>
            <div v-show="smsPreview">
              <h6>SMS #1</h6>
              <pre>{{ userData.first_name }}, You must download app to use {{ userData.bbl
                }} intercom: https://teman.com/tenant</pre>
              <h6>SMS #2</h6>
              <pre>Your intercom ID: {{ userData.login_id }}; PIN: {{ userPin }}</pre>
              <h6 v-if="!userData.enrolled">SMS #3</h6>
              <pre v-if="!userData.enrolled">You must go to the intercom panel, press RESIDENT > NEW RESIDENT > enter ID & PIN to enroll.</pre>
            </div>
          </div>
        </div>
        <div v-if="!loading && result">
          <div v-if="result.emails_sent">
            <h4>
              Instructions sucessfully sent to the following emails:
            </h4>
            <p v-for="email in result.emails_sent">
              {{ email }}
            </p>
          </div>
          <div v-if="result.emails_failed">
            <h4>Problems occured with following emails:</h4>
            <p v-for="email in result.emails_failed">
              {{ email }}
            </p>
          </div>
          <hr />
          <div v-if="result.sms">
            <h4>SMS</h4>
            <div v-for="(phone, results) in result.sms">
              <h6>{{ phone }}</h6>
              <table class="table table-stripped">
                <tr v-for="(type, message) in results">
                  <td>
                    <span v-if="type == 'download_app'">Link for app download</span>
                    <span v-if="type == 'credentials'">ID and PIN</span>
                    <span v-if="type == 'enroll_instruction'">Enroll instruction</span>
                  </td>
                  <td>
                    <span v-if="message.success">{{ message.msg }}</span>
                    <span v-else>{{ message.error }}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="loading" class="overlay text-center">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div>
      <div slot="footer" class="modal-footer">
        <button type="button"
                class="btn btn-default"
                @click="show = false">
          Close
        </button>
        <button v-if="!submiting && !result"
                type="button"
                class="btn btn-success"
                :disabled="false"
                @click="send">
          Send
        </button>
        <button v-if="submiting && !result"
                disabled="disabled"
                type="button"
                class="btn btn-success">
          Sending...
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import TenantApi from '@/api/gateguard/tenants';
  export default {
    props: {
      user_id: {
        required:true
      },
      device_id: {
        required:true
      },
    },
    data() {
      return {
        dialogVisible: false,
        loading: true,
        result: false,
        userData: false,
        show: false,
        submiting: false,
        userPin: 'loading...',
        needSms: true,
        needEmail: true,
        emailPreview: false,
        smsPreview: false,
        form: {
          available_emails: [],
          custom_email: null,
          customAddress: false,
          available_phone_numbers: [],
          custom_phone_number: null,
          customNumber: false,
          selected_emails: [],
          selected_phones: []
        }
      }
    },
    created() {
      var ctx = this;

      /*this.$bus.$on("tenant-instructions-modal-set-state", function (userData) {
       ctx.reset();
       ctx.userData = userData;
       ctx.getUserPin();
       ctx.getUserContacts().then((success) => {
       ctx.loading = false;
       });
       ctx.show = true;
       });*/
      TenantApi.getTenant({id: this.user_id, device_id: this.device_id}).then((res) => {
        ctx.userData = res.data;
        ctx.getUserPin();
        ctx.getUserContacts().then((success) => {
          ctx.loading = false;
        });
        ctx.show = true;
      })
    },
    methods: {
      reset() {
        this.loading = true;
        this.result = false;
        this.userData = false;
        this.show = false;
        this.submiting = false;
        this.userPin = 'loading...';
        this.needSms = true;
        this.needEmail = true;
        this.emailPreview = false;
        this.smsPreview = false;
        this.form = {
          available_emails: [],
          custom_email: null,
          customAddress: false,
          available_phone_numbers: [],
          custom_phone_number: null,
          customNumber: false,
          selected_emails: [],
          selected_phones: []
        }
      },
      getUserPin() {
        TenantApi.getUserPin({id: this.userData.id, device_id: this.userData.device_id}).then(resp => {
          this.userPin = resp.data.value;
        })
      },
      getUserContacts() {
        var ctx = this;
        return new Promise(function (resolve, reject) {
          ctx.$http.get('/dashboard/gateguard/tenant/' + ctx.userData.id + '/contact-info').then(
            (response) => {
              ctx.form.available_emails = response.data.emails;
              ctx.form.available_phone_numbers = response.data.phones;
              resolve();
            },
            (fresponse) => {
              reject();
            }
          );
        });
      },
      send() {
        this.submiting = true;
        this.$http.post('/dashboard/gateguard/tenant/instructions/' + this.userData.id + '/' + this.userData.device_id, this.postContacts).then(
          (response) => {
            this.result = response.data;
          });
      }
    },
    computed: {
      emailsToSend: function () {
        return this.form.customAddress ?
          this.form.selected_emails.concat([this.form.custom_email]) :
          this.form.selected_emails;
      },
      phonesToSend: function () {
        return this.form.customNumber ?
          this.form.selected_phones.concat([this.form.custom_phone_number]) :
          this.form.selected_phones;
      },
      postContacts: function () {
        var data = {};
        if (this.needSms) {
          data.phones = this.phonesToSend;
        }
        if (this.needEmail) {
          data.emails = this.emailsToSend;
        }

        return data;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox {
    h4 {
      margin-top: 0px;
    }
  }

  input[type="checkbox"] {
    margin-top: 1px;
  }

  .overlay {
    min-height: 300px;
    padding-top: 25%;
    i {
      font-size: 30px;
    }
  }
</style>