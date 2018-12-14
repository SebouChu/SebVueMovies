import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js'

import MovieCardComponent from './components/movie-card.vue'
import MovieFormComponent from './components/movie-form.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios');

Vue.use(Vuex);

Vue.component('movie-card', MovieCardComponent);
Vue.component('movie-form', MovieFormComponent);

var myStore = new Vuex.Store({
    state: {
        movies: []
    },
    mutations: {
        addMovie(state, movie) {
            state.movies.push(movie);
        },

        updateMovies(state, movies) {
            state.movies = movies;
        },

        updateMovie(state, movie) {
            var index = state.movies.findIndex(storedMovie => storedMovie.id == movie.id);
            state.movies[index] = movie;
        }
    },
    actions: {
        getMoviesFromAPI(context) {
            axios.get('/api/movies').then(function (response) {
                context.commit('updateMovies', response.data);
            })
        },

        addMovieToAPI(context, movie) {
            return new Promise((resolve, reject) => {
                axios.post('/api/movies', movie)
                    .then(response => {
                        if (response.status == 200) {
                            movie.id = response.data.id;
                            console.log(movie.id)
                            context.commit('addMovie', movie);
                            resolve(movie.id);
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },

        updateMovieInAPI(context, movie) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/movies/${movie.id}`, movie)
                    .then(response => {
                        if (response.status == 204) {
                            context.commit('updateMovie', movie);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        }
    }
});

const app = new Vue({
    el: '#app',
    router,
    store: myStore,
    render: h => h(App),
    mounted() {
        this.$store.dispatch('getMoviesFromAPI')
    }
});