<script lang="ts" setup>
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import { breakpointsTailwind } from "@vueuse/core";

const languages = [
  { code: "bg", label: "Български" },
  { code: "en", label: "English" },
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
        class="flex items-center gap-2 md:gap-0 w-full md:w-auto justify-start md:justify-center"
      >
        <Icon name="tabler:language" :size="24" />
        <span class="md:hidden text-base font-medium">
          {{ $t("Navigation.language") }}
        </span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <div class="flex flex-col gap-2">
        <DropdownMenuItem
          v-for="language in languages"
          :key="language.code"
          class="hover:text-accent-foreground text-base md:text-sm font-medium"
          @click="switchLanguage(language.code)"
        >
          {{ language.label }}
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style lang="scss"></style>
