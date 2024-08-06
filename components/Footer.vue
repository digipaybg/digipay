<script lang="ts" setup>
  const people = [
    {
      name: "raya_lecheva",
      position: "founderAndGeneralManager",
      image: "/authors/raya-lecheva.jpg",
      phone: "+359 878 160 610",
      email: "raya.lecheva@digipay.bg",
      linkedIn: "https://www.linkedin.com/in/raya-lecheva-9b155613",
    },
    {
      name: "petya_veleva",
      position: "ceo",
      image: "/authors/petya-veleva.jpg",
      phone: "+359 889 527 212",
      email: "petya.valeva@digipay.bg",
    },
  ];

  const socials = [
    {
      name: "i-ic-baseline-facebook",
      link: "https://www.facebook.com/digipaybg/",
    },
    {
      name: "i-mdi-youtube",
      link: "https://www.youtube.com/@digipay8873",
    },
    {
      name: "i-basil-viber-outline",
      link: "https://invite.viber.com/?g2=AQA8PRiCxpGN3k9NPjr%2FA9GJShhAqN23Vhj4KcU3ZLFJ8RQCJEzK5lnMLp93A0GJ",
    },
  ];
</script>

<template>
  <div class="flex h-auto flex-col space-y-10 divide-y divide-white px-4 sm:px-10 md:px-20">
    <div class="flex w-full flex-col items-center justify-around space-y-6 sm:flex-row sm:space-y-0">
      <Logo class="h-[60px] w-[60px] justify-self-start text-white sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px]" />
      <div class="flex flex-1 flex-col gap-4 px-4 sm:flex-row sm:gap-10 sm:px-10 md:px-20">
        <div class="flex flex-col gap-1 sm:gap-2" v-for="person in people" :key="person.name">
          <div>
            <h1 class="text-sm font-bold sm:text-base md:text-lg">{{ $t(person.name) }}</h1>
            <h2 class="text-xs font-bold sm:text-sm md:text-base">{{ $t(person.position) }}</h2>
          </div>
          <h3 class="text-xs sm:text-sm md:text-base">{{ person.phone }}</h3>
          <h3 class="text-xs sm:text-sm md:text-base">{{ person.email }}</h3>
          <div v-if="person.linkedIn">
            <NuxtLink :href="person.linkedIn" target="_blank" rel="noopener noreferrer">
              <Icon
                name="i-mdi-linkedin"
                class="aspect-square h-6 w-6 origin-center text-white transition-all hover:text-blue-400"
              />
            </NuxtLink>
          </div>
        </div>
        <!-- <div class="flex flex-col gap-1 sm:gap-2">
          <div>
            <h1 class="text-sm font-bold sm:text-base md:text-lg">Petya Veleva</h1>
            <h2 class="text-xs font-bold sm:text-sm md:text-base">CEO</h2>
          </div>
          <h3 class="text-xs sm:text-sm md:text-base">+359 889 527 212</h3>
          <h3 class="text-xs sm:text-sm md:text-base">petya.veleva@digipay.bg</h3>
        </div> -->
      </div>
      <div class="flex flex-1 flex-col items-center sm:items-start">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.5669412862453!2d23.392919812558425!3d42.64933987104727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa86f1b3b8d32f%3A0x6c12373c870fef3c!2sInter%20Expo%20Center!5e0!3m2!1sen!2sbg!4v1720874873644!5m2!1sen!2sbg"
          class="h-[150px] w-full max-w-xs rounded-lg border-0 sm:max-w-sm md:max-w-md lg:max-w-lg"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          zoom-controls="0"
        />
        <h1 class="text-center text-base sm:text-left sm:text-lg md:text-xl">
          Inter Expo Center Sofia, 147, <br />
          Tsarigradsko shose blvd
        </h1>
      </div>
    </div>
    <div class="flex justify-between py-4 sm:py-10">
      <h1 class="text-xs sm:text-sm md:text-base">DIGIPAY 2024 All rights reserved</h1>
      <div class="flex gap-4">
        <NuxtLink
          v-for="social in socials"
          :key="social.link"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            :name="social.name"
            class="aspect-square h-6 w-6 origin-center text-white transition-all hover:text-blue-400"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
