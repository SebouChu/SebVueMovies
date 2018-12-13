<template>
<form>
  <div class="form-group">
    <label for="title">Titre</label>
    <input type="text" placeholder="ex: Interstellar" class="form-control" id="title" v-model="movie.title">
  </div>

  <div class="form-group">
    <label for="year">Année</label>
    <input type="number" placeholder="ex: 2014" class="form-control" id="year" v-model="movie.year">
  </div>

  <div class="form-group">
    <label for="language">Langue</label>
    <input type="text" placeholder="ex: Anglais" class="form-control" id="language" v-model="movie.language">
  </div>

  <h6>Réalisateur</h6>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="director_name">Nom</label>
      <input type="text" placeholder="ex: Christopher Nolan" class="form-control" id="director_name" v-model="movie.director.name">
    </div>

    <div class="form-group col-md-4">
      <label for="director_nationality">Nationalité</label>
      <input type="text" placeholder="ex: Britannique" class="form-control" id="director_nationality" v-model="movie.director.nationality">
    </div>

    <div class="form-group col-md-4">
      <label for="director_birthdate">Date de naissance</label>
      <input type="date" placeholder="ex: 1970-07-30" class="form-control" id="director_birthdate" v-model="movie.director.birthdate">
    </div>
  </div>

  <div class="form-group">
    <label for="genre">Genre</label>
    <input type="text" placeholder="ex: Science-fiction" class="form-control" id="genre" v-model="movie.genre">
  </div>
</form>
</template>

<script>
export default {
  props: ['movie']
}
</script>
