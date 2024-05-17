<template>
  <div class="notes">
    <div class="search-block mb-6">
      <div class="field">
        <label class="label">Component name</label>
        <div class="control">
          <input
              class="input"
              type="text"
              v-model="searchInputValue"
              placeholder="Search by component name">
        </div>
      </div>
    </div>

    <CustomComponent
        v-for="component in filteredComponents"
        :key="component.id"
        :component="component"/>

    <div
        v-if="!filteredComponents?.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
      No components here yet...
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import CustomComponent from "@/components/Blocks/CustomComponent.vue";
import {useStoreComponents} from "@/stores/storeComponents.js";

const components = ref([]);
const storeComponents = useStoreComponents();
const searchInputValue = ref('');

onMounted(() => {
  components.value = storeComponents.components;
});

const filteredComponents = computed(() => {
  if (searchInputValue.value.length === 0) {
    return components.value;
  }
  return components.value.filter(component => component?.content?.title?.toLowerCase()?.includes(searchInputValue.value.toLowerCase()));
})
</script>
