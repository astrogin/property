import {DEVICE_SETTINGS} from '@/constants/mutation-types';
import Building from '@/api/gateguard/building';

export default {
  setCurrentBuildingSetting({commit, state}, payload) {
    commit(DEVICE_SETTINGS.SET_SETTINGS, payload);
    return Building.setSettings(state.currentBuilding.settings);
  },
  getCurrentBuildingSettings({commit}, payload) {
    commit(
      DEVICE_SETTINGS.SET_PENDING,
      true
    );
    Building.getSettings(payload)
      .then((res) => {
        if (res.data.building_settings) {
          commit(
            DEVICE_SETTINGS.SET_SETTINGS,
            JSON.parse(res.data.building_settings)
          );
        }
        commit(
          DEVICE_SETTINGS.SET_PENDING,
          false
        );
      })
      .catch((err) => {
        commit(
          DEVICE_SETTINGS.SET_PENDING,
          false
        );
      });
  },
};
