<template>
<div class="modal fade bd-example-modal-lg" id="movieModal" tabindex="-1" role="dialog" aria-labelledby="movieModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="movieModalLabel">{{ title }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-primary">{{ button }}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['title', 'button', 'movie']
}
</script>
