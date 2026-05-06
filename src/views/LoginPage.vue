<template>
  <div class="login-container">
    <div class="card p-4" style="width: 400px;">
      <h2 class="text-center mb-4">Planer nastave</h2>
      <p class="text-center text-muted">Prijavite se na svoj račun</p>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" placeholder="ucitelj@skola.hr">
      </div>
      <div class="form-group">
        <label>Lozinka</label>
        <input type="password" class="form-control" v-model="lozinka" placeholder="********">
      </div>
      <p v-if="greska" class="text-danger">{{ greska }}</p>
      <button class="btn btn-primary btn-block" @click="prijava">Prijava</button>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase"

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      lozinka: "",
      greska: ""
    }
  },
  methods: {
    async prijava() {
      try {
        this.greska = ""
        await auth.signInWithEmailAndPassword(this.email, this.lozinka)
        this.$router.push("/listici")
      } catch (error) {
        this.greska = "Pogrešan email ili lozinka."
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>