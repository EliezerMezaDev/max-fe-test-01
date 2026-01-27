<script setup lang="ts">
import { bankingInstituteOptions, getLabel } from "~/assets/data/formSources";

import { formatAmount } from "~/lib/utils";

const { source } = defineProps<{
  source: MXMZ.FinancialInformation;
}>();
</script>

<template>
  <div class="spreadsheet__item text-center font-bold bg-maximiza-gris5">
    Fuente de ingresos del inversionista
  </div>

  <div class="spreadsheet__item flex items-center justify-start">
    <span class="text-[10px]">Relación de dependencia</span>
    <div
      :class="[
        'border px-1 ml-1 font-black',
        source.incomeSource?.includes('dependencia')
          ? 'bg-maximiza-verde1 text-maximiza-blanco1'
          : 'bg-maximiza-error text-maximiza-blanco1',
      ]"
    >
      {{ source.incomeSource?.includes("dependencia") ? "SI" : "NO" }}
    </div>
  </div>

  <table v-if="source.incomeSource?.includes('dependencia')" class="w-full">
    <tbody class="grid grid-cols-[1fr_1fr_1fr]">
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Nombre de la empresa:
          <div class="content">{{ source.companyName }}</div>
        </td>
      </tr>

      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Ramo de la empresa:
          <div class="content">{{ source.companyBranch }}</div>
        </td>
      </tr>

      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Cargo dentro de la empresa:
          <div class="content">{{ source.companyRol }}</div>
        </td>
      </tr>

      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Remuneración:
          <div class="content">
            {{ formatAmount(source.companyRemuneration) }}
          </div>
        </td>
      </tr>

      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Dirección de la empresa:
          <div class="content">{{ source.companyAddress }}</div>
        </td>
      </tr>
      
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Teléfono:
          <div class="content">{{ source.companyPhone }}</div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="spreadsheet__item flex items-center justify-start">
    <span class="text-[10px]">Negocio propio</span>
    <div
      :class="[
        'border px-1 ml-1 font-black',
        source.incomeSource?.includes('propio')
          ? 'bg-maximiza-verde1 text-maximiza-blanco1'
          : 'bg-maximiza-error text-maximiza-blanco1',
      ]"
    >
      {{ source.incomeSource?.includes("propio") ? "SI" : "NO" }}
    </div>
  </div>

  <table v-if="source.incomeSource?.includes('propio')" class="w-full">
    <tbody class="grid grid-cols-[1fr_1fr_1fr]">
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Nombre de la empresa / Negocio:
          <div class="content">{{ source.businessName }}</div>
        </td>
      </tr>
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Dirección fiscal:
          <div class="content">{{ source.businessAddress }}</div>
        </td>
      </tr>
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Ingresos mensuales:
          <div class="content">{{ formatAmount(source.businessIncome) }}</div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="spreadsheet__item flex items-center justify-start">
    <span class="text-[10px]">Otras formas de ingreso</span>
    <div
      :class="[
        'border px-1 ml-1 font-black',
        source.otherIncomeSource
          ? 'bg-maximiza-verde1 text-maximiza-blanco1'
          : 'bg-maximiza-error text-maximiza-blanco1',
      ]"
    >
      {{ source.otherIncomeSource ? "SI" : "NO" }}
    </div>
  </div>

  <table v-if="source.otherIncomeSource" class="w-full">
    <tbody class="grid grid-cols-[1fr_1fr]">
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Actividad generadora de los ingresos:
          <div class="content">{{ source.otherIncomeSource }}</div>
        </td>
      </tr>
      <tr class="spreadsheet__item">
        <td class="spreadsheet__form-item">
          Ingresos mensuales:
          <div class="content">
            {{ formatAmount(source.otherIncomeAmount) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
