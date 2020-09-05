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
import NotFound from "../components/NotFound.vue"

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
      component: Home,
      meta: {requiresAuth: true},
    },
    {
      path: '/:id/profile',
      name: 'profile',
      component: Profile,
      meta: {requiresAuth: true},
      props: true,
      children: [
        {
          path: 'timeline',
          name: 'timeline',
          component: Timeline,
          props: true
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          props: true,
          children: [
            {
              path: 'allinfo',
              name: 'allinfo',
              component: AllInfo,
              props:true
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
          component: Friends,
          props: true
        },
      ]
    },
    {
      path: '/404',
      alias:'/*',
      name: 'notFound',
      component: NotFound
    } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//protecting home and profile so that you can not visit them if not logged in
router.beforeEach((to, from, next) => {
  var id = sessionStorage.getItem('id')
  if(to.name === 'login'){
    next()
  }else{
    if (id === undefined || id === null) {
      if(to.matched.some(record => record.meta.requiresAuth)){
        next({name:"login",  query: {redirect: to.fullPath}})
      }else{
        next({name: "login"})
      }
    }
    else {
      next()
    }
  } 
})

export default router
