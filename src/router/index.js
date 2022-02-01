import Vue from 'vue'
import VueRouter from 'vue-router'
import Country from '../views/Country.vue'
import Cities from '../views/Cities.vue'
import City from '../views/City.vue'
import Measurements from '../views/measurements.vue'
import cityMeasurements from '../views/cityMeasurements.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Countries',
    component: Country
  },
  {
    path: '/cities',
    name: 'Cities',
    component: Cities
  },
  {
    path: '/city/:id',
    name: 'City',
    component: City
  },
  {
    path: '/measurements',
    name: 'measurements',
    component: Measurements
  },
  {
    path: '/measurements/:id',
    name: 'filteredMeasurements',
    component: cityMeasurements
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
