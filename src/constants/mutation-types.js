import * as ConstHelper from '@/utils/helpers/const-helper';

export const GATE_GUARD = {
};

export const DEVICE_SETTINGS = {
  ...ConstHelper.mutationTypesGenerator(
    ['building', 'pinface', 'home_screen', 'visitors', 'security',
      'camera', 'plan', 'delivery', 'internet_router', 'installation_day',
      'notifications', 'settings', 'pending'],
    'set'),
};

export const ALERT_MESSAGES = {
  ...ConstHelper.mutationTypesGenerator('notifications', 'get', true),
  ...ConstHelper.mutationTypesGenerator(
    ['notifications', 'limit', 'page'], 'set'
  ),
};

export const NEWS = {
  ...ConstHelper.mutationTypesGenerator('news', 'get', true),
  ...ConstHelper.mutationTypesGenerator('news', 'set'),
};

export const USER = {
  ...ConstHelper.mutationTypesGenerator(['data'], 'set'),
};

export const COMPANY = {
  ...ConstHelper.mutationTypesGenerator(['data'], 'set'),
};
