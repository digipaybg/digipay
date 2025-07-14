<script lang="ts" setup>
import { toast } from "vue-sonner";

const name = ref("");
const email = ref("");
const disabled = ref(false);
const { t } = useI18n();

const mail = useMail();

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

  mail
    .send({
      from: "Kaloyan Stoyanov <kaloyangfx@gmail.com>",
      to: "raya.lecheva@digipay.bg",
      subject: "Нова регистрация в бюлетин",
      text: `
      Име: ${name.value}

      Имейл: ${email.value}
      `,
    })
    .catch((error: any) => {
      console.error(error);
      toast.error(t("Newsletter.error.sendError"), {
        richColors: true,
        closeButton: true,
        invert: true,
      });
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
    class="max-w-4xl mx-auto p-8 rounded-xl bg-secondary shadow-[0px_5px_10px_0px] shadow-border"
  >
    <div class="flex flex-row gap-8 items-center">
      <!-- Text Content -->
      <div class="flex-1">
        <h2 class="text-3xl font-bold mb-2">{{ $t("Newsletter.title") }}</h2>
        <p class="text-muted-foreground">
          {{ $t("Newsletter.description") }}
        </p>
      </div>

      <!-- Form Content -->
      <div class="flex-1">
        <div class="flex flex-col gap-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <Label for="newsletter-name">{{ $t("Newsletter.name") }}</Label>
              <Input
                v-model="name"
                id="newsletter-name"
                :placeholder="$t('Newsletter.namePlaceholder')"
                :disabled="disabled"
              />
            </div>

            <div class="flex-1">
              <Label for="newsletter-email">{{ $t("Newsletter.email") }}</Label>
              <Input
                v-model="email"
                id="newsletter-email"
                :placeholder="$t('Newsletter.emailPlaceholder')"
                :disabled="disabled"
              />
            </div>
          </div>

          <Button
            type="submit"
            class="w-full bg-primary text-primary-foreground"
            :disabled="disabled"
            @click="subscribe"
          >
            {{ $t("Newsletter.subscribe") }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
