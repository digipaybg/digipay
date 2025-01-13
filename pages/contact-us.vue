<script lang="ts" setup>
import { z } from "zod";
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

function submit() {
  console.log(form.name, form.email, form.message);
}
</script>

<template>
  <div class="max-w-screen-2xl mx-auto *:font-sans">
    <LetterPullup
      words="Contact Us"
      text-class="!text-6xl"
      :initial-delay="150"
    />
    <div class="flex flex-col items-center mt-20">
      <div class="flex flex-col items-center w-full max-w-lg">
        <h2 class="text-3xl font-semibold mb-10">Send us a message</h2>
        <Form :schema="contactSchema" @submit="submit" class="w-full">
          <div class="flex flex-col gap-4">
            <Input v-model="form.name" label="Name" placeholder="John Doe" />
            <Input v-model="form.email" label="Email" placeholder="" />
            <Textarea
              v-model="form.message"
              label="Message"
              placeholder="Type your message here"
            />
          </div>
          <Button type="submit" class="mt-8 text-foreground">Send</Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
