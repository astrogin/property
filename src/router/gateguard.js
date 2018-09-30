import DeviceSettings from '@/views/gateguard/DeviceSettings';
import TenantsImport from '@/views/gateguard/TenantsImport';
import ImportTenants from '@/views/gateguard/guides/ImportTenants';
import Organizations from '@/views/gateguard/Organizations';
import Individuals from '@/views/gateguard/Individuals';

export default [
  {
    path: '/dashboard/gateguard/buildings/:id/settings',
    name: 'buildings-settings',
    component: DeviceSettings,
    props: true,
  },
  {
    path: '/dashboard/gateguard/tenants/import',
    name: 'import',
    component: TenantsImport,
  },
  {
    path: '/dashboard/gateguard/guides/import/tenants',
    name: 'guides.import.tenants',
    component: ImportTenants,
  },
  {
    path: '/dashboard/gateguard/organization',
    component: Organizations,
  },
  {
    path: '/dashboard/gateguard/individual',
    component: Individuals,
  },
];
