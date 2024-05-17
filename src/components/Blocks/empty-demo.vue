<template>
  <FloatLabelInput v-model="inputValue"
                   label="Large input with float label"/>
</template>

<script setup>
import {ref} from "vue";
const inputValue = ref('');
</script>
