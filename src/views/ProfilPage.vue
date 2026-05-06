<template>
  <div class="container mt-4">
    <h2>Moj profil</h2>
    <div class="card p-4 mt-3">
      <div class="d-flex align-items-center mb-4">
        <div class="avatar">{{ inicijal }}</div>
        <div class="ml-3">
          <h4 class="mb-0">{{ ime }}</h4>
          <p class="text-muted mb-0">{{ skola }}</p>
        </div>
      </div>
      <div class="mb-2"><strong>Ime:</strong> {{ ime }}</div>
      <div class="mb-2"><strong>Email:</strong> {{ email }}</div>
      <div class="mb-4"><strong>Škola:</strong> {{ skola }}</div>
      <hr>
      <h5>Promjena lozinke</h5>
      <div class="form-group">
        <label>Nova lozinka</label>
        <input type="password" class="form-control" v-model="novaLozinka" placeholder="********" style="max-width: 300px;">
      </div>
      <p v-if="poruka" class="text-success">{{ poruka }}</p>
      <p v-if="greska" class="text-danger">{{ greska }}</p>
      <button class="btn btn-primary" @click="promijeniLozinku">Promijeni</button>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase"

export default {
  name: "ProfilPage",
  data() {
    return {
      ime: "",
      email: "",
      skola: "",
      novaLozinka: "",
      poruka: "",
      greska: ""
    }
  },
  computed: {
    inicijal() {
      return this.ime ? this.ime.charAt(0).toUpperCase() : "?"
    }
  },
  async created() {
    const korisnik = auth.currentUser
    if (korisnik) {
      this.email = korisnik.email
      const doc = await db.collection("users").doc(korisnik.uid).get()
      if (doc.exists) {
        this.ime = doc.data().ime
        this.skola = doc.data().skola
      }
    }
  },
  methods: {
    async promijeniLozinku() {
      try {
        this.greska = ""
        this.poruka = ""
        const korisnik = auth.currentUser
        await korisnik.updatePassword(this.novaLozinka)
        this.poruka = "Lozinka uspješno promijenjena!"
        this.novaLozinka = ""
      } catch (error) {
        this.greska = "Greška pri promjeni lozinke. Pokušajte se ponovno prijaviti."
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4A90D9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}
</style>