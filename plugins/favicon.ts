export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("app:mounted", () => {
    if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
      useFavicon("/logo-dark.png");
    } else {
      useFavicon("/logo.png");
    }
  });
});
