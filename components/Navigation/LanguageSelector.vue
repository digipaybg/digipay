<script lang="ts" setup>
import { Languages } from "lucide-vue-next";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import { breakpointsTailwind } from "@vueuse/core";

const languages = [
  { code: "en", label: "English" },
  { code: "bg", label: "Bulgarian" },
];

const router = useRouter();
const { locale, setLocale } = useI18n();

const switchLanguage = (code: string) => {
  setLocale(code as any);
};

const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual("md");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger :as-child="true">
      <Button
        variant="ghost"
        :size="isMobile ? 'default' : 'icon'"
        class="flex items-center gap-4 w-full"
      >
        <Icon name="tabler:language" :size="24" />
        <div class="md:hidden text-xl">
          <h1>{{ $t("Navigation.language") }}</h1>
        </div>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <div class="flex flex-col gap-2">
        <DropdownMenuItem
          v-for="language in languages"
          :key="language.code"
          class="hover:text-accent-foreground md:text-lg text-xl"
          @click="switchLanguage(language.code)"
        >
          {{ language.label }}
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
