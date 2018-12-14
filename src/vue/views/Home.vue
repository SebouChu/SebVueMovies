<template>
<div class="container">
  <h1>Liste des films</h1>

  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#movieModal">Ajouter un film</button>
  <div class="modal fade bd-example-modal-lg" id="movieModal" tabindex="-1" role="dialog" aria-labelledby="movieModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="movieModalLabel">Nouveau film</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <movie-form v-bind:movie="newMovie"></movie-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="createMovie()">Ajouter</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-md-4 mb-4" v-for="(movie, index) in movies">
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
        genre: '',
        rating: []
      }
    }
  },
  methods: {
    resetNewMovie() {
      this.newMovie = {
        id: undefined,
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: []
      };
    },

    createMovie() {
      this.$store.dispatch('addMovieToAPI', this.newMovie).then(id => {
        this.resetNewMovie();
        this.$router.push({ name: 'movie', params: { id: id } })
      });
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    }
  }
}
</script>