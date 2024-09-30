import { defineNuxtPlugin } from '#app';
import VueDragResize from 'vue3-drag-resize';

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.component('vue-drag-resize', VueDragResize);
  nuxtApp.vueApp.component('VueDragResize', VueDragResize);
});