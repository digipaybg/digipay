<script lang="ts" setup>
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "~/lib/firebase";

  const name = ref("");
  const email = ref("");
  const message = ref("");

  const disableInputs = ref(false);
  const sentMail = ref(false);
  const errorSendingMail = ref(false);

  async function sendMail() {
    console.log({ name: name.value, email: email.value, message: message.value });

    if (!name.value || !email.value || !message.value) {
      errorSendingMail.value = true;
      setTimeout(() => {
        errorSendingMail.value = false;
      }, 5000);
      return;
    }

    disableInputs.value = true;
    await addDoc(collection(db, "mail"), {
      to: ["raya.lecheva@digipay.bg"],
      message: {
        subject: `New message from the website: ${name.value}`,
        text: `Email: ${email.value}\nMessage: ${message.value}`,
      },
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
        errorSendingMail.value = true;
        setTimeout(() => {
          errorSendingMail.value = false;
        }, 5000);
      })
      .finally(() => {
        disableInputs.value = false;
        sentMail.value = true;
        setTimeout(() => {
          sentMail.value = false;
        }, 5000);
      });

    name.value = "";
    email.value = "";
    message.value = "";
    disableInputs.value = false;
  }
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center gap-20 p-8 lg:p-24">
    <circle
      class="absolute -top-40 left-1/2 -z-10 aspect-square w-[30rem] -translate-x-1/2 rounded-full bg-[#27E076]/50 blur-[200px]"
    />

    <div class="relative flex min-h-0 flex-[1] flex-col justify-center space-y-4 transition-all lg:flex-[0.4]">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold">{{ $t("contactUs") }}</h1>
      </div>
      <div class="flex flex-col gap-4 lg:flex-row">
        <div class="space-y-2">
          <Label for="name">{{ $t("name") }}</Label>
          <Input v-model="name" label="name" :placeholder="$t('yourName')" :disabled="disableInputs" />
        </div>
        <div class="space-y-2">
          <Label for="name">{{ $t("email") }}</Label>
          <Input v-model="email" label="email" :placeholder="$t('yourEmail')" type="email" :disabled="disableInputs" />
        </div>
      </div>
      <div class="space-y-2">
        <Label for="name">{{ $t("message") }}</Label>
        <Textarea
          v-model="message"
          label="message"
          :placeholder="$t('yourMessage')"
          class="min-h-40"
          :disabled="disableInputs"
        />
      </div>
      <Button class="mt-4 min-w-32" @click="sendMail">{{ $t("send") }}</Button>
      <Presence>
        <Motion
          v-if="sentMail"
          :initial="{
            opacity: 0,
            x: 500,
            scale: 1,
          }"
          :animate="{
            opacity: 1,
            x: 0,
            scale: 1,
          }"
          :exit="{
            opacity: 0,
            x: 500,
            scale: 1,
          }"
          :transition="{
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }),
          }"
          class="fixed bottom-10 right-10 rounded-lg border border-green-500 bg-green-500/25 p-4 text-center text-white shadow-[0px_0px_20px_5px] shadow-green-500/50 backdrop-blur-lg"
        >
          <p class="text-lg font-bold">{{ $t("mailSent") }}</p>
        </Motion>
        <Motion
          v-if="errorSendingMail"
          :initial="{
            opacity: 0,
            x: 500,
            scale: 1,
          }"
          :animate="{
            opacity: 1,
            x: 0,
            scale: 1,
          }"
          :exit="{
            opacity: 0,
            x: 500,
            scale: 1,
          }"
          :transition="{
            easing: spring({
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }),
          }"
          class="fixed bottom-10 right-10 rounded-lg border border-red-500 bg-red-500/35 p-4 text-center text-white shadow-[0px_0px_20px_5px] shadow-red-500/50 backdrop-blur-lg"
        >
          <p class="text-lg font-bold">{{ $t("mailError") }}</p>
        </Motion>
      </Presence>
    </div>
  </div>
</template>

<style lang="scss"></style>
