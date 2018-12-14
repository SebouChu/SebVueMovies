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
      <div class="col-md-6">
        <h5>Infos</h5>
        <ul>
          <li><strong>Année</strong> : {{ movie.year }}</li>
          <li><strong>Langue</strong> : {{ movie.language }}</li>
          <li><strong>Genre</strong> : {{ movie.genre }}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h5>Réalisateur</h5>
        <ul>
          <li><strong>Nom</strong> : {{ movie.director.name }}</li>
          <li><strong>Nationalité</strong> : {{ movie.director.nationality }}</li>
          <li><strong>Date de naissance</strong> : {{ movie.director.birthdate }}</li>
        </ul>
      </div>
    </div>
    <button type="button" class="btn btn-link" v-on:click="$router.push({ name: 'home' })">Retour</button>
  </div>
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
    deleteMovie(id) {
      if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        // Suppression
        // Retour à la maison
      }
    }
  }
}
</script>
