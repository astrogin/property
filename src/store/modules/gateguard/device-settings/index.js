import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    pending: false,
    currentBuilding: {
      settings: {
        id: null,
        building: {
          building_address: '',
          building_name: '',
          ownership_llc: '',
          is_multiple: false,
          property_name: '',
          portfolio: '',
          management_company_type: 'company',
          management_company_id: [],
          property_managers: [],
          apply_manager_to_all: false,
          types_of_units: {
            residential: [],
            office: 'one',
            industrial: [],
            educational: [],
            athletic: [],
            retail: [],
          },
        },
        pinface: {
          unlock_type: 'pin_card_app_face',
          is_card_fob: false,
          card_fob_usage: 'all',
          is_app_unlock: false,
          app_unlock_option: 'all',
          face_pin_option: 'always',
          pin_entry: [],
          pin_entry_delay: 0,
          card_options: [],
          face_ask: false,
          guest: [],
          card_fob_style: 'fob',
          card_fob_orderable: false,
          card_fob_self_generate: false,
        },
        homeScreen: {
          screen_person: [],
          office: false,
          office_reception: 'person',
          persons: [],
          office_reception_options: [],
          delivery: false,
          delivery_screen_buttons: [],
          delivery_screen_options: [],
          screen_buttons: [],
          screen_options: [],
          rotate_video_call: false,
        },
        visitors: {
          option: 'all',
          maximum_visitor_codes: 'unlimited',
        },
        security: {
          selected_delay_option: {},
          show_selfie: false,
        },
        camera: {
          camera_option: 'own',
          access: false,
          login_id: '',
          login_pass: '',
        },
        plan: {
          plan: 'gold',
        },
        delivery: {
          services: [],
          all_services: false,
        },
        internetRouter: {
          use_device: [],
          internet_provider: [],
          internet_provider_none: false,
          internet_live: false,
        },
        installationDay: {
          access_managers: [],
        },
        notifications: {
          land_line: false,
          land_line_notifications: null,
          services: [],
          fourG: false,
          fourGNotifications: null,
          online: false,
        },
      },
    },
  },
  getters,
  actions,
  mutations,
};
