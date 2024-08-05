<script lang="ts" setup>
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "~/lib/firebase";

  const name = ref("");
  const email = ref("");
  const message = ref("");

  const people = [
    {
      name: "raya_lecheva",
      position: "founderAndGeneralManager",
      image: "/authors/raya-lecheva.jpg",
      phone: "+359 878 160 610",
      email: "raya.lecheva@digipay.bg",
    },
    {
      name: "petya_veleva",
      position: "ceo",
      image: "/authors/petya-veleva.jpg",
      phone: "+359 889 527 212",
      email: "petya.valeva@digipay.bg",
    },
  ];

  const disableInputs = ref(false);

  async function sendMail() {
    console.log({ name: name.value, email: email.value, message: message.value });
    disableInputs.value = true;
    await addDoc(collection(db, "mail"), {
      to: ["kaloyangfx@gmail.com"],
      message: {
        subject: `New message from the website: ${name.value}`,
        text: `Email: ${email.value}\nMessage: ${message.value}`,
      },
    });

    name.value = "";
    email.value = "";
    message.value = "";
    disableInputs.value = false;
  }
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center gap-20 p-24">
    <circle
      class="absolute -top-40 left-1/2 -z-10 aspect-square w-[30rem] -translate-x-1/2 rounded-full bg-[#27E076]/50 blur-[200px]"
    />
    <!-- <circle
      class="absolute left-[50%] top-[70%] -z-50 aspect-square w-3/4 -translate-x-1/2 rounded-full bg-[#27E076]/20 blur-[200px] sm:w-1/2 lg:top-[30%]"
    /> -->
    <div class="grid flex-1 grid-flow-row grid-cols-2">
      <div class="" v-for="person in people" :key="person.name">
        <div class="flex flex-col items-center justify-center gap-6 text-center">
          <NuxtImg format="webp" :quality="80" :src="person.image" alt="author" class="h-40 w-40 rounded-full" />
          <div>
            <h2 class="text-2xl font-bold">{{ $t(person.name) }}</h2>
            <p class="text-sm text-gray-400">{{ $t(person.position) }}</p>
            <p class="text-gray-400">{{ person.email }}</p>
            <p class="text-gray-400">{{ person.phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold">{{ $t("contactUs") }}</h1>
      </div>
      <div class="space-y-2">
        <Label for="name">{{ $t("Name") }}</Label>
        <Input v-model="name" label="name" :placeholder="$t('yourName')" :disabled="disableInputs" />
      </div>
      <div class="space-y-2">
        <Label for="name">{{ $t("Email") }}</Label>
        <Input v-model="email" label="email" :placeholder="$t('yourEmail')" type="email" :disabled="disableInputs" />
      </div>
      <div class="space-y-2">
        <Label for="name">{{ $t("Message") }}</Label>
        <Textarea
          v-model="message"
          label="message"
          :placeholder="$t('yourMessage')"
          class="min-h-40"
          :disabled="disableInputs"
        />
      </div>
      <Button class="mt-4 min-w-32" @click="sendMail">{{ $t("send") }}</Button>
    </div>
  </div>
</template>

<style lang="scss"></style>
