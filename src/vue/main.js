import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js'

import MovieCardComponent from './components/movie-card.vue'
import MovieModalComponent from './components/movie-modal.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios');

Vue.use(Vuex);

Vue.component('movie-card', MovieCardComponent);
Vue.component('movie-modal', MovieModalComponent);

var myStore = new Vuex.Store({
    state: {
        movies: [],
        loadingState: false
    },
    mutations: {
        setLoadingState(state, loadingState) {
            state.loadingState = loadingState;
        },

        updateMovies(state, movies) {
            state.movies = movies;
        }
    },
    actions: {
        getMoviesFromApi(context) {
            context.commit('setLoadingState', true);

            axios.get('/api/movies').then(function (response) {
                context.commit('updateMovies', response.data);
                context.commit('setLoadingState', false);
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
        this.$store.dispatch('getMoviesFromApi')
    }
});