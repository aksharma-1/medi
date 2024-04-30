import { registerPlugins } from "@/plugins";
import VueApexCharts from "vue3-apexcharts";
import dayjs from "dayjs";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Components
import App from "./App.vue";
import router from "./router";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

app.component('VueDatePicker', VueDatePicker);
app.use(router);
app.use(VueApexCharts);
app.config.globalProperties.$dayjs = dayjs;
app.mount("#app");
