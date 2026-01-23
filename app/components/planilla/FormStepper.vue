<script setup lang="ts">
defineProps<{
  steps: string[];
  currentStep: number;
}>();
</script>

<template>
  <div class="w-full mx-auto px-4 mb-12">
    <div class="md:hidden mb-6">
      <p class="text-maximiza-verde1 font-bold text-sm uppercase mb-2">
        Paso {{ currentStep + 1 }} de {{ steps.length }}
      </p>
      <h3 class="text-maximiza-negro1 font-black text-xl leading-tight">
        {{ steps[currentStep] }}
      </h3>
      <div
        class="w-full bg-maximiza-gris5 h-2 mt-4 rounded-full overflow-hidden"
      >
        <div
          class="bg-maximiza-verde1 h-full transition-all duration-500 ease-in-out"
          :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <div class="hidden md:flex justify-between items-center relative">
      <div
        class="absolute top-1/2 left-0 w-full h-1 bg-maximiza-gris5 -z-10 transform -translate-y-1/2 rounded-full"
      ></div>

      <div
        class="absolute top-1/2 left-0 h-1 bg-maximiza-verde1 -z-0 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
        :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
      ></div>

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex flex-col items-center relative group"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10"
          :class="[
            index <= currentStep
              ? 'bg-maximiza-verde1 border-maximiza-verde1 text-maximiza-blanco1'
              : 'bg-maximiza-gris5 border-maximiza-gris5 text-maximiza-blanco1',
          ]"
        >
          <span v-if="index < currentStep" class="font-bold">✓</span>
          <span v-else class="font-bold text-sm">{{ index + 1 }}</span>
        </div>

        <span
          class="absolute top-12 text-xs font-bold text-center w-32 transition-colors duration-300 uppercase"
          :class="
            index <= currentStep
              ? 'text-maximiza-verde1'
              : 'text-maximiza-gris1'
          "
        >
          {{ step }}
        </span>
      </div>
    </div>
  </div>
</template>
