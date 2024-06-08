<script lang="ts" setup></script>

<template>
  <div>
    {{ $t("topics") }}
    <h1 v-for="theme in $t('topics')">
      {{ theme }}
    </h1>
  </div>
</template>

<style lang="scss"></style>
