<template>
  <div class="container mt-4">
    <h2>Moji listići</h2>
    <div class="card p-3 mt-3">
      <h5>Novi listić</h5>
      <div class="form-row align-items-end">
        <div class="col">
          <label>Predmet</label>
          <input type="text" class="form-control" v-model="noviPredmet" placeholder="Matematika">
        </div>
        <div class="col">
          <label>Napomena</label>
          <input type="text" class="form-control" v-model="novaNapomena" placeholder="Str. 45-50">
        </div>
        <div class="col-auto">
          <button class="btn btn-success" @click="dodajListic">Dodaj</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase"
import firebase from "firebase/app"

export default {
  name: "ListiciPage",
  data() {
    return {
      noviPredmet: "",
      novaNapomena: ""
    }
  },
  methods: {
    async dodajListic() {
      if (!this.noviPredmet) return
      const korisnik = auth.currentUser
      await db.collection("listici").add({
        predmet: this.noviPredmet,
        napomena: this.novaNapomena,
        datum: firebase.firestore.FieldValue.serverTimestamp(),
        isFavorite: false,
        userId: korisnik.uid
      })
      this.noviPredmet = ""
      this.novaNapomena = ""
    }
  }
}
</script>