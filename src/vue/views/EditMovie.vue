<template lang="html">
<div class="container">
  <h1>Modifier le film</h1>

  <movie-form v-bind:movie="movie"></movie-form>
  <button type="button" class="btn btn-primary" v-on:click="updateMovie()">Enregistrer</button>
  <button type="button" class="btn btn-link" v-on:click="$router.push({ name: 'home' })">Retour</button>
</div>
</template>

<script>
export default {
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },

    movie() {
      return this.movies.find(movie => movie.id == this.id)
    }
  },
  methods: {
    updateMovie() {
      this.$store.dispatch('updateMovieInAPI', this.movie).then(() => {
        this.$router.push({ name: 'movie', params: { id: this.movie.id } })
      });
    }
  }
}
</script>
