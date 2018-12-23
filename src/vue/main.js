import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js'

import VueStarRatingComponent from 'vue-star-rating';
import MovieCardComponent from './components/movie-card.vue'
import MovieFormComponent from './components/movie-form.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios');

Vue.use(Vuex);

Vue.component('movie-card', MovieCardComponent);
Vue.component('movie-form', MovieFormComponent);
Vue.component('star-rating', VueStarRatingComponent);

var myStore = new Vuex.Store({
    state: {
        movies: [],
        movie: null
    },
    mutations: {
        updateMovies(state, movies) {
            state.movies = movies;
        },

        updateSelectedMovie(state, movie) {
            state.movie = movie;
        },

        addMovie(state, movie) {
            state.movies.push(movie);
        },

        updateMovie(state, movie) {
            var index = state.movies.findIndex(storedMovie => storedMovie.id == movie.id);
            if (index !== -1) {
                state.movies[index] = movie;
            }
        },

        deleteMovie(state, id) {
            var index = state.movies.findIndex(movie => movie.id == id);
            if (index !== -1) {
                state.movies.splice(index, 1);
            }
        },

        rateMovie(state, params) {
            var index = state.movies.findIndex(movie => movie.id == params.id);
            if (index !== -1) {
                state.movies[index].ratings.push(params.rating);
            }
        }
    },
    actions: {
        getMoviesFromAPI(context) {
            axios.get('/api/movies').then(function (response) {
                context.commit('updateMovies', response.data);
            })
        },

        getMovieFromAPI(context, id) {
            axios.get(`/api/movies/${id}`).then(function (response) {
                context.commit('updateSelectedMovie', response.data);
            })
        },

        addMovieToAPI(context, params) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append('movie', JSON.stringify(params.movie));
                formData.append('posterFile', params.posterFile);

                axios.post('/api/movies', formData)
                    .then(response => {
                        if (response.status === 200) {
                            context.commit('addMovie', response.data);
                            resolve(response.data.id);
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },

        updateMovieInAPI(context, params) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append('movie', JSON.stringify(params.movie));
                formData.append('posterFile', params.posterFile);

                axios.post(`/api/movies/${params.movie.id}`, formData)
                    .then(response => {
                        if (response.status === 200) {
                            context.commit('updateMovie', response.data);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },

        deleteMovieInAPI(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/${id}/delete`)
                    .then(response => {
                        if (response.status === 204) {
                            context.commit('deleteMovie', id);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },

        rateMovieInAPI(context, params) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/movies/${params.id}/rate`, { rating: params.rating })
                    .then(response => {
                        if (response.status === 204) {
                            context.commit('rateMovie', params);
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
        this.$store.dispatch('getMoviesFromAPI');
    }
});