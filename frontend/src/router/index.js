import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LoginView,
      props: true
    },
    {
      path: '/chat',
      name: 'Chat',
      component: HomeView,
      props: true
    }
  ]
})

export default router
