import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import MovieDetails from './views/MovieDetails.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/movie/:id', component: MovieDetails, name: 'movie' }
];

export default new VueRouter({
    routes
});