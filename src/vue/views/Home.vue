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
          <movie-form v-bind:movie="newMovie" v-bind:poster="newPoster"></movie-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="createMovie()">Ajouter</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3 mb-4">
    <div class="col-lg-5">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="search_attribute">Type</label>
        </div>
        <select class="custom-select" v-model="search.attribute" id="search_attribute">
          <option value="title">Titre</option>
          <option value="year">Année</option>
          <option value="director_name">Nom du réalisateur</option>
          <option value="genre">Genre</option>
        </select>
        <input type="text" class="form-control" placeholder="Recherche..." aria-label="Recherche" v-model="search.value" id="search_value">
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-lg-4 col-md-6 mb-4" v-for="(movie, index) in displayedMovies">
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
        poster: null,
        genre: '',
        ratings: []
      },
      newPoster: {
        file: null
      },
      search: {
        attribute: 'title',
        value: ''
      }
    }
  },
  methods: {
    resetForm() {
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
        poster: null,
        genre: '',
        ratings: []
      };
      this.newPoster = {
        file: null
      }
    },

    createMovie() {
      var params = { movie: this.newMovie, posterFile: this.newPoster.file };
      this.$store.dispatch('addMovieToAPI', params).then(id => {
        this.resetForm();
        this.$router.push({ name: 'movie', params: { id: id } })
      });
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    searchedMovies() {
      var searchAttributes = this.search.attribute.split('_');
      return this.movies.filter(movie => {
        var digger = movie;
        searchAttributes.forEach(attr => { digger = digger[attr] });

        return digger.toString().toLowerCase().indexOf(this.search.value.toLowerCase()) !== -1;
      });
    },
    displayedMovies() {
      return (this.search.value !== '') ? this.searchedMovies : this.movies;
    }
  }
}
</script>

<style media="screen">
  input#search_value {
    flex-grow: 3;
  }
</style>