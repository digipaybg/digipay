<script lang="ts" setup>
import { z } from "zod";
import Label from "~/components/ui/label/Label.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

const form = reactive({
  name: "",
  email: "",
  message: "",
});

async function submit() {
  console.log(form.name, form.email, form.message);

  // await $fetch("/api/contact", {
  //   method: "POST",
  //   body: {
  //     name: form.name,
  //     email: form.email,
  //     message: form.message,
  //   },
  // });
  await addContact(form);

  form.name = "";
  form.email = "";
  form.message = "";
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
      <div class="flex flex-col items-center w-full max-w-xl">
        <Form :schema="contactSchema" @submit="submit" class="w-full">
          <div class="flex flex-col gap-8">
            <div class="flex gap-4 items-center">
              <div class="flex-1 space-y-2">
                <Label for="name" class="">Name</Label>
                <Input
                  v-model="form.name"
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                />
              </div>
              <div class="flex-1 space-y-2">
                <Label for="email" class="">Email</Label>

                <Input
                  v-model="form.email"
                  label="Email"
                  name="email"
                  placeholder="johndoe@mail.com"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="message" class="">Message</Label>
              <Textarea
                v-model="form.message"
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
          >
            Send
          </Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
