<template>
<div class="card h-100">
  <img src="https://via.placeholder.com/300x200" alt="Movie Image" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title text-primary">{{ movie.title }} ({{ movie.year }})</h5>
    <p class="card-text">Réalisé par {{ movie.director.name }}</p>
  </div>
  <div class="card-footer bg-white">
    <a href="#" class="card-link">En savoir plus</a>
  </div>
</div>
</template>

<script>
export default {
  props: ["movie"]
}
</script>