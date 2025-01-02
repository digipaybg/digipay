import type { Transition } from "@vueuse/motion";

export const defaultTransition: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 1.5,
};
