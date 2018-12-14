import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import MovieDetails from './views/MovieDetails.vue';
import EditMovie from './views/EditMovie.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/movie/:id', component: MovieDetails, name: 'movie' },
    { path: '/movie/:id/edit', component: EditMovie, name: 'edit_movie' }
];

export default new VueRouter({
    routes
});