<script setup lang="ts">
import { Toaster } from "./components/ui/sonner";
</script>

<template>
  <div>
    <Toaster />
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
