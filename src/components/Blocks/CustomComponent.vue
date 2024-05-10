<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="title">{{component.content.title}}</div>
      <div class="content">
        <pre>
          <code class="language-html">
            {{ component.content.content }}
          </code>
        </pre>
      </div>
      <div class="columns is-mobile has-text-grey-light mt-2">
        <small class="column">{{dateFormatted}}</small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
          :to="`editComponent/${component.id}`"
          class="card-footer-item">Edit
      </RouterLink>
      <a
          @click.prevent="handleDeleteClicked"
          href="#"
          class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteComponent
        v-if="modals.deleteComponent"
        v-model="modals.deleteComponent"
        :componentId="component.id"/>
  </div>
</template>

<script setup>
import {computed, reactive, onMounted} from "vue";
import { useDateFormat } from '@vueuse/core';
import ModalDeleteComponent from "@/components/Blocks/ModalDeleteComponent.vue";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";

const props = defineProps({
  component: {
    type: Object,
    required: true
  }
});

const handleDeleteClicked = () => {
  modals.deleteComponent = true;
};

const modals = reactive({
  deleteComponent: false,
});

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.component.date));
  let formattedDate = useDateFormat(date, 'DD-MM-YYYY HH:mm');
  return formattedDate.value;
});

// onMounted(() => {
//   window.Prism = window.Prism || {};
//   window.Prism.manual = true;
//   Prism.highlightAll(); // highlight your code on mount
// });
</script>
