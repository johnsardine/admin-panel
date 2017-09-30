import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import About from '@/components/About';
import Settings from '@/components/Settings';
import Devices from '@/components/Devices';
import Device from '@/components/Device';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/dashboard',
      ignoreInMenu: true,
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
      component: Devices,
      children: [
        {
          path: 'device/:id',
          component: Device,
        },
      ],
    },
  ],
});
