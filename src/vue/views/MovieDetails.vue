<template>
<div>
  <div v-if="movie == null" class="container">
    <p>Film non trouvé avec l'ID {{ this.$route.params.id }}</p>
  </div>

  <div v-if="movie" class="container">
    <div class="row align-items-center">
      <div class="col-lg-3 text-center">
        <img :src="movie.poster || 'no-poster.png'" alt="Movie Poster" class="img-fluid">
      </div>
      <div class="col-lg-9 mt-3 mb-3">
        <h3>{{ movie.title }}</h3>
        <div class="actions">
          <button type="button" class="btn btn-warning" v-on:click="$router.push({ name: 'edit_movie', params: { id: movie.id } })">Modifier</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteMovie(movie.id)">Supprimer</button>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-4">
        <h5>Infos</h5>
        <ul>
          <li><strong>Année</strong> : {{ movie.year }}</li>
          <li><strong>Langue</strong> : {{ movie.language }}</li>
          <li><strong>Genre</strong> : {{ movie.genre }}</li>
        </ul>
      </div>
      <div class="col-lg-4">
        <h5>Réalisateur</h5>
        <ul>
          <li><strong>Nom</strong> : {{ movie.director.name }}</li>
          <li><strong>Nationalité</strong> : {{ movie.director.nationality }}</li>
          <li><strong>Date de naissance</strong> : {{ movie.director.birthdate }}</li>
        </ul>
      </div>
      <div class="col-lg-4">
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
      <div v-if="!hasRated">
        <star-rating :show-rating="false" v-model="userRating" class="mt-3 mb-4"></star-rating>
        <button class="btn btn-primary" v-on:click="sendRating()">Noter</button>
      </div>
      <p class="mt-3" v-if="hasRated">Merci pour votre vote !</p>
    </div>
    <p><router-link :to="{ name: 'home' }">Retour</router-link></p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userRating: 3,
      hasRated: false
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
    },

    movieRate() {
      if (this.movie.ratings.length == 0) {
        return 'Non noté';
      }

      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  },
  created () {
    this.fetchMovie();
  },
  watch: {
    '$route': 'fetchMovie'
  },
  methods: {
    deleteMovie(id) {
      if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        this.$store.dispatch('deleteMovieInAPI', this.id).then(() => {
          this.$router.push({ name: 'home' });
        });
      }
    },

    fetchMovie() {
      this.$store.dispatch('getMovieFromAPI', this.$route.params.id);
    },

    sendRating() {
      this.$store.dispatch('rateMovieInAPI', { id: this.id, rating: this.userRating }).then(() => {
        // TODO: Success Alert
        this.hasRated = true;
        this.$store.dispatch('getMovieFromAPI', this.$route.params.id);
      }).catch(() => {
        // TODO: Error Alert
      });
    }
  }
}
</script>
