import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Vuex);

var myStore = new Vuex.Store({
    state: {
        movies: [],
        loadingState: false
    },
    mutations: {
        setLoadingState(state, loading) {
            state.loadingState = loading;
        }
    },
    actions: {
        getMoviesFromApi(context) {
            context.commit('setLoadingState', true);
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