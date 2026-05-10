import Vue from "vue"
import VueRouter from "vue-router"
import LoginPage from "../views/LoginPage.vue"
import ProfilPage from "../views/ProfilPage.vue"
import { auth } from "../firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/profil",
    name: "Profil",
    component: ProfilPage,
    meta: { zahtijevaPrijavu: true }
  },
  {
    path: "/listici",
    name: "Listici",
    component: ListiciPage,
    meta: { zahtijevaPrijavu: true }
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  const korisnik = auth.currentUser
  if (to.meta.zahtijevaPrijavu && !korisnik) {
    next("/")
  } else {
    next()
  }
})

export default router