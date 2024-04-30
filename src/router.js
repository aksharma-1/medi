// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
import Booking from './components/Booking.vue';
import Admin from './components/Admin.vue';
import RegisterDoctor from './components/RegisterDoctor.vue'
import Doctor from './components/Doctor.vue';
import AppointmentList from './components/AppoinmentList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: Doctor,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children:[
      { path: '', name: 'Dashboard', component: Dashboard},
      { path: 'booking', name: 'Booking', component: Booking},
      { path: 'register-doctor', name: 'RegisterDoctor', component: RegisterDoctor},
      { path: 'appointment-list', name: 'AppointmentList', component: AppointmentList},
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
