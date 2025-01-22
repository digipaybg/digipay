<script lang="ts" setup>
import { addDoc, collection } from "firebase/firestore";
import { toast } from "vue-sonner";
import { db } from "~/lib/firebase";

const { t } = useI18n();

useHead({
  title: t("ContactPage.title"),
});

const name = ref("");
const email = ref("");
const message = ref("");

const disabled = ref(false);

async function sendMail() {
  console.log({ name: name.value, email: email.value, message: message.value });

  if (!name.value || !email.value || !message.value) {
    toast.error(t("ContactPage.form.error.fillFields"), {
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
      subject: `New message from DIGIPAY Site: ${name.value}`,
      text: `Email: ${email.value}\nMessage: ${message.value}`,
    },
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
      toast.error(t("ContactPage.form.error.sendError"), {
        richColors: true,
        closeButton: true,
        invert: true,
      });
      disabled.value = false;
    })
    .finally(() => {
      name.value = "";
      email.value = "";
      message.value = "";
      toast.success(t("ContactPage.form.success"), {
        richColors: true,
        closeButton: true,
        invert: true,
      });
      disabled.value = false;
    });
}
</script>

<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 *:font-sans">
    <LetterPullup
      :animate-directly="true"
      :words="$t('ContactPage.title')"
      text-class="!text-4xl md:!text-6xl"
      :initial-delay="100"
      key="title-contact"
    />
    <LetterPullup
      :animate-directly="true"
      :words="$t('ContactPage.subtitle')"
      text-class="!text-3xl md:!text-5xl font-semibold pt-4"
      :initial-delay="200"
      key="subtitle-contact"
    />

    <div class="flex flex-col items-center my-16 md:my-32">
      <div class="flex flex-col items-center w-full max-w-2xl">
        <div class="flex flex-col gap-6 md:gap-8 w-full">
          <div
            class="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <div class="flex-1 space-y-2 w-full">
              <Label for="name">{{ $t("ContactPage.form.name") }}</Label>
              <Input
                v-model="name"
                label="Name"
                name="name"
                :placeholder="$t('ContactPage.form.namePlaceholder')"
                :disabled="disabled"
              />
            </div>
            <div class="flex-1 space-y-2 w-full">
              <Label for="email">{{ $t("ContactPage.form.email") }}</Label>
              <Input
                v-model="email"
                label="Email"
                name="email"
                placeholder="ivan@mail.com"
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="message">{{ $t("ContactPage.form.message") }}</Label>
            <Textarea
              v-model="message"
              label="Message"
              name="message"
              :placeholder="$t('ContactPage.form.messagePlaceholder')"
              rows="5"
              :disabled="disabled"
            />
          </div>
        </div>
        <Button
          type="submit"
          class="mt-6 md:mt-8 w-full bg-primary text-primary-foreground"
          @click="sendMail"
        >
          {{ $t("ContactPage.form.send") }}
        </Button>
      </div>
    </div>
    <NewsletterSection />
  </div>
</template>

<style lang="scss"></style>
