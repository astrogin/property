<template>
  <el-form ref="form"
           :model="proxyValue"
           :rules="rules"
           class="pin-face-form-step__container"
           label-position="top">
    <h4 class="font-weight-bold">
      What should the resident and/or staff unlock method be?
    </h4>
    <el-form-item>
      <el-radio-group v-model="proxyValue.unlock_type"
                      class="radio-group--block">
        <el-radio label="pin_card_app_face">
          [PIN or CARD or APP] with FACE
        </el-radio>
        <el-radio label="face_pin"
                  class="el-radio-second-vertical">Face, then PIN</el-radio>
        <el-radio label="pin"
                  class="el-radio-second-vertical">PIN only
                  (Not recommended)</el-radio>
        <el-radio label="card"
                  class="el-radio-second-vertical">CARD only
                  (Not recommended)</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="pin-face-form-step__section">
      <hr>
      <h4 class="font-weight-bold">Options</h4>
      <el-form-item v-if="proxyValue.unlock_type === 'pin_card_app_face'">
        <div class="mb-5">
          <el-checkbox v-model="proxyValue.is_card_fob"
                       label="Enable Card or FOB" border />
        </div>
        <el-radio-group :disabled="!proxyValue.is_card_fob"
                        v-model="proxyValue.card_fob_usage"
                        class="radio-group--block">
          <el-radio label="all">
            Allow all tenants to use a card or fob (instead of a PIN)
          </el-radio>
          <el-radio label="limit">
            Give only tenants who request one a card or fob
          </el-radio>
          <el-radio label="select">
            I will select which tenants get & can use a card or fob
          </el-radio>
        </el-radio-group>
        <div class="mb-5">
          <el-checkbox v-model="proxyValue.is_app_unlock"
                       label="Enable App Unlock" border />
        </div>
        <el-radio-group :disabled="!proxyValue.is_app_unlock"
                        v-model="proxyValue.app_unlock_option"
                        class="radio-group--block">
          <el-radio label="all">
            Enable app unlock for all tenants (recommended)
          </el-radio>
          <el-radio label="select">I will enable tenants one-by-one</el-radio>
        </el-radio-group>
        <div class="note">
          <span class="font-weight-bold">You should know:</span>
          <span>&nbsp;Tapping a card cards/fobs can be faster&nbsp;
          than typing a 4-digit pin,</span>
        </div>
        <div class="note">
          <span class="font-weight-bold">But</span>
          <span>&nbsp;they can be lost, stolen,&nbsp;
          and copied by nefarious 3rd parties.</span>
        </div>
      </el-form-item>
      <el-form-item v-if="proxyValue.unlock_type === 'face_pin'"
                    prop="pin_entry_delay">
        <el-radio-group v-model="proxyValue.face_pin_option"
                        class="radio-group--block">
          <el-radio label="always">require PIN always (recommended)</el-radio>
          <el-radio label="weak">require PIN required only
          on weak or no recognition
          </el-radio>
          <el-radio label="no_recognition">
            require PIN only on no recognition
          </el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="proxyValue.pin_entry"
                           class="el-checkbox-group--flex">
          <el-checkbox label="delay">
            Delay enabling PIN only entry by
            <el-input-number v-model="proxyValue.pin_entry_delay"
                             :controls="false"
                             :step="1"
                             :disabled="!proxyValue.pin_entry.includes('delay')"
                             class="pin-entry-delay__input" />
            &nbsp;seconds (maximum 7 recommended)</el-checkbox>
          <el-checkbox label="ask">
            Ask “Who are you?” if they enter by PIN instead
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="proxyValue.unlock_type === 'card'">
        <el-checkbox-group v-model="proxyValue.card_options"
                           class="el-checkbox-group--flex">
          <el-checkbox label="active_enter">
            If they forget the card, they can enter their PIN
          </el-checkbox>
          <el-checkbox label="email_admin">
            Email admins when they use a PIN
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <div v-if="proxyValue.unlock_type === 'pin_card_app_face'
         || proxyValue.unlock_type === 'face_pin'"
         class="pin-face-form-step__section">
      <hr>
      <h4 class="font-weight-bold">Face recognition options</h4>
      <el-form-item>
        <div>What if the face doesn't match?</div>
        <el-checkbox v-model="proxyValue.face_ask"
                     class="el-checkbox--flex">
          Ask "Who are you?" (recommended) (screenshot)
        </el-checkbox>
        <div>If they say they are a Roommate or Guest:</div>
        <p class="description-text">
          <span class="star">*</span>
          Tenants share PINs frequently and the system catches most.
        </p>
        <el-checkbox-group v-model="proxyValue.guest"
                           class="el-checkbox-group--flex">
          <el-checkbox label="reject">Reject them (optional)</el-checkbox>
          <el-checkbox label="reset">
            Reset PIN (if we have tenant's mobile or email)
          </el-checkbox>
          <el-checkbox label="email">
            Email the building managers an alert
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <div v-if="proxyValue.unlock_type === 'pin_card_app_face'
         || proxyValue.unlock_type === 'card'"
         class="pin-face-form-step__section">
      <hr>
      <h4 class="font-weight-bold">Card/FOB options</h4>
      <el-form-item v-if="proxyValue.is_card_fob">
        <div>Choose your style</div>
        <el-radio-group v-model="proxyValue.card_fob_style"
                        class="radio-group--block">
          <el-radio label="fob">Fob ( $6.99/fob)</el-radio>
          <el-radio label="card">Card ($4.99/card)</el-radio>
        </el-radio-group>
        <p class="description-text">
          <span class="star">*</span>
          (Cards may have ads such as Uber signup codes)
        </p>
        <div class="note mb-5">
          Do you want residents to be able order a new card from the system?
        </div>
        <el-checkbox v-model="proxyValue.card_fob_orderable"
                     class="el-checkbox--flex">
          Enable residents/staff to press
          &nbsp;“I lost my card/fob” and order a new one
        </el-checkbox>
        <p class="description-text">
          <span class="star">*</span>&nbsp;
          (We will instantly disable their old card and PIN)
        </p>
        <div class="note mb-5">Do you want to generate Fob/Card or us?</div>
        <el-radio-group v-model="proxyValue.card_fob_self_generate"
                        class="radio-group--block">
          <el-radio :label="false">
            Have us fulfill the order&nbsp;
            ($4.99 / fob plus tracked & signature-required S&H).
          </el-radio>
          <el-radio :label="true">
            You fulfill the order&nbsp;
            (You must order our card writer and a minimum of 50 cards/fobs)
          </el-radio>
        </el-radio-group>
      </el-form-item>
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
          pin_entry_delay: {
            required: true,
            min: 0,
            message: 'Please input valid number',
            trigger: 'change',
          },
        },
      };
    },
  };
</script>
