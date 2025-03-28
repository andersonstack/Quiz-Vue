import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import { createApp } from "vue";

import "./styles/reset.css";
import "./styles/global.css";

createApp(App).use(VueAxios, axios).mount("#app");
