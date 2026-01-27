<script setup lang="ts">
import {
  getLabel,
  occupationsOptions,
  countriesOptions,
  nationalityOptions,
} from "~/assets/data/formSources";

import { MAXIMIZA_LOGO } from "~/assets/data/maximiza-logo";

const MaximizaLogo = MAXIMIZA_LOGO;

const props = defineProps<{
  data: MXMZ.WizardPlanillaResult;
}>();

const isNatural = computed(() => {
  return !props.data.enterpriseIdentification?.taxInformationRegistration;
});

const personal = computed(() => props.data.personalData || {});
const enterprise = computed(
  () => props.data.enterpriseIdentification || ({} as any),
);
const institution = computed(() => props.data.institutionData || ({} as any));

const dateParts = computed(() => {
  const dateStr = institution.value.productionDate;
  if (!dateStr) return { day: "__", month: "_________", year: "__" };

  const date = new Date(dateStr);
  const day = date.getDate() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const month = months[date.getMonth()];

  return { day, month, year };
});

const textData = computed(() => {
  if (isNatural.value) {
    return {
      name: `${personal.value.firstName} ${personal.value.lastName}`,
      address: personal.value.address,
      id: personal.value.identification,
      profession:
        getLabel(personal.value.profession, occupationsOptions) ||
        "________________",
    };
  } else {
    return {
      repName: personal.value.legalRepresentativeFullname || "________________",
      repAddress: personal.value.address || "________________",
      repId:
        personal.value.legalRepresentativeIdentification || "________________",
      companyName: enterprise.value.socialReason || "________________",
    };
  }
});
</script>

<template>
  <div class="spreadsheet" style="padding: 1rem">
    <div class="page-break-container">
      <header class="spreadsheet__header flex justify-end">
        <img class="spreadsheet__image" :src="MaximizaLogo" alt="logo" />
      </header>

      <div class="spreadsheet__body mt-12 px-4">
        <h2 class="text-center font-bold uppercase text-lg mb-12">
          DECLARACIÓN JURADA DE ORIGEN Y DESTINO DE LOS FONDOS
          <br />
          <span class="text-base font-normal"
            >({{ isNatural ? "Persona Natural" : "Persona Jurídica" }})</span
          >
        </h2>

        <div class="mb-8 font-bold leading-relaxed">
          <p>Señores</p>
          <p>Maximiza Casa de Bolsa, C.A</p>
          <p>Presente.</p>
        </div>

        <div
          v-if="isNatural"
          class="text-justify leading-loose text-sm space-y-6"
        >
          <p>
            Quien suscribe
            <span class="font-bold border-b border-black px-1">{{
              textData.name
            }}</span
            >, venezolano(a), mayor de edad, domiciliado(a) en
            <span class="font-bold border-b border-black px-1">{{
              textData.address
            }}</span>
            y titular de la Cédula de Identidad N°
            <span class="font-bold border-b border-black px-1">{{
              textData.id
            }}</span
            >, Profesión
            <span class="font-bold border-b border-black px-1">{{
              textData.profession
            }}</span
            >, por la presente declaro bajo fe de juramento que el origen de los
            fondos, son de mi peculio y de procedencia de actividades lícitas.
          </p>
          <p>
            Igualmente, declaro bajo fe de juramento no estar relacionado; ni
            pretender involucrar a
            <span class="font-bold">Maximiza Casa de Bolsa, C.A</span> en forma
            alguna, con las actividades ilícitas que puedan servir de
            instrumento para cometer el delito de legitimación de capitales,
            financiamiento al terrorismo, Financiamiento a la Proliferación de
            Armas de Destrucción Masiva y otros Ilícitos.
          </p>
        </div>

        <div v-else class="text-justify leading-loose text-sm space-y-6">
          <p>
            Quien suscribe
            <span class="font-bold border-b border-black px-1">{{
              textData.repName
            }}</span
            >, venezolano(a), mayor de edad, domiciliado(a) en
            <span class="font-bold border-b border-black px-1">{{
              textData.repAddress
            }}</span>
            y titular de la Cédula de Identidad N°
            <span class="font-bold border-b border-black px-1">{{
              textData.repId
            }}</span
            >, actuando en mi carácter de representante legal de la sociedad
            mercantil:
            <span class="font-bold border-b border-black px-1">{{
              textData.companyName
            }}</span
            >, por la presente declaro bajo fe de juramento que el origen de los
            fondos de mi representada, son de su peculio y de procedencia de
            actividades lícitas.
          </p>
          <p>
            Igualmente, declaro bajo fe de juramento no estar relacionado; ni
            pretender involucrar a
            <span class="font-bold">Maximiza Casa de Bolsa, C.A</span> en forma
            alguna, con las actividades ilícitas que puedan servir de
            instrumento para cometer el delito de legitimación de capitales,
            Financiamiento al Terrorismo, Financiamiento a la Proliferación de
            Armas de Destrucción Masiva y otros Ilícitos.
          </p>
        </div>

        <p class="mt-8 text-justify leading-loose text-sm">
          Declaración que hago a los fines consiguientes, en Caracas a los
          <span class="font-bold border-b border-black px-2">{{
            dateParts.day
          }}</span>
          días del mes de
          <span class="font-bold border-b border-black px-2">{{
            dateParts.month
          }}</span>
          de 20<span class="font-bold border-b border-black px-1">{{
            dateParts.year
          }}</span
          >.
        </p>

        <div class="mt-32 flex justify-end items-end gap-8">
          <div class="flex-1 flex flex-col items-center justify-end pb-8">
            <div class="w-full border-b border-black mb-2"></div>
            <span class="text-sm font-bold">Firma</span>
          </div>

          <div
            class="w-32 h-40 border border-black flex flex-col justify-end items-center pb-2 shrink-0"
          >
            <span class="text-[10px] font-bold text-center"
              >Huella Dactilar</span
            >
          </div>
        </div>

        <div class="mt-16 pt-4 text-xs font-bold">
          Nota: esta declaración debe ser impresa en papel con membrete de la
          empresa.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-break-container {
  page-break-after: always;
}

.spreadsheet {
  width: 100%;
  max-width: 100%;
  padding: 2rem 3rem;
}

.spreadsheet__header {
  margin-bottom: 2rem;
}

.spreadsheet__image {
  width: 180px;
}

/* Clases de utilidad para el texto */
.text-justify {
  text-align: justify;
}

.leading-loose {
  line-height: 2;
}

@media print {
  .page-break {
    page-break-before: always;
  }

  .spreadsheet {
    padding: 0;
  }
}
</style>
