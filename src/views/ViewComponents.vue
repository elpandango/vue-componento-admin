<template>
  <div class="notes">

    <progress
        v-if="!storeComponents.componentsLoaded"
        class="progress is-large is-success"
        max="100"/>

    <template v-else>
      <CustomComponent
          v-for="component in storeComponents.components"
          :key="component.id"
          :component="component"/>

      <div
          v-if="!storeComponents.components?.length"
          class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No components here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
import {ref} from "vue";
import CustomComponent from "@/components/Blocks/CustomComponent.vue";
import {useStoreComponents} from "@/stores/storeComponents.js";

const storeComponents = useStoreComponents();


</script>
