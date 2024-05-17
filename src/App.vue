<template>
  <NavBar/>
  <div class="container is-max-desktop px-2 py-4">
    <template v-if="requestFinished">
      <RouterView/>
    </template>
    <template v-else>
      <Preloader height="calc(100vh - 100px)" />
    </template>
  </div>
</template>

<script setup>
import NavBar from "@/components/Layout/NavBar.vue";
import Preloader from "@/components/Preloader/index.vue";
import {useStoreAuth} from "@/stores/storeAuth.js";
import {useStoreComponents} from "@/stores/storeComponents.js";
import {onMounted, watch, ref} from "vue";

const storeAuth = useStoreAuth();
const storeComponents = useStoreComponents();
const requestFinished = ref(false);

onMounted(async () => {
  storeAuth.loaded = false;
  await storeAuth.init();
  storeAuth.loaded = true;
});

watch(() => storeComponents.componentsLoaded, (newValue, oldValue) => {
  if (storeComponents.componentsLoaded) {
    requestFinished.value = true;
  }
});

</script>

<style>
@import "bulma/css/bulma.css";
</style>
