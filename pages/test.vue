<script setup lang="ts">
  const show = ref(true);

  definePageMeta({
    layout: "fksof",
  });
</script>

<template>
  <div class="container">
    <Presence>
      <Motion
        v-show="show"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.6, filter: 'blur(10px)', y: 100 }"
        class="box"
      />
    </Presence>
    <button @click="show = !show">Toggle</button>
  </div>
</template>

<style>
  :root {
    --splash: #fca311;
  }

  .container {
    width: 100px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .container button {
    cursor: pointer;
  }
  .box {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: var(--splash);
  }
</style>
