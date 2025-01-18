<script lang="ts" setup>
import { addDoc, collection } from "firebase/firestore";
import { toast } from "vue-sonner";
import { db } from "~/lib/firebase";

const name = ref("");
const email = ref("");
const disabled = ref(false);
const { t } = useI18n();

async function subscribe() {
  if (!name.value || !email.value) {
    toast.error(t("Newsletter.error.fillFields"), {
      richColors: true,
      closeButton: true,
      invert: true,
    });
    return;
  }

  disabled.value = true;

  await addDoc(collection(db, "mail"), {
    to: ["kaloyangfx@gmail.com"],
    message: {
      subject: "New Newsletter Subscription",
      text: `Name: ${name.value}\nEmail: ${email.value}`,
    },
  })
    .catch((error) => {
      console.error("Error subscribing: ", error);
      toast.error(t("Newsletter.error.subscribeError"), {
        richColors: true,
        closeButton: true,
        invert: true,
      });
      disabled.value = false;
    })
    .finally(() => {
      name.value = "";
      email.value = "";
      toast.success(t("Newsletter.success"), {
        richColors: true,
        closeButton: true,
        invert: true,
      });
      disabled.value = false;
    });
}
</script>

<template>
  <div
    class="w-full mx-auto p-8 rounded-xl bg-secondary shadow-[0px_5px_10px_0px] shadow-border mt-32"
  >
    <h2 class="text-3xl font-bold mb-2">{{ $t("Newsletter.title") }}</h2>
    <p class="text-muted-foreground mb-6">
      {{ $t("Newsletter.description") }}
    </p>

    <div class="flex items-center justify-around gap-4">
      <div class="space-y-2 flex-1">
        <Label for="newsletter-name">{{ $t("Newsletter.name") }}</Label>
        <Input
          v-model="name"
          id="newsletter-name"
          :placeholder="$t('Newsletter.namePlaceholder')"
          :disabled="disabled"
        />
      </div>

      <div class="space-y-2 flex-1">
        <Label for="newsletter-email">{{ $t("Newsletter.email") }}</Label>
        <Input
          v-model="email"
          id="newsletter-email"
          placeholder="ivan@mail.com"
          :disabled="disabled"
        />
      </div>

      <Button
        type="submit"
        class="bg-primary text-primary-foreground flex-[0.5] place-self-end my-0.5"
        :disabled="disabled"
        @click="subscribe"
      >
        {{ $t("Newsletter.subscribe") }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss"></style>
