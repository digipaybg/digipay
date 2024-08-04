<script lang="ts" setup>
  const name = ref("");
  const email = ref("");
  const message = ref("");
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-24">
    <div class="flex-1"></div>
    <div class="flex-1 space-y-4">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold">Contact Us</h1>
        <p class="mt-4 text-lg text-gray-400">We are here to help you.</p>
      </div>
      <div class="space-y-2">
        <Label for="name">Name</Label>
        <Input v-model="name" label="name" placeholder="Your name" />
      </div>
      <div class="space-y-2">
        <Label for="name">Email</Label>
        <Input v-model="email" label="email" placeholder="Your email" type="email" />
      </div>
      <div class="space-y-2">
        <Label for="name">Message</Label>
        <Textarea v-model="message" label="message" placeholder="Your message" class="min-h-40" />
      </div>
      <Button class="mt-4" @click="console.log({ name, email, message })">Send</Button>
    </div>
  </div>
</template>

<style lang="scss"></style>
