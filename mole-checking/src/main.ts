import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Pictures from './views/Pictures.vue'
import Contact from './views/Contact.vue'
import Login from './views/Login.vue'
// import VueGoogleMaps from '@fawmi/vue-google-maps';



const routes = [
    {path: '/', component: Home},
    {path: '/pictures', component: Pictures},
    {path: '/contact', component: Contact},
    {path: '/login', component: Login},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
