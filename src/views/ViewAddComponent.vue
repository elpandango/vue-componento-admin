<template>
  <div class="stats">
    <AddEditComponent @dataUpdated="updateFormHandler">
      <template v-slot:buttons>
        <button
            @click="addComponent"
            :disabled="changesCounter === 0"
            class="button is-link">Add New Component
        </button>
      </template>
    </AddEditComponent>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStoreComponents} from "@/stores/storeComponents.js";
import AddEditComponent from "@/components/Blocks/AddEditComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const storeComponents = useStoreComponents();

const changesCounter = ref(0);
let newComponent = reactive({});

const updateFormHandler = (data) => {
  newComponent = {...data};
  changesCounter.value++;
};

const addComponent = () => {
  storeComponents.addComponent(newComponent);
  newComponent = {};
  router.push('/');
};
</script>
