<template lang="html">
<div class="container">
  <h1>Modifier le film</h1>

  <div v-if="movie">
    <movie-form v-bind:movie="movie" v-bind:poster="newPoster"></movie-form>
    <button type="button" class="btn btn-primary" v-on:click="updateMovie()">Enregistrer</button>
    <button type="button" class="btn btn-link" v-on:click="$router.push({ name: 'movie', params: { id: movie.id } })">Retour</button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      newPoster: {
        file: null
      }
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },

    movie() {
      return this.$store.state.movie;
    }
  },
  methods: {
    updateMovie() {
      var params = { movie: this.movie, posterFile: this.newPoster.file };
      this.$store.dispatch('updateMovieInAPI', params).then(() => {
        this.$router.push({ name: 'movie', params: { id: this.movie.id } })
      });
    }
  }
}
</script>
