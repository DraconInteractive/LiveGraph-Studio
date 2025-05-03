import '@vue-flow/core/dist/style.css';            // core styles (required)
import '@vue-flow/core/dist/theme-default.css';    // default theme (includes dark mode support)

import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";

createApp(App).mount("#app");
