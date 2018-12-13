<template>
<div class="container">
  <h1>Liste des films</h1>

  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#movieModal">Ajouter un film</button>
  <movie-modal v-bind:title="'Nouveau film'" v-bind:button="'Créer'" v-bind:movie="newMovie"></movie-modal>

  <div class="row mt-4">
    <div class="col-md-4" v-for="(movie, index) in movies">
      <movie-card v-bind:movie="movie"></movie-card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      newMovie: {
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: ''
      }
    }
  },
  computed: {
    loadingState() {
      return this.$store.state.loadingState;
    },

    movies() {
      return this.$store.state.movies;
    }
  }
}
</script>