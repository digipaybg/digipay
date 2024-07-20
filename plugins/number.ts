import AnimatedNumber from "vue-3-animated-number";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AnimatedNumber);
});
