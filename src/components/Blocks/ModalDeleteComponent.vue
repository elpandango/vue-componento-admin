<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card"
         ref="ModalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Component?</p>
        <button
            @click="closeModal"
            class="delete"
            aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this component?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button
              @click="closeModal"
              class="button">Cancel
          </button>
          <button @click="storeComponents.deleteComponent(componentId)"
                  class="button is-danger">Delete</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import {onClickOutside} from '@vueuse/core';
import {ref, onMounted, onUnmounted} from "vue";
import {useStoreComponents} from "@/stores/storeComponents.js";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  componentId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const storeComponents = useStoreComponents();

const closeModal = () => {
  emit('update:modelValue', false);
};

const ModalCardRef = ref(null);

onClickOutside(ModalCardRef, event => {
  closeModal();
});

const handleKeyboard = (e) => {
  if (e.key === 'Escape' && props.modelValue === true) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
})

</script>
