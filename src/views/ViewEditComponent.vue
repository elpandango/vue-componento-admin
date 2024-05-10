<template>
  <div class="edit-notes">
    <AddEditComponent
        label="Edit Component"
        @dataUpdated="updateFormHandler"
        :component-data="componentContent">
      <template v-slot:buttons>
        <button
            @click="$router.back()"
            class="button is-link is-light mr-2">Cancel
        </button>
        <button
            @click="handleSaveClicked"
            :disabled="changesCounter === 0"
            class="button is-link has-background-link">Save Changes
        </button>
      </template>
    </AddEditComponent>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import AddEditComponent from "@/components/Blocks/AddEditComponent.vue";
import {useStoreComponents} from "@/stores/storeComponents.js";

const route = useRoute();
const router = useRouter();
const storeComponents = useStoreComponents();

const componentContent = ref({});
componentContent.value = storeComponents.getComponentContent(route.params.id);

const changesCounter = ref(0);
let newComponent = reactive({});

const updateFormHandler = (data) => {
  newComponent = {...data};
  changesCounter.value++;
};

const handleSaveClicked = () => {
  storeComponents.updateComponent(route.params.id, newComponent);
  router.push('/');
};
</script>
