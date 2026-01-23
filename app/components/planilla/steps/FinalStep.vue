<script setup lang="ts">
const wizard = usePlanillaWizard();
const pdfContent = ref<HTMLElement | null>(null);
const isGenerating = ref(false);

import { PLANILLA_JURIDICA_MOCK_DATA } from "~/assets/data/planilla_result.mock";
import { getPageStyles } from "~/lib/pdfHelper";

const handleDownload = async () => {
  if (!process.client || !pdfContent.value) return;

  isGenerating.value = true;

  try {
    const styles = getPageStyles();

    const element = pdfContent.value;

    const html = element.innerHTML;

    const response = await $fetch("/api/generate-pdf", {
      method: "POST",
      body: {
        htmlContent: html,
        cssContent: styles,
      },
      responseType: "blob",
    });

    const blob = new Blob([response as BlobPart], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `planilla_maximiza_${wizard.state.value.type}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error PDF:", error);
  } finally {
    isGenerating.value = false;
  }
};

defineExpose({
  validate: () => {},
});
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-12">
    <div class="text-maximiza-verde1 text-6xl mb-6">
      <font-awesome-icon :icon="['far', 'circle-check']" />
    </div>

    <h4 class="text-maximiza-negro1 font-black text-2xl md:text-3xl mb-4">
      ¡El documento está listo!
    </h4>

    <p class="text-maximiza-gris2 text-base md:text-lg mb-8 max-w-md mx-auto">
      Revise la previsualización a continuación y descárguelo para firmarlo.
    </p>

    <button
      @click="handleDownload"
      :disabled="isGenerating"
      class="button-primary mb-12 disabled:opacity-70 disabled:cursor-wait"
    >
      <font-awesome-icon
        :icon="['fas', isGenerating ? 'spinner' : 'download']"
        :spin="isGenerating"
      />
      {{ isGenerating ? "Generando PDF..." : "Descargar Planilla PDF" }}
    </button>

    <div class="overflow-auto">
      <div class="flex justify-center">
        <div ref="pdfContent" class="bg-maximiza-blanco1 w-a4">
          <PlanillaPdfResult :data="wizard.state.value.formData" />
          <!-- <PlanillaPdfResult :data="PLANILLA_JURIDICA_MOCK_DATA" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
