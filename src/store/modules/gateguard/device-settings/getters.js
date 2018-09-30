export default {
  getBuildingSettings: (state) => {
    return state.currentBuilding.settings.building;
  },
  getPinfaceSettings: (state) => {
    return state.currentBuilding.settings.pinface;
  },
  getHomeScreenSettings: (state) => {
    return state.currentBuilding.settings.homeScreen;
  },
  getVisitorsSettings: (state) => {
    return state.currentBuilding.settings.visitors;
  },
  getSecuritySettings: (state) => {
    return state.currentBuilding.settings.security;
  },
  getCameraSettings: (state) => {
    return state.currentBuilding.settings.camera;
  },
  getPlanSettings: (state) => {
    return state.currentBuilding.settings.plan;
  },
  getDeliverySettings: (state) => {
    return state.currentBuilding.settings.delivery;
  },
  getInternetRouterSettings: (state) => {
    return state.currentBuilding.settings.internetRouter;
  },
  getInstallationDaySettings: (state) => {
    return state.currentBuilding.settings.installationDay;
  },
  getNotificationsSettings: (state) => {
    return state.currentBuilding.settings.notifications;
  },
  getPendingStatus: (state) => {
    return state.pending;
  },
};
