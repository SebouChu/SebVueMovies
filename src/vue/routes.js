import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, name: 'home' }
];

export default new VueRouter({
    routes
});