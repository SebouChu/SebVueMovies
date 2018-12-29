<template>
<div class="card h-100">
  <img :src="movie.poster || 'no-poster.png'" alt="Movie Image" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title text-primary">{{ movie.title }} ({{ movie.year }})</h5>
    <p class="card-text">Réalisé par {{ movie.director.name }}</p>
  </div>
  <div class="card-footer bg-white d-flex align-items-center justify-content-between">
    <small class="float-left text-muted">Note : {{ movieRate }} / 5 ({{ movie.ratings.length }} votes)</small>
    <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="float-right card-link">En savoir plus</router-link>
  </div>
</div>
</template>

<script>
export default {
  props: ["movie"],
  computed: {
    movieRate() {
      if (this.movie.ratings.length == 0) {
        return 'Non noté';
      }
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  }
}
</script>
<style>
  .card-img-top {
    height: 250px;
    object-fit: cover;
  }
</style>