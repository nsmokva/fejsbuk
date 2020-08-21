import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"
import Timeline from "../components/Timeline.vue"
import About from "../components/About.vue"
import Friends from "../components/Friends.vue"
import AllInfo from "../components/about/AllInfo.vue"
import BasicInfo from "../components/about/BasicInfo.vue"
import Contact from "../components/about/Contact.vue"
import Job from "../components/about/Job.vue"


Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/:id/home',
      name: 'home',
      component: Home
    },
    {
      path: '/:id/profile',
      name: 'profile',
      component: Profile,
      children: [
        {
          path: '',
          name: 'timeline',
          component: Timeline
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          children: [
            {
              path: '',
              name: 'allinfo',
              component: AllInfo
            },
            {
              path: 'basicinfo',
              name: 'basicinfo',
              component: BasicInfo
            },
            {
              path: 'contact',
              name: 'contact',
              component: Contact
            },
            {
              path: 'job',
              name: 'job',
              component: Job
            }
          ]
        },
        {
          path: 'friends',
          name: 'friends',
          component: Friends
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
