import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Pictures from './views/Pictures.vue'
import Contact from './views/Contact.vue'
import Login from './views/Login.vue'
// conditions pages
import Asymmetry from './views/Conditions/Asymmetry.vue'
import Border from './views/Conditions/Border.vue'
import Color from './views/Conditions/Color.vue'
import Diameter from './views/Conditions/Diameter.vue'
import Evolution from './views/Conditions/Evolution.vue'
// import VueGoogleMaps from '@fawmi/vue-google-maps';

import { ref } from 'vue';

const routes = [
    {path: '/', component: Home},
    {path: '/pictures', component: Pictures},
    {path: '/contact', component: Contact},
    {path: '/login', component: Login},
    {path: '/asymmetry', component: Asymmetry},
    {path: '/border', component: Border},
    {path: '/color', component: Color},
    {path: '/diameter', component: Diameter},
    {path: '/evolution', component: Evolution},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)
app.config.globalProperties.$globalVar = ref(false);

app.use(router).mount('#app')
