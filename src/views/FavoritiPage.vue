<template>
  <div class="container mt-4">
    <h2>Favoriti i statistika</h2>
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="card p-3 text-center">
          <h3 class="text-primary">{{ ukupnoListica }}</h3>
          <p class="text-muted mb-0">Ukupno listića</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 text-center">
          <h3 style="color: #FBBF24;">{{ brojFavorita }}</h3>
          <p class="text-muted mb-0">Favorita</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 text-center">
          <h3 style="color: #0F766E;">{{ brojPredmeta }}</h3>
          <p class="text-muted mb-0">Predmeta</p>
        </div>
      </div>
    </div>
    <h4 class="mt-4">Omiljeni listići</h4>
    <div class="card p-3 mb-2" v-for="listic in favoriti" :key="listic.id">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <strong>{{ listic.predmet }}</strong>
          <br>
          <small class="text-muted">{{ listic.napomena }}</small>
        </div>
        <button class="btn btn-warning btn-sm" @click="makniIzFavorita(listic)">Makni iz favorita</button>
      </div>
    </div>
    <p v-if="favoriti.length === 0" class="text-muted mt-2">Nema favorita.</p>
  </div>
</template>

<script>
import { auth, db } from "../firebase"

export default {
  name: "FavoritiPage",
  data() {
    return {
      listici: []
    }
  },
  computed: {
    ukupnoListica() {
      return this.listici.length
    },
    brojFavorita() {
      return this.listici.filter(l => l.isFavorite).length
    },
    brojPredmeta() {
      const predmeti = this.listici.map(l => l.predmet)
      return [...new Set(predmeti)].length
    },
    favoriti() {
      return this.listici.filter(l => l.isFavorite)
    }
  },
  async created() {
    const korisnik = auth.currentUser
    if (korisnik) {
      const snapshot = await db.collection("listici")
        .where("userId", "==", korisnik.uid)
        .get()
      this.listici = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  },
  methods: {
    async makniIzFavorita(listic) {
      await db.collection("listici").doc(listic.id).update({
        isFavorite: false
      })
      const korisnik = auth.currentUser
      const snapshot = await db.collection("listici")
        .where("userId", "==", korisnik.uid)
        .get()
      this.listici = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  }
}
</script>