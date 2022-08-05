import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入elementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入pinia
import { createPinia } from "pinia";

// 引入重置样式
import "./assets/style/reset.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

app.use(ElementPlus);
app.use(createPinia());
