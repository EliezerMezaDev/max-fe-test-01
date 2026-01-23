<script setup lang="ts">
import {
  getLabel,
  occupationsOptions,
  economicActivityOptions,
  countriesOptions,
  maritalStatusOptions,
  genderOptions,
  nationalityOptions,
  fundsSourceOptions,
  fundsDestinationOptions,
  currencyOptions,
  productNamesOptions,
  virtualCurrencyOptions,
} from "~/assets/data/formSources";

import { formatAmount, formatDate } from "~/lib/utils";

// Importación de Logos
const MaximizaLogo =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iDQogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIg0KICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIg0KICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCINCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIg0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzIiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjAuMSAoM2JjMmU4MTNmNSwgMjAyMC0wOS0wNykiDQogICBzb2RpcG9kaTpkb2NuYW1lPSJsb2dvLW1heGltaXphLnN2ZyINCiAgIHg9IjBweCINCiAgIHk9IjBweCINCiAgIHZpZXdCb3g9IjAgMCA3NTYuNSAyMzUiDQogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA3NTYuNSAyMzU7Ig0KICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PG1ldGFkYXRhDQogICBpZD0ibWV0YWRhdGE1OCI+PHJkZjpSREY+PGNjOldvcmsNCiAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUNCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzDQogICBpZD0iZGVmczU2IiAvPg0KPHN0eWxlDQogICB0eXBlPSJ0ZXh0L2NzcyINCiAgIGlkPSJzdHlsZTIiPg0KCS5zdDB7ZmlsbDojMkQyRDJEO30NCgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzAwNjU0ODt9DQoJLnN0MntmaWxsOiMyMzFGMjA7fQ0KPC9zdHlsZT4NCjxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgYm9yZGVyb3BhY2l0eT0iMSINCiAgIGdyaWR0b2xlcmFuY2U9IjEwIg0KICAgZ3VpZGV0b2xlcmFuY2U9IjEwIg0KICAgaWQ9Im5hbWVkdmlldzQiDQogICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmcyIg0KICAgaW5rc2NhcGU6Y3g9IjM3Ny4zMjI2Ig0KICAgaW5rc2NhcGU6Y3k9IjExMi4xMzA4MyINCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIg0KICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg2MyINCiAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiDQogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2MDAiDQogICBpbmtzY2FwZTp3aW5kb3cteD0iMCINCiAgIGlua3NjYXBlOndpbmRvdy15PSIwIg0KICAgaW5rc2NhcGU6em9vbT0iMS4yMzg5NTE5Ig0KICAgb2JqZWN0dG9sZXJhbmNlPSIxMCINCiAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgIHNob3dncmlkPSJmYWxzZSINCiAgIGlua3NjYXBlOmRvY3VtZW50LXJvdGF0aW9uPSIwIg0KICAgaW5rc2NhcGU6b2JqZWN0LW5vZGVzPSJmYWxzZSI+DQoJPC9zb2RpcG9kaTpuYW1lZHZpZXc+DQo8Zw0KICAgaWQ9ImcyOSI+DQoJPGcNCiAgIGlkPSJnNyI+DQoJCTxwYXRoDQogICBjbGFzcz0ic3QwIg0KICAgZD0iTTM0NS4zLDE2MS44Yy0zLjIsMC00LjgtMi4zLTQuOC03di00OC43YzAtNi4xLTIuMy0xMC43LTYuOS0xNGMtNC42LTMuMy0xMS4yLTUtMTkuNi01Yy0xLDAtMS45LDAtMi45LDAuMSAgICBsLTExLjksMTAuNGMzLTEuMiw2LjQtMS44LDEwLjItMS44YzQuNSwwLDguMSwxLjEsMTAuOCwzLjNjMi44LDIuMiw0LjEsNSw0LjEsOC41YzAsMy0wLjgsNS4zLTIuNSw3Yy0xLjYsMS43LTQuNCwzLjItOC4zLDQuNCAgICBjLTkuMywyLjgtMTUuMyw0LjctMTcuOSw1LjdjLTIuNiwxLTUuNCwyLjUtOC40LDQuNGMtNi43LDQuNC0xMC4xLDExLjEtMTAuMSwyMGMwLDcuNSwyLjQsMTMuNSw3LjEsMTcuOSAgICBjMy44LDMuNyw4LjksNS41LDE1LjIsNS41YzYuMSwwLDExLjYtMS40LDE2LjQtNC4yYzIuNy0xLjYsNS43LTQuMyw5LTguMmMxLDQuNiwyLjUsNy45LDQuNiw5LjdjMiwxLjgsNSwyLjgsOSwyLjggICAgYzMuOCwwLDcuOS0xLjQsMTIuMS00LjF2LTkuMUMzNDguMywxNjAuOSwzNDYuNSwxNjEuOCwzNDUuMywxNjEuOHogTTMyNC40LDE0My40YzAsMy44LTEuMSw3LjMtMy40LDEwLjYgICAgYy0zLjYsNS4yLTguNSw3LjgtMTQuOCw3LjhjLTQsMC03LjMtMS4zLTkuNy00Yy0yLjQtMi42LTMuNy02LjEtMy43LTEwLjVjMC0zLjgsMS4xLTcuMywzLjMtMTAuNGMyLjItMy4xLDYtNS43LDExLjYtNy44ICAgIGM3LjItMi43LDExLjItNC4zLDEyLjItNC43YzEtMC40LDIuNC0xLjIsNC41LTIuM1YxNDMuNHoiDQogICBpZD0icGF0aDUiIC8+DQoJPC9nPg0KCTxwYXRoDQogICBjbGFzcz0ic3QwIg0KICAgZD0iTTM3OS41LDEzMC43bC0yMi4xLTM3LjJjLTEtMS44LTItMy4zLTMtNC41SDM3NGMwLjQsMS4zLDEuMSwyLjgsMi4xLDQuNWwxNS4yLDI1bDE3LjEtMjUgICBjMS4yLTEuOSwyLTMuNCwyLjMtNC41aDkuOGMtMS42LDItMi43LDMuNS0zLjQsNC41TDM5NS40LDEyNmwyNCw0MC40YzAuNywxLjIsMS43LDIuNywzLjEsNC41aC0xOS44YzAtMS4xLTAuNy0yLjYtMS44LTQuNSAgIGwtMTctMjguNGwtMTkuNCwyOC40Yy0wLjYsMC45LTEuNCwyLjQtMi42LDQuNWgtOS43YzAuOC0wLjksMi0yLjQsMy41LTQuNUwzNzkuNSwxMzAuN3oiDQogICBpZD0icGF0aDkiIC8+DQoJPHBhdGgNCiAgIGNsYXNzPSJzdDAiDQogICBkPSJNNDI3LjksODloMTcuM2MtMC40LDEuNi0wLjYsMy4zLTAuNiw1LjF2NzEuOGMwLDEuNywwLjIsMy40LDAuNiw1LjFoLTE3LjNjMC40LTEuNSwwLjYtMy4yLDAuNi01LjFWOTQuMSAgIEM0MjguNSw5Mi4yLDQyOC4zLDkwLjUsNDI3LjksODl6Ig0KICAgaWQ9InBhdGgxMSIgLz4NCgk8cGF0aA0KICAgY2xhc3M9InN0MCINCiAgIGQ9Ik00NzMuNSw5OC40YzUuOS03LjUsMTMuOC0xMS4zLDIzLjQtMTEuM2M1LjQsMCw5LjgsMC45LDEzLjMsMi43YzMuNSwxLjgsNi40LDQuNyw4LjgsOC42ICAgYzMuOS00LjEsNy44LTcuMSwxMS41LTguOGMzLjctMS43LDguMi0yLjUsMTMuNC0yLjVjMTUuOCwwLDIzLjcsNy43LDIzLjcsMjN2NTUuOGMwLDEuOCwwLjIsMy41LDAuNiw1LjFINTUxICAgYzAuNC0xLjYsMC42LTMuMywwLjYtNS4xdi01My4xYzAtNC40LTAuNy03LjYtMi4yLTkuNmMtMi4xLTMuMS02LTQuNi0xMS43LTQuNmMtNS40LDAtOS42LDEuNC0xMi42LDQuMmMtMywyLjgtNC41LDYuOC00LjUsMTEuOSAgIHY1MS4zYzAsMS45LDAuMiwzLjYsMC42LDUuMWgtMTcuM2MwLjQtMS41LDAuNi0zLjIsMC42LTUuMXYtNTMuMWMwLTQuNC0wLjgtNy41LTIuMy05LjVjLTIuNC0zLjEtNi4yLTQuNy0xMS40LTQuNyAgIGMtNS4xLDAtOS4yLDEuNC0xMi40LDQuMWMtMy4xLDIuNy00LjcsNi4zLTQuNywxMC44djUyLjVjMCwxLjgsMC4yLDMuNSwwLjYsNS4xaC0xNy4zYzAuNC0xLjYsMC42LTMuMywwLjYtNS4xVjk0ICAgYzAtMS45LTAuMi0zLjYtMC42LTVoMTYuNFY5OC40eiINCiAgIGlkPSJwYXRoMTMiIC8+DQoJPHBhdGgNCiAgIGNsYXNzPSJzdDAiDQogICBkPSJNNTc5LjIsODloMTcuM2MtMC40LDEuNi0wLjYsMy4zLTAuNiw1LjF2NzEuOGMwLDEuNywwLjIsMy40LDAuNiw1LjFoLTE3LjNjMC40LTEuNSwwLjYtMy4yLDAuNi01LjFWOTQuMSAgIEM1NzkuOCw5Mi4yLDU3OS42LDkwLjUsNTc5LjIsODl6Ig0KICAgaWQ9InBhdGgxNSIgLz4NCgk8cGF0aA0KICAgY2xhc3M9InN0MCINCiAgIGQ9Ik02MDYuNywxNzF2LTguM2w0OS02NS43aC00Mi4xYy0yLDAtNC4xLDAuMi02LjMsMC43Vjg5aDY3LjN2OC4ybC00OC44LDY1LjZoNDIuOGMyLDAsMy45LTAuMiw2LTAuNnY4LjdINjA2LjcgICB6Ig0KICAgaWQ9InBhdGgxNyIgLz4NCgk8cGF0aA0KICAgY2xhc3M9InN0MCINCiAgIGQ9Ik03MjIuOSwxNTkuOWMtMy4zLDMuOS02LjMsNi42LTksOC4yYy00LjgsMi44LTEwLjMsNC4yLTE2LjUsNC4yYy02LjMsMC0xMS40LTEuOS0xNS4yLTUuNSAgIGMtNC43LTQuNS03LjEtMTAuNC03LjEtMTcuOWMwLTguOSwzLjMtMTUuNiwxMC4xLTIwYzMtMS45LDUuOC0zLjQsOC40LTQuNGMyLjYtMSw4LjYtMi45LDE3LjktNS43YzMuOS0xLjIsNi43LTIuNiw4LjMtNC40ICAgYzEuNi0xLjcsMi41LTQuMSwyLjUtN2MwLTMuNS0xLjQtNi4zLTQuMi04LjVjLTIuOC0yLjItNi40LTMuMy0xMC44LTMuM2MtMy44LDAtNy4zLDAuNi0xMC4zLDEuOWMtMywxLjItNi43LDMuNS0xMSw2LjlsLTIuNi0xMC40ICAgYzUuNi0yLjYsMTAuNC00LjQsMTQuNC01LjRjNC0xLDguNy0xLjUsMTQtMS41YzguNSwwLDE1LDEuNywxOS42LDVjNC42LDMuMyw2LjksOCw2LjksMTR2NDguN2MwLDQuNywxLjYsNyw0LjgsNyAgIGMxLjMsMCwzLTAuOCw1LjMtMi41djkuMWMtNC4yLDIuNy04LjMsNC4xLTEyLjEsNC4xYy00LDAtNy0wLjktOS0yLjhDNzI1LjUsMTY3LjgsNzIzLjksMTY0LjYsNzIyLjksMTU5Ljl6IE03MjIuNCwxMjIuMSAgIGMtMi4xLDEuMS0zLjUsMS45LTQuNSwyLjNjLTEsMC40LTUsMi0xMi4yLDQuN2MtNS42LDIuMS05LjQsNC43LTExLjYsNy44Yy0yLjIsMy4yLTMuMyw2LjctMy4zLDEwLjRjMCw0LjQsMS4yLDcuOCwzLjYsMTAuNSAgIGMyLjQsMi42LDUuNyw0LDkuNyw0YzYuMywwLDExLjItMi42LDE0LjgtNy44YzIuMy0zLjMsMy40LTYuOCwzLjQtMTAuNlYxMjIuMXoiDQogICBpZD0icGF0aDE5IiAvPg0KCTxnDQogICBpZD0iZzI3Ij4NCgkJPGcNCiAgIGlkPSJnMjMiPg0KCQkJPHBhdGgNCiAgIGNsYXNzPSJzdDEiDQogICBkPSJNNSwyMDQuNEwxODAuNyw2MWM4LjItNi4xLDIyLjItMTYuMywzMS41LTYuNGMxMS42LDEzLTkuNiwzMS43LTE2LjIsMzkuOGwtMy4xLDMuNmw3Ni41LTYyICAgICBjNS41LTMuOCwxMC45LTksMTcuMi00LjhjOS41LDYuMywwLjgsMTktMy4xLDI1LjJsLTMwLDQyLjhsLTE3LDIwLjhsNzYuOS01Mi40bDg1LjMtNTIuOGwwLjksMS40YzAsMC0xODEuMiwxMzcuNi0xOTEuNiwxNDEuMyAgICAgYy03LjQsMi40LTEzLjItNC40LTEwLjMtMTEuM2MyLjktNy42LDQ3LjQtNjcuMyw0Ny40LTY3LjNsLTI0LjksMTkuOWwtOTcuNiw4Ni40Yy01LjUsNC4yLTEzLjIsNS42LTE4LjcsMC4xICAgICBjLTQuOC01LjUtMi42LTExLjcsMC41LTE4bDE1LjItMTkuMmw3LjYtOS4xTDI1LDIyNi43Yy02LjIsNS41LTE1LjgsNC45LTIxLjMtMS4zQy0xLjcsMjE5LjItMS4xLDIwOS45LDUsMjA0LjR6Ig0KICAgaWQ9InBhdGgyMSIgLz4NCgkJPC9nPg0KCQk8cGF0aA0KICAgY2xhc3M9InN0MSINCiAgIGQ9Ik0zNjcsMTcuNWMxMC42LTEuNSwyOC42LTcsNTQuMy0xNy4yYy0zLjcsNy43LTgsMTQuNy04LjcsMjIuOUM0MDYuNCwxOC4zLDM4Mi45LDE4LjcsMzY3LDE3LjV6Ig0KICAgaWQ9InBhdGgyNSIgLz4NCgk8L2c+DQo8L2c+DQoNCjwvc3ZnPg0K";

const props = defineProps<{
  data: MXMZ.WizardPlanillaResult;
}>();

const isNatural = computed(() => {
  return !props.data.enterpriseIdentification?.taxInformationRegistration;
});

const fillArray = (arr: any[], max: number, defaultObj: any) => {
  const current = arr || [];
  const emptyCount = Math.max(0, max - current.length);
  return [...current, ...Array(emptyCount).fill(defaultObj)];
};

// Data Helpers
const personal = computed<MXMZ.PersonalData>(
  () => props.data.personalData || ({} as MXMZ.PersonalData),
);
const enterprise = computed(
  () => props.data.enterpriseIdentification || ({} as any),
);
const pep = computed<MXMZ.PepProfile>(
  () => props.data.pepProfile || ({} as MXMZ.PepProfile),
);
const financial = computed<MXMZ.FinancialInformation>(
  () => props.data.financialInformation || ({} as MXMZ.FinancialInformation),
);
const product = computed<MXMZ.ProductInformation>(
  () => props.data.productInformation || ({} as MXMZ.ProductInformation),
);
const institutionData = computed<MXMZ.InstitutionData>(
  () => props.data.institutionData || ({} as MXMZ.InstitutionData),
);

// Labels Computed
const professionLabel = computed(() =>
  getLabel(personal.value.profession, occupationsOptions),
);
const economicActivityLabel = computed(() => {
  const code = isNatural.value
    ? financial.value.economicActivity
    : enterprise.value.economicActivity;
  return getLabel(code, economicActivityOptions);
});
const nationalityLabel = computed(() =>
  getLabel(personal.value.nationality, nationalityOptions),
);
const genderLabel = computed(() =>
  getLabel(personal.value.gender, genderOptions),
);
const maritalStatusLabel = computed(() =>
  getLabel(personal.value.maritalStatus, maritalStatusOptions),
);
const productNameLabel = computed(() =>
  getLabel(product.value.productName, productNamesOptions),
);
const currencyLabel = computed(() =>
  getLabel(product.value.currency, currencyOptions),
);
const fundsSourceLabel = computed(() =>
  getLabel(product.value.fundsSource, fundsSourceOptions),
);
const fundsDestinationLabel = computed(() =>
  getLabel(product.value.fundsDestination, fundsDestinationOptions),
);
const virtualCurrencyLabel = computed(() =>
  getLabel(product.value.virtualCurrencyUse, virtualCurrencyOptions),
);
const originCountryLabel = computed(() =>
  getLabel(product.value.originCountry, countriesOptions),
);
const destinationCountryLabel = computed(() =>
  getLabel(product.value.destinationCountry, countriesOptions),
);

onMounted(() => {
  if (process.client) {
    console.group("📋 PDF JURIDICA MOCK DATA");
    console.log(JSON.stringify(props.data, null, 2));
    console.groupEnd();
  }
});
</script>

<template>
  <div class="spreadsheet">
    <div class="page-break-container">
      <header class="spreadsheet__header">
        <img class="spreadsheet__image" :src="MaximizaLogo" alt="logo" />
        <h5 class="spreadsheet__main-title">
          FICHA DE IDENTIFICACIÓN DEL INVERSIONISTA PERSONA
          {{ isNatural ? "NATURAL" : "JURÍDICA" }}
        </h5>
      </header>

      <div class="spreadsheet__section">
        <div class="spreadsheet__container">
          <div class="spreadsheet__section1">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Lugar:</div>
                <div class="content">
                  {{ institutionData.place || "Caracas" }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Fechas de elaboración:</div>
                <div class="content">
                  {{ formatDate(institutionData.productionDate) }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Número o código del inversionista:</div>
                <div class="content">NN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          DATOS DE LA INSTITUCIÓN DEL SECTOR VALORES
        </h5>
        <div class="spreadsheet__container">
          <div class="spreadsheet__section2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>
                  Nombre de casa de bolsa o sociedades de corretaje de valores:
                </div>
                <div class="content">
                  {{ institutionData.brokerageHouseName }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Registro información fiscal:</div>
                <div class="content">
                  {{ institutionData.taxInformationRegistration }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Dirección:</div>
                <div class="content">
                  {{ institutionData.address }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          {{
            isNatural
              ? "DATOS PERSONALES DEL INVERSIONISTA"
              : "DATOS DE IDENTIFICACIÓN DE LA EMPRESA"
          }}
        </h5>

        <template v-if="isNatural">
          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Documento de Identidad:</div>
                <div class="content">{{ personal.identification }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>R.I.F.:</div>
                <div class="content">{{ personal.identification }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Nombres:</div>
                <div class="content">{{ personal.firstName }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Apellidos:</div>
                <div class="content">{{ personal.lastName }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Lugar y Fecha de Nacimiento:</div>
                <div class="content">
                  {{ personal.birthPlace }} / {{ personal.birthDate }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Nacionalidad:</div>
                <div class="content">{{ nationalityLabel }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Otra Nacionalidad:</div>
                <div class="content">{{ personal.otherNationality }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Género:</div>
                <div class="content">{{ genderLabel }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Profesión u Oficio:</div>
                <div class="content text-[10px]">{{ professionLabel }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Estado civil:</div>
                <div class="content">{{ maritalStatusLabel }}</div>
              </div>
            </div>
          </div>
          <div
            v-if="personal.spouseName && personal.spouseIdentification"
            class="grid grid-cols-2"
          >
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Nombre completo del cónyuge:</div>
                <div class="content">{{ personal.spouseName }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Documento de identidad del cónyuge:</div>
                <div class="content">{{ personal.spouseIdentification }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Dirección de domicilio:</div>
                <div class="content">{{ personal.address }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Teléfono:</div>
                <div class="content">{{ personal.phones }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Correo electrónico:</div>
                <div class="content">{{ personal.email }}</div>
              </div>
            </div>
          </div>

          <PlanillaPdfPepBlock :source="pep" />

          <div
            v-if="personal.hasLegalRepresentative"
            class="spreadsheet__item font-bold bg-maximiza-gris5 text-[10px]"
          >
            En caso de actuación de representante legal, apoderado y/o
            autorizado
          </div>
          <div
            v-if="personal.hasLegalRepresentative"
            class="grid grid-cols-[2fr_1fr_2fr]"
          >
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Nombre completo:</div>
                <div class="content">
                  {{ personal.legalRepresentativeFullname }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Documento de identidad:</div>
                <div class="content">
                  {{ personal.legalRepresentativeIdentification }}
                </div>
              </div>
            </div>

            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Fecha y lugar de de nacimiento:</div>
                <div class="content">
                  {{ formatDate(personal.legalRepresentativeBirthDate) }},
                  {{
                    getLabel(
                      personal.legalRepresentativeBirthPlace,
                      countriesOptions,
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-[auto_1fr_1fr]">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Registro de información fiscal:</div>
                <div class="content">
                  {{ enterprise.taxType }}-{{
                    enterprise.taxInformationRegistration
                  }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Razón Social:</div>
                <div class="content">{{ enterprise.socialReason }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Nombre Comercial:</div>
                <div class="content">{{ enterprise.tradename }}</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Actividad económica:</div>
                <div class="content text-[10px]">
                  {{ economicActivityLabel }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Actividad específica:</div>
                <div class="content">{{ enterprise.specificActivity }}</div>
              </div>
            </div>
          </div>

          <div class="w-full grid grid-cols-[85px_1fr]">
            <aside
              class="bg-maximiza-verde1 min-h-[80px] flex justify-center items-center"
            >
              <h5 class="text-maximiza-blanco1 font-bold">
                Datos del registro
              </h5>
            </aside>
            <div>
              <div class="grid grid-cols-[1fr_1fr_1fr_1fr]">
                <div class="spreadsheet__item col-span-3">
                  <div class="spreadsheet__form-item">
                    <div>Nombre del registro:</div>
                    <div class="content">
                      {{ enterprise.registerData?.recordName }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Fecha:</div>
                    <div class="content">
                      {{ formatDate(enterprise.registerData?.date) }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Número:</div>
                    <div class="content">
                      {{ enterprise.registerData?.number }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Tomo:</div>
                    <div class="content">
                      {{ enterprise.registerData?.took }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Folio:</div>
                    <div class="content">
                      {{ enterprise.registerData?.fol }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Capital social:</div>
                    <div class="content">
                      {{ formatAmount(enterprise.registerData?.socialCapital) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full grid grid-cols-[85px_1fr]">
            <aside
              class="bg-maximiza-verde1 min-h-[80px] flex justify-center items-center"
            >
              <h5 class="text-maximiza-blanco1 font-bold">
                Última modificación
              </h5>
            </aside>
            <div>
              <div class="grid grid-cols-[1fr_1fr_1fr_1fr]">
                <div class="spreadsheet__item col-span-3">
                  <div class="spreadsheet__form-item">
                    <div>Nombre del registro:</div>
                    <div class="content">
                      {{ enterprise.lastModification?.recordName }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Fecha de modificación:</div>
                    <div class="content">
                      {{ formatDate(enterprise.lastModification?.date) }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Número:</div>
                    <div class="content">
                      {{ enterprise.lastModification?.number }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Tomo:</div>
                    <div class="content">
                      {{ enterprise.lastModification?.took }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Folio:</div>
                    <div class="content">
                      {{ enterprise.lastModification?.fol }}
                    </div>
                  </div>
                </div>

                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Capital social:</div>
                    <div class="content">
                      {{
                        formatAmount(enterprise.lastModification?.socialCapital)
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full grid grid-cols-[85px_1fr]">
            <aside
              class="bg-maximiza-verde1 min-h-[80px] flex justify-center items-center"
            >
              <h5 class="text-maximiza-blanco1 font-bold">Entes públicos</h5>
            </aside>
            <div>
              <div class="grid grid-cols-[1fr_1fr]">
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Número de gaceta oficial:</div>
                    <div class="content">
                      {{ enterprise.officialGazetteNumber }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Fecha:</div>
                    <div class="content">
                      {{ formatDate(enterprise.publicEntitiesDate) }}
                    </div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Autoridad / Ente de adscripción:</div>
                    <div class="content">{{ enterprise.authority }}</div>
                  </div>
                </div>
                <div class="spreadsheet__item">
                  <div class="spreadsheet__form-item">
                    <div>Código ONT:</div>
                    <div class="content">{{ enterprise.ontCode }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-[1fr_2fr_2fr]">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Teléfono:</div>
                <div class="content">{{ enterprise.publicPhones }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Sitio Web:</div>
                <div class="content">{{ enterprise.website }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Correo electrónico:</div>
                <div class="content">{{ enterprise.publicEntityEmail }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Dirección:</div>
                <div class="content">{{ enterprise.publicEntityAddress }}</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-[1fr_2fr_2fr]">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Teléfono alternativo:</div>
                <div class="content">{{ enterprise.publicPhones2 }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Sitio Web alternativo:</div>
                <div class="content">{{ enterprise.website2 }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Correo electrónico alternativo:</div>
                <div class="content">{{ enterprise.publicEntityEmail2 }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="spreadsheet__section">
        <template v-if="!isNatural">
          <h5 class="spreadsheet__title">
            INFORMACIÓN ECONÓMICO FINANCIERA DE LA EMPRESA
          </h5>
          <PlanillaPdfStockholdersBlock :source="financial.stockholders" />
          <PlanillaPdfLegalRepresentativesBlock
            :source="financial.legalRepresentatives"
          />
        </template>

        <template v-else>
          <h5 class="spreadsheet__title">REFERENCIAS DEL INVERSIONISTA</h5>
          <PlanillaPdfBankReferencesBlock :source="financial.bankReferences" />
        </template>
      </div>

      <div v-if="isNatural" class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          INFORMACIÓN ECONÓMICO FINANCIERA DEL INVERSIONISTA
        </h5>
        <div class="grid grid-cols-2">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Actividad económica:</div>
              <div class="content text-[10px]">{{ economicActivityLabel }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Actividad específica:</div>
              <div class="content">{{ financial.specificActivity }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-break">
      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          INFORMACIÓN ECONÓMICO FINANCIERA
          {{ isNatural ? "DEL INVERSIONISTA" : "DE LA EMPRESA" }} (CONT)
        </h5>

        <template v-if="isNatural">
          <PlanillaPdfIncomeSourceBlock :source="financial" />
        </template>

        <template v-else>
          <PlanillaPdfPepBlock
            :source="pep"
            :stockholders="financial.stockholders"
          />

          <div class="grid grid-cols-3">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>N° de subsidiarias / Oficinas:</div>
                <div class="content">
                  {{ enterprise.officesNumber || "N/A" }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>País con mayor presencia:</div>
                <div class="content">
                  {{
                    getLabel(
                      enterprise.countryLargestPresence,
                      countriesOptions,
                    )
                  }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>N° de empleados:</div>
                <div class="content">
                  {{ enterprise.employeesNumber || "N/A" }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Ventas mensuales:</div>
                <div class="content">
                  {{ formatAmount(financial.monthlySales) }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Ingresos mensuales:</div>
                <div class="content">
                  {{ formatAmount(financial.monthlyIncome) }}
                </div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Egresos mensuales:</div>
                <div class="content">
                  {{ formatAmount(financial.monthlyExpenses) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="spreadsheet__item font-bold bg-maximiza-gris5 text-[10px]"
          >
            Última declaración ISLR:
          </div>
          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Año:</div>
                <div class="content">{{ financial.islrYear }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>Monto:</div>
                <div class="content">
                  {{ formatAmount(financial.islrAmount) }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2">
            <PlanillaPdfProvidersBlock :source="financial.providers" />
            <PlanillaPdfClientsBlock :source="financial.clients" />
          </div>

          <PlanillaPdfRelatedCompaniesBlock
            :source="financial.relatedCompanies"
          />

          <PlanillaPdfBankReferencesBlock :source="financial.bankReferences" />
        </template>
      </div>

      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          INFORMACIÓN DEL PRODUCTO O SERVICIO BURSATIL
        </h5>
        <div class="grid grid-cols-3">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Nombre del producto:</div>
              <div class="content text-[10px]">{{ productNameLabel }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Monto del producto adquirido:</div>
              <div class="content">
                {{ formatAmount(product.productAmount) }}
              </div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Moneda:</div>
              <div class="content">{{ currencyLabel }}</div>
            </div>
          </div>
        </div>
        <div class="spreadsheet__item font-bold bg-maximiza-gris5 text-[10px]">
          Información sobre movilización de fondos
        </div>
        <div class="grid grid-cols-2">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Monto promedio mensual:</div>
              <div class="content">
                {{ formatAmount(product.monthlyAmount) }}
              </div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>N° transacciones por transferencias:</div>
              <div class="content">
                {{ product.numberOfTransactionsByTransfers }}
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Enviar o recibir fondos del exterior:</div>
              <div class="content">
                {{ product.sendOrReceiveFundsFromAbroad }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>País origen:</div>
                <div class="content">{{ originCountryLabel }}</div>
              </div>
            </div>
            <div class="spreadsheet__item">
              <div class="spreadsheet__form-item">
                <div>País destino:</div>
                <div class="content">{{ destinationCountryLabel }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Compra:</div>
              <div class="content">{{ formatAmount(product.purchase) }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Venta:</div>
              <div class="content">{{ formatAmount(product.sale) }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Uso moneda virtual:</div>
              <div class="content">{{ virtualCurrencyLabel }}</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Motivos por los cuales solicita los servicios:</div>
              <div class="content">{{ product.motives }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Origen de los fondos:</div>
              <div class="content text-[10px]">{{ fundsSourceLabel }}</div>
            </div>
          </div>
          <div class="spreadsheet__item">
            <div class="spreadsheet__form-item">
              <div>Destino de los fondos:</div>
              <div class="content text-[10px]">{{ fundsDestinationLabel }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-break">
      <div class="spreadsheet__section" style="border-width: 2px">
        <h5 class="spreadsheet__title">
          ACEPTACIÓN DEL CONTRATO DE CUENTA DE CORRETAJE BURSÁTIL POR PARTE DEL
          INVERSOR
        </h5>
        <div class="p-2">
          <p
            class="spreadsheet__contract text-justify text-[9px] leading-tight"
          >
            Con la firma del presente documento, el cliente expresamente
            conviene y acepta que las operaciones financieras y bursátiles
            celebradas entre Maximiza y el cliente se regirán por el contrato de
            cuenta corretaje bursátil, del cual el presente anexo forma parte
            integrante, y cual fue autenticado por ante la Notaría Pública sexta
            del Municipio Chacao del estado Miranda, el 26 de Enero del 2007,
            bajo el N°56, tomo 10, de los libros de autenticación llevados por
            esa notaría, así mismo, el cliente declara haber leído y comprendido
            las operaciones objeto de los contratos que integran la cuenta de
            corretaje bursátil. De conformidad con lo establecido en las normas
            relativas a la administración y fiscalización de los riesgos
            relacionados con los delitos de legitimación de los capitales,
            financiamiento al terrorismo, financiamiento de la proliferación de
            armas de destrucción masiva y otros ilícitos, aplicables a los
            sujetos regulados por la Superintendencia Nacional de Valores, por
            lo que el (los) inversor(es) declara(n) bajo fe de juramento que los
            dineros, capitales y haberes, valores o títulos utilizados en las
            operaciones, no guardan relación con actividades provenientes del
            delito de legitimación de capitales u otros delitos previstos y
            sancionados en la ley orgánica contra la delincuencia organizada y
            financiamiento al terrorismo. Así mismo, el inversor expresamente
            declara que la información suministrada es cierta y completa y que
            refleja con exactitud la realidad legal y financiera del cliente y,
            autoriza suficientemente a Maximiza Casa de Bolsa, C.A., para que
            verifique los datos aportados y que han sido vertidos en esta
            planilla, señalados en la providencia N°209 y las demás
            disposiciones que tutelan esta materia.
          </p>
        </div>
      </div>

      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">DECLARACIÓN JURADA</h5>
        <div class="p-2 text-[10px]">
          <p class="font-bold mb-1">Quién suscribe declara:</p>
          <ol class="list-decimal pl-4">
            <li class="text-start">
              Que los datos suministrados son verdaderos y autoriza a la
              institución del sector valores a verificar dicha información.
            </li>
            <li class="text-start">
              Que los fondos utilizados tienen origen y destino lícitos, según
              lo previsto y sancionado en el ordenamiento jurídico vigente en la
              República Bolivariana de Venezuela.
            </li>
            <li class="text-start">
              Que notificará de inmediato cuando se produzcan cambios en los
              datos personales y/o en movimiento de fondos reportados.
            </li>
          </ol>
        </div>
      </div>

      <div class="spreadsheet__section" style="border-width: 2px">
        <div class="grid grid-cols-4">
          <div class="spreadsheet__sign-item">
            <div>Preparado por:</div>
            <div class="mt-8 border-t border-maximiza-negro1 text-[8px]">
              Nombre y apellido:
            </div>
          </div>
          <div class="spreadsheet__sign-item">
            <div>Verificado oficial de cumplimiento:</div>
            <div class="mt-8 border-t border-maximiza-negro1 text-[8px]">
              Nombre y apellido:
            </div>
          </div>
          <div class="spreadsheet__sign-item">
            <div>Firma del inversionista:</div>
            <div class="mt-8 border-t border-maximiza-negro1 text-[8px]">
              Nombre y apellido:
            </div>
          </div>
          <div class="spreadsheet__sign-item">
            <div>Huella dactilar:</div>
          </div>
        </div>
      </div>

      <div class="spreadsheet__section">
        <h5 class="spreadsheet__title">
          PARA USO INTERNO DE MAXIMIZA CASA DE BOLSA
        </h5>
        <div class="p-2 text-[10px]">
          <ol v-if="isNatural" class="list-decimal pl-4">
            <li class="text-start">Copia de la Cédula de identidad.</li>
            <li class="text-start">
              Copia del Registro de información Fiscal (R.I.F).
            </li>
            <li class="text-start">
              Referencia bancaria denominada en moneda nacional.
            </li>
            <li class="text-start">Constancia de trabajo.</li>
            <li class="text-start">Informe de atestiguamiento de ingresos.</li>
            <li class="text-start">
              Declaración jurada cada vez que realice una operación.
            </li>
            <li class="text-start">Otros.</li>
          </ol>
          <ol v-else class="list-decimal pl-4">
            <li class="text-start">
              Copia del Registro de información Fiscal (R.I.F) de la empresa.
            </li>
            <li class="text-start">
              Copia de la Cédula de identidad y del R.I.F del (los)
              representante legal (es) de la empresa.
            </li>
            <li class="text-start">
              Copia del Documento constitutivo y las modificaciones
              estatutarias.
            </li>
            <li class="text-start">
              Referencia bancaria denominada en moneda nacional.
            </li>
            <li class="text-start">Balance general actualizado.</li>
            <li class="text-start">
              Declaración jurada cada vez que realice una operación.
            </li>
            <li class="text-start">Otros.</li>
          </ol>
        </div>
      </div>

      <div class="spreadsheet__section">
        <div class="p-2 text-[10px] italic">
          El Ejecutivo de Cuentas declara haberse entrevistado con el cliente,
          Quien firmó esta planilla en su presencia
        </div>
        <div
          class="grid grid-cols-[1.5fr_1.5fr_1.5fr_0.5fr] border-t border-[#006548]"
        >
          <div class="spreadsheet__item border-r-0 min-h-[4rem]">
            Fecha de recepcion ejecutivo:
          </div>
          <div class="spreadsheet__item border-r-0 min-h-[4rem]">
            Nombre del ejecutivo de cuentas:
          </div>
          <div class="spreadsheet__item border-r-0 min-h-[4rem]">
            Firma del ejecutivo de cuentas:
          </div>
          <div class="spreadsheet__item min-h-[4rem]">Pag</div>
        </div>
      </div>

      <span class="copy">Maximiza Casa de Bolsa. R.I.F. Nro. J-30025492-5</span>
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
  padding: 1rem;
}

.spreadsheet__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.spreadsheet__image {
  width: 180px;
}

.spreadsheet__main-title {
  text-transform: uppercase;
  text-wrap: balance;
  max-width: 60%;
  text-align: left;
  border-left: 4px solid #006548;
  font-weight: 700;
  padding-left: 1rem;
  font-size: 1.1rem;
  line-height: 1.2;
}

.spreadsheet__section {
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  font-size: 11px;
  border: 1px solid #006548;
  overflow: hidden;
}

.spreadsheet__title {
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.75rem;
  background: #006548;
  padding: 0.3rem;
  color: white;
  font-weight: bold;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
}

.spreadsheet__container {
  display: grid;
}

.spreadsheet__form-item {
  display: flex;
  flex-direction: column;

  gap: 0.1rem;

  div.content {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    min-height: 1rem;
  }

  * {
    text-align: left;
  }
}

.spreadsheet__item {
  border: 1px solid #006548;
  padding: 0.2rem 0.5rem;

  &.border-r-0 {
    border-right: none;
  }
}

.spreadsheet__section1 {
  display: flex;
  width: 100%;

  .spreadsheet__item {
    flex: 1;
  }
}

.spreadsheet__section2 {
  display: grid;
  grid-template-columns: 1fr 30%;
  border-radius: 1rem;

  .spreadsheet__item:last-child {
    grid-column: span 2;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}

.spreadsheet__sign-item {
  border: 1px solid #006548;
  padding: 0.25rem;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.7rem;
}

.copy {
  display: block;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  color: #666;
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
