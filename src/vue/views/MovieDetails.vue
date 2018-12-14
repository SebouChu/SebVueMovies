<template>
<div>
  <div v-if="movie == null" class="container">
    <p>Film non trouvé avec l'ID {{ this.$route.params.id }}</p>
  </div>

  <div v-if="movie" class="container">
    <div class="row align-items-center">
      <div class="col-md-3 text-center">
        <img src="https://via.placeholder.com/170x250" alt="Movie Poster">
      </div>
      <div class="col-md-9 mt-3 mb-3">
        <h3>{{ movie.title }}</h3>
        <div class="actions">
          <button type="button" class="btn btn-warning" v-on:click="$router.push({ name: 'edit_movie', params: { id: movie.id } })">Modifier</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteMovie(movie.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4">
        <h5>Infos</h5>
        <ul>
          <li><strong>Année</strong> : {{ movie.year }}</li>
          <li><strong>Langue</strong> : {{ movie.language }}</li>
          <li><strong>Genre</strong> : {{ movie.genre }}</li>
        </ul>
      </div>
      <div class="col-md-4">
        <h5>Réalisateur</h5>
        <ul>
          <li><strong>Nom</strong> : {{ movie.director.name }}</li>
          <li><strong>Nationalité</strong> : {{ movie.director.nationality }}</li>
          <li><strong>Date de naissance</strong> : {{ movie.director.birthdate }}</li>
        </ul>
      </div>
      <div class="col-md-4">
        <h5>Note du film</h5>
        <p>
          {{ movieRate }} / 5
          <small class="text-muted">({{ movie.ratings.length }} notes)</small>
        </p>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h5>Donnez votre note : </h5>
      <star-rating :show-rating="false" v-model="userRating" class="mt-3 mb-4"></star-rating>
      <button class="btn btn-primary" v-on:click="sendRating()">Noter</button>
    </div>
    <p><router-link :to="{ name: 'home' }">Retour</router-link></p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userRating: 3
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
      return this.movies.find(movie => movie.id == this.id)
    },

    movieRate() {
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  },

  methods: {
    deleteMovie(id) {
      if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        this.$store.dispatch('deleteMovieInAPI', this.id).then(() => {
          this.$router.push({ name: 'home' })
        });
      }
    },

    sendRating() {
      console.log(this.userRating);
      this.$store.dispatch('rateMovieInAPI', { id: this.id, rating: this.userRating }).then(() => {
        // TODO: Success Alert
      }).catch(() => {
        // TODO: Error Alert
      });
    }
  }
}
</script>
