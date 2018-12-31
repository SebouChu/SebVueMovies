<template>
<form enctype="multipart/form-data">
  <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Erreur :</strong> {{ error }}
  </div>

  <div class="form-group">
    <label for="title">Titre</label>
    <input type="text" placeholder="ex: Interstellar" class="form-control" id="title" v-model="movie.title">
  </div>

  <div class="form-group">
    <label for="year">Année</label>
    <input type="number" placeholder="ex: 2014" class="form-control" id="year" v-model="movie.year">
  </div>

  <div class="form-group">
    <label for="language">Langue</label>
    <input type="text" placeholder="ex: Anglais" class="form-control" id="language" v-model="movie.language">
  </div>

  <h6>Réalisateur</h6>
  <div class="form-row">
    <div class="form-group col-lg-4">
      <label for="director_name">Nom</label>
      <input type="text" placeholder="ex: Christopher Nolan" class="form-control" id="director_name" v-model="movie.director.name">
    </div>

    <div class="form-group col-lg-4">
      <label for="director_nationality">Nationalité</label>
      <input type="text" placeholder="ex: Britannique" class="form-control" id="director_nationality" v-model="movie.director.nationality">
    </div>

    <div class="form-group col-lg-4">
      <label for="director_birthdate">Date de naissance</label>
      <input type="date" placeholder="ex: 1970-07-30" class="form-control" id="director_birthdate" v-model="movie.director.birthdate">
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-lg-6">
      <label for="poster">Poster</label>
      <input type="file" ref="posterInput" class="form-control-file" id="poster" accept=".png, .jpg, .jpeg" v-on:change="processFile($event)">
      <button type="button" class="btn btn-sm btn-outline-primary d-block mt-2" v-on:click="searchPoster($event)" :disabled="searching">
        <span v-if="searching" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Rechercher sur OMDb
      </button>
      <button type="button" class="btn btn-danger d-block mt-3" v-if="movie.poster" v-on:click="movie.poster = null">Supprimer</button>
    </div>

    <div class="form-group col-lg-6" v-if="movie.poster || preview">
      <p>Poster actuel :</p>
      <img :src="movie.poster ||  preview" alt="Poster actuel" class="img-fluid">
    </div>
  </div>

  <div class="form-group">
    <label for="genre">Genre</label>
    <input type="text" placeholder="ex: Science-fiction" class="form-control" id="genre" v-model="movie.genre">
  </div>
</form>
</template>

<script>
export default {
  props: ['movie', 'poster'],
  data() {
    return {
      error: null,
      preview: null,
      reader: new FileReader(),
      searching: false
    };
  },
  methods: {
    processFile($event) {
      this.movie.poster = null;

      this.poster.file = $event.target.files[0];
      var self = this;
      this.reader.onload = function (e) {
        self.preview = e.target.result;
      };

      if (this.poster.file) {
        this.reader.readAsDataURL(this.poster.file);
      }
    },

    searchPoster() {
      this.searching = true;
      this.$store.dispatch('searchPosterInAPI', this.movie.title).then((response) => {
        this.searching = false;
        if (response.error !== undefined) {
          this.error = response.error;
        } else {
          this.movie.poster = response.poster_url;

          this.$refs.posterInput.value = "";
          this.poster.file = null;
          this.preview = null;
        }
      });
    }
  }
}
</script>
