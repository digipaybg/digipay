<script lang="ts" setup>
  import gsap from "gsap";
  import { onMounted, ref, type HTMLAttributes } from "vue";
  const animatedNumber = ref(0);

  // gsap.to(animatedNumber, {
  //   value: 100,
  //   duration: 2,
  //   ease: "power2.inOut",
  //   onUpdate: () => {
  //     animatedNumber.value = Math.round(animatedNumber.value);
  //   },
  // });
  interface AnimatedNumberProps {
    number: number;
    class: HTMLAttributes["class"];
  }

  const props = defineProps<AnimatedNumberProps>();

  const targetRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(animatedNumber, {
              value: props.number,
              duration: 1,
              ease: "power2.out",
              onUpdate: () => {
                animatedNumber.value = Math.round(animatedNumber.value);
              },
            });
          }
        });
      },
      { threshold: 1 },
    );

    observer.observe(targetRef.value!);

    console.log(targetRef.value);
    console.log(observer);
  });
</script>

<template>
  <span ref="targetRef" :key="props.number" class="number" :class="props.class">{{ animatedNumber }}</span>
</template>

<style lang="scss"></style>
