import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/router';

import '@/style.css';
import 'uno.css';
import 'katex/dist/katex.min.css';
import '@tdesign-vue-next/chat/es/style/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
