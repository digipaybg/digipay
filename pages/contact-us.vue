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
    to: ["kaloyangfx@gmail.com"],
    message: {
      subject: `New message from DIGIPAY Site: ${name.value}`,
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
  <div class="max-w-screen-2xl mx-auto *:font-sans">
    <LetterPullup
      words="Contact Us"
      text-class="!text-6xl"
      :initial-delay="150"
    />
    <LetterPullup
      words="Send us a message"
      text-class="!text-5xl font-semibold pt-4"
      :initial-delay="250"
    />

    <div class="flex flex-col items-center mt-20">
      <div class="flex flex-col items-center w-full max-w-2xl">
        <div class="flex flex-col gap-8 w-full">
          <div class="flex gap-4 items-center">
            <div class="flex-1 space-y-2">
              <Label for="name" class="">Name</Label>
              <Input
                v-model="name"
                label="Name"
                name="name"
                placeholder="John Doe"
              />
            </div>
            <div class="flex-1 space-y-2">
              <Label for="email" class="">Email</Label>

              <Input
                v-model="email"
                label="Email"
                name="email"
                placeholder="johndoe@mail.com"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="message" class="">Message</Label>
            <Textarea
              v-model="message"
              label="Message"
              name="message"
              placeholder="Your message..."
              rows="5"
            />
          </div>
        </div>
        <Button
          type="submit"
          class="mt-8 w-full bg-primary text-primary-foreground"
          @click="sendMail"
        >
          Send
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
