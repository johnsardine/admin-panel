import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import About from '@/components/About';
import Settings from '@/components/Settings';
import DevicesMap from '@/components/DevicesMap';
import DeviceDetail from '@/components/DeviceDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/dashboard',
      meta: {
        ignoreInMenu: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/devices',
      name: 'Devices',
      component: DevicesMap,
      children: [
        {
          path: '/devices/:id/',
          name: 'DeviceDetail',
          component: DeviceDetail,
          props: true,
        },
      ],
    },
  ],
});
