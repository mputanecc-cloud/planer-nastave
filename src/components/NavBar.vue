<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark" v-if="prijavljen">
    <span class="navbar-brand">Planer nastave</span>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/listici">Listići</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/favoriti">Favoriti</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profil">Profil</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="odjava">Odjava</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "../firebase"

export default {
  name: "NavBar",
  data() {
    return {
      prijavljen: false
    }
  },
  created() {
    auth.onAuthStateChanged(korisnik => {
      this.prijavljen = !!korisnik
    })
  },
  methods: {
    async odjava() {
      await auth.signOut()
      this.$router.push("/")
    }
  }
}
</script>