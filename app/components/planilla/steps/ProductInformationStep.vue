<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { usePlanillaWizard } from "~/composables/usePlanillaWizard";

import {
  productNamesOptions,
  currencyOptions,
  countriesOptions,
  virtualCurrencyOptions,
  motivesOptions,
  fundsSourceOptions,
  fundsDestinationOptions,
  perTransferPurchaseOptions,
  perTransferSaleOptions,
} from "~/assets/data/formSources";

const wizard = usePlanillaWizard();

const schema = yup.object({
  productName: yup.string().required("Requerido"),
  productAmount: yup.string().required("Requerido"),
  currency: yup.string().required("Requerido"),

  monthlyAmount: yup.string().required("Requerido"),
  sendOrReceiveFundsFromAbroad: yup.string().required("Requerido"),

  purchase: yup.string().required("Requerido"),
  sale: yup.string().required("Requerido"),
  originCountry: yup.string().required("Requerido"),
  destinationCountry: yup.string().required("Requerido"),
  virtualCurrencyUse: yup.string().required("Requerido"),

  perTransferPurchase: yup.string().required("Requerido"),
  perTransferSale: yup.string().required("Requerido"),

  motives: yup.string().required("Requerido"),
  fundsSource: yup.string().required("Requerido"),
  fundsDestination: yup.string().required("Requerido"),
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    productName:
      wizard.state.value.formData.productInformation?.productName || "",
    productAmount:
      wizard.state.value.formData.productInformation?.productAmount || "",
    currency:
      wizard.state.value.formData.productInformation?.currency ||
      "BOLIVAR_SOBERANO",

    monthlyAmount:
      wizard.state.value.formData.productInformation?.monthlyAmount || "",

    sendOrReceiveFundsFromAbroad:
      wizard.state.value.formData.productInformation
        ?.sendOrReceiveFundsFromAbroad || "",

    purchase: wizard.state.value.formData.productInformation?.purchase || "",
    sale: wizard.state.value.formData.productInformation?.sale || "",
    originCountry:
      wizard.state.value.formData.productInformation?.originCountry || "",
    destinationCountry:
      wizard.state.value.formData.productInformation?.destinationCountry || "",

    perTransferPurchase:
      wizard.state.value.formData.productInformation?.perTransferPurchase || "",
    perTransferSale:
      wizard.state.value.formData.productInformation?.perTransferSale || "",

    virtualCurrencyUse:
      wizard.state.value.formData.productInformation?.virtualCurrencyUse ||
      "NINGUNA",

    motives: wizard.state.value.formData.productInformation?.motives || "",
    fundsSource:
      wizard.state.value.formData.productInformation?.fundsSource || "",
    fundsDestination:
      wizard.state.value.formData.productInformation?.fundsDestination || "",
  },
});

const [productName] = defineField("productName");
const [productAmount] = defineField("productAmount");
const [currency] = defineField("currency");

const [monthlyAmount] = defineField("monthlyAmount");

const [sendOrReceiveFundsFromAbroad] = defineField(
  "sendOrReceiveFundsFromAbroad",
);

const [purchase] = defineField("purchase");
const [sale] = defineField("sale");
const [originCountry] = defineField("originCountry");
const [destinationCountry] = defineField("destinationCountry");

const [perTransferPurchase] = defineField("perTransferPurchase");
const [perTransferSale] = defineField("perTransferSale");

const [motives] = defineField("motives");
const [fundsSource] = defineField("fundsSource");
const [fundsDestination] = defineField("fundsDestination");

const validate = handleSubmit((values) => {
  wizard.updateFormData({ productInformation: values });

  wizard.nextStep();
});

defineExpose({
  validate,
});
</script>

<template>
  <form class="flex flex-col" @submit.prevent>
    <div>
      <FormTitle
        text="Información del producto o servicio bursátil"
        class="mb-6"
      />
      <FormBaseLayout :style="'grid-cols-1 md:grid-cols-3'">
        <FormBaseSelect
          name="productName"
          label="Nombre del producto"
          v-model="productName"
          :options="productNamesOptions"
          :error-message="errors.productName"
          required
        />

        <FormBaseInput
          name="productAmount"
          label="Monto del producto adquirido (en Bolivares)"
          type="number"
          v-model="productAmount"
          :error-message="errors.productAmount"
          required
        />

        <FormBaseSelect
          name="currency"
          label="Moneda"
          v-model="currency"
          :options="currencyOptions"
          :error-message="errors.currency"
          required
        />
      </FormBaseLayout>
    </div>

    <div>
      <FormTitle text="Información sobre movilización de fondos" class="mb-6" />

      <FormBaseLayout :style="'grid-cols-1 md:grid-cols-3'">
        <FormBaseInput
          name="monthlyAmount"
          label="Monto promedio mensual (en Bolivares)"
          type="number"
          v-model="monthlyAmount"
          :error-message="errors.monthlyAmount"
          required
        />

        <FormBaseSelect
          name="sendOrReceiveFundsFromAbroad"
          label="Enviar o recibir fondos del exterior"
          v-model="sendOrReceiveFundsFromAbroad"
          :options="[
            { value: 'SI', label: 'SI' },
            { value: 'NO', label: 'NO' },
          ]"
          :error-message="errors.sendOrReceiveFundsFromAbroad"
          required
        />

        <FormBaseInput
          name="purchase"
          label="Compra (en Bolivares)"
          v-model="purchase"
          type="number"
          :error-message="errors.purchase"
          required
        />

        <FormBaseInput
          name="sale"
          label="Venta (en Bolivares)"
          type="number"
          v-model="sale"
          :error-message="errors.sale"
          required
        />

        <FormBaseSelect
          name="motives"
          label="Motivos por los que solicita los servicios"
          v-model="motives"
          :options="motivesOptions"
          :error-message="errors.motives"
          required
        />
      </FormBaseLayout>
    </div>

    <div>
      <FormTitle
        text="Número de transacciones por transferencia"
        class="mb-6"
      />

      <FormBaseLayout :style="'grid-cols-1 md:grid-cols-3'">
        <FormBaseSelect
          name="perTransferPurchase"
          label="Compra"
          v-model="perTransferPurchase"
          :options="perTransferPurchaseOptions"
          :error-message="errors.perTransferPurchase"
          required
        />

        <FormBaseSelect
          name="perTransferSale"
          label="Venta"
          v-model="perTransferSale"
          :options="perTransferSaleOptions"
          :error-message="errors.perTransferSale"
          required
        />
      </FormBaseLayout>
    </div>

    <div>
      <FormTitle text="Enviar o recibir fondos del exterior" class="mb-6" />

      <FormBaseLayout :style="'grid-cols-1 md:grid-cols-3'">
        <FormBaseSelect
          name="virtualCurrencyUse"
          label="Uso moneda virtual"
          v-model="virtualCurrencyUse"
          :options="virtualCurrencyOptions"
          :error-message="errors.virtualCurrencyUse"
          required
        />

        <FormBaseSelect
          name="fundsSource"
          label="Origen de los fondos"
          v-model="fundsSource"
          :options="fundsSourceOptions"
          :error-message="errors.fundsSource"
          required
        />

        <FormBaseSelect
          name="fundsDestination"
          label="Destino de los fondos"
          v-model="fundsDestination"
          :options="fundsDestinationOptions"
          :error-message="errors.fundsDestination"
          required
        />
      </FormBaseLayout>
    </div>
  </form>
</template>
