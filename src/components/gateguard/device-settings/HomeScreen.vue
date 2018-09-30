<template>
  <el-form ref="form"
           :model="proxyValue"
           class="home-screen__container"
           label-position="top">
    <el-form-item>
      <el-radio-group v-model="proxyValue.rotate_video_call">
        <h4 class="title font-weight-bold">Rotate video call:</h4>
        <el-radio :label="false">False(Old devices)</el-radio>
        <el-radio :label="true">True(New devices. Rotate the picture 90 degrees)</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="proxyValue.screen_person"
                         class="el-checkbox-group--flex">
        <el-checkbox label="resident"
                     class="el-checkbox--flex">Resident</el-checkbox>
        <el-checkbox label="staff"
                     class="el-checkbox--flex">Staff</el-checkbox>
        <el-checkbox label="visitor"
                     class="el-checkbox--flex">Visitor</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <div class="sub-section__container">
      <h4 class="title font-weight-bold">Buttons on Visitor Screen</h4>
      <el-checkbox v-model="proxyValue.office">Office / Reception</el-checkbox>
      <h4 class="title font-weight-bold">Office Reception Options</h4>
      <h4>Call:</h4>
      <el-form-item>
        <el-radio-group v-model="proxyValue.office_reception" label="Call:"
                        class="radio-group--block">
          <el-radio label="person">Person</el-radio>
          <el-radio label="multi_people">Multi people (creates a group)
          </el-radio>
          <el-radio label="department">Department</el-radio>
          <el-radio label="unit">Unit</el-radio>
        </el-radio-group>
      </el-form-item>
      <h4 class="title">Select Person</h4>
      <el-form-item v-for="(input, index) in proxyValue.persons"
                    :key="index"
                    class="person-input__container">
        <el-row>
          <el-col :span="11" :xs="20">
            <el-input v-model="input.name"/>
          </el-col>
          <el-col :span="11" :xs="4">
            <span class="fa fa-remove ml-2" @click="removePerson(index)"/>
          </el-col>
        </el-row>
      </el-form-item>
      <a class="cursor-pointer d-block mb-5"
         @click="addPerson">+ Add a person</a>
      <el-form-item>
        <el-checkbox-group v-model="proxyValue.office_reception_options"
                           class="el-checkbox-group--flex">
          <el-checkbox label="delivery">Delivery</el-checkbox>
          <el-checkbox label="unit">Search by Unit</el-checkbox>
          <el-checkbox label="department">Search by Department</el-checkbox>
          <el-checkbox label="name">Search by Name</el-checkbox>
          <el-checkbox label="all">Search (All : Unit, Name, Department)
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </div>
    <hr>
    <el-checkbox v-model="proxyValue.delivery">Delivery</el-checkbox>
    <div v-if="proxyValue.delivery" class="sub-section__container">
      <h4 class="title font-weight-bold">Buttons on Delivery Screen</h4>
      <el-checkbox-group v-model="proxyValue.delivery_screen_buttons"
                         class="el-checkbox-group--flex">
        <el-checkbox label="main">Main Office / Reception</el-checkbox>
        <el-checkbox label="mail">Mail / Package Room</el-checkbox>
        <el-checkbox label="unit">Search by Unit</el-checkbox>
        <el-checkbox label="department">Search by Department</el-checkbox>
        <el-checkbox label="name">Search by Name</el-checkbox>
        <el-checkbox label="all">Search (All : Unit, Name, Department)
        </el-checkbox>
      </el-checkbox-group>
      <h4 class="title font-weight-bold">Delivery Screen Options</h4>
      <el-checkbox-group v-model="proxyValue.delivery_screen_options"
                         class="el-checkbox-group--flex">
        <el-checkbox label="delivery_service">
          Have them select their delivery service (UPS, FedEx, USPS, DHL, etc.)
        </el-checkbox>
        <el-checkbox label="require_face">Require a face</el-checkbox>
        <el-checkbox label="photograph">
          Have them photograph the item
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <hr>
    <el-checkbox-group v-model="proxyValue.screen_buttons"
                       class="el-checkbox-group--flex">
      <el-checkbox label="office">Office / Reception</el-checkbox>
      <el-checkbox label="vacancies">Vacancies</el-checkbox>
      <el-checkbox label="leasing">Leasing Office</el-checkbox>
      <el-checkbox label="customButtons">
        Custom Button (You can define text and translation)
      </el-checkbox>
    </el-checkbox-group>
    <div class="sub-section__container">
      <h4 class="title font-weight-bold">Screen Options</h4>
      <el-checkbox-group v-model="proxyValue.screen_options"
                         class="el-checkbox-group--flex">
        <el-checkbox label="address">Display building address</el-checkbox>
        <el-checkbox label="video">
          Show selfie video on motion detection (deters vandalism)
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </el-form>
</template>

<script>
  import FormComponentModel from '@/mixins/form-component-model';
  export default {
    mixins: [FormComponentModel],
    methods: {
      addPerson() {
        this.proxyValue.persons.push({
          name: '',
        });
      },
      removePerson(index) {
        this.proxyValue.persons.splice(index, 1);
      },
    },
  };
</script>
