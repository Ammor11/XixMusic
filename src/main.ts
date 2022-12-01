import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入elementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入pinia
import { createPinia } from "pinia";

// 引入重置样式&公共样式
import "./assets/style/reset.css";
import "./assets/style/public.css";

// 引入iconfont样式
import "@/assets/iconfont/iconfont.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount("#app");
