// plugins/primevue.js
import Vue from 'vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS

Vue.use(PrimeVue);

Vue.component('Button', Button);
