<script setup lang="ts">
import BaseLabel from "./BaseLabel.vue";
import FormError from "./Error.vue";

interface Props {
  modelValue?: string | number;
  name: string;
  label?: string;
  type?: "text" | "email" | "number" | "date" | "password" | "tel";
  placeholder?: string;
  errorMessage?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  modelValue: "",
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="w-full">
    <BaseLabel
      :html-for="name"
      :label="label"
      :required="required"
      :error="errorMessage"
    />

    <input
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      class="w-full px-3 py-2.5 text-maximiza-negro1 bg-white border rounded-sm focus:outline-none focus:ring-1 disabled:bg-maximiza-gris5 disabled:text-gray-500 transition-all duration-200 text-sm"
      :class="[
        errorMessage
          ? 'border-maximiza-error focus:border-maximiza-error focus:ring-maximiza-error bg-maximiza-error/5'
          : 'border-maximiza-gris5 focus:border-maximiza-verde1 focus:ring-maximiza-verde1 placeholder:text-maximiza-negro1/30',
      ]"
    />

    <FormError :error="errorMessage" />
  </div>
</template>
