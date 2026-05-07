import Vue from "vue"
import VueRouter from "vue-router"
import LoginPage from "../views/LoginPage.vue"
import ProfilPage from "../views/ProfilPage.vue"

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
    component: ProfilPage
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router