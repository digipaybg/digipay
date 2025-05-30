<template>
  <div class="loading-spinner-overlay">
    <svg
      class="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.loading-spinner-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
}

.spinner {
  animation: rotator 1.4s linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
  stroke: #42b883; /* Vue green, or your primary color */
}

@keyframes colors {
  0% {
    stroke: #42b883; /* Vue green */
  }
  25% {
    stroke: #35495e; /* Vue dark */
  }
  50% {
    stroke: #42b883;
  }
  75% {
    stroke: #35495e;
  }
  100% {
    stroke: #42b883;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
