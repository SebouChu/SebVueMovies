<template>
<div class="card h-100">
  <img src="https://via.placeholder.com/170x250" alt="Movie Image" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title text-primary">{{ movie.title }} ({{ movie.year }})</h5>
    <p class="card-text">Réalisé par {{ movie.director.name }}</p>
  </div>
  <div class="card-footer bg-white">
    <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="card-link">En savoir plus</router-link>
  </div>
</div>
</template>

<script>
export default {
  props: ["movie"]
}
</script>
<style>
  .card-img-top {
    height: 250px;
    object-fit: cover;
  }
</style>