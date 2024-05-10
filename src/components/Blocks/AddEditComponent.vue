<template>
  <h1 class="title">{{ label }}</h1>
  <div :class="`card p-4 mb-5`">
    <div class="field">
      <label class="label">Component name</label>
      <div class="control">
        <input
            class="input"
            type="text"
            v-model="formInputData.title"
            @input="editorChangeHandler('title', $event.target.value)"
            placeholder="My New Component">
      </div>
    </div>
    <div class="field">
      <label class="label">Component type</label>
      <div class="control">
        <input
            class="input"
            type="text"
            v-model="formInputData.type"
            @input="editorChangeHandler('type', $event.target.value)"
            placeholder="dropdown">
      </div>
    </div>
    <div class="field">
      <label class="label">Component code</label>
      <div class="control">
          <textarea
              v-model="formInputData.code"
              @input="editorChangeHandler('code', $event.target.value)"
              class="textarea"
              placeholder="Write component code..."
          />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, onMounted} from "vue";

const props = defineProps({
  componentData: {
    type: Object,
    required: false
  },
  label: {
    type: String,
    default: 'Add New Component'
  }
});
const emits = defineEmits(['dataUpdated']);

const formInputData = reactive({
  title: '',
  type: '',
  code: '',
});

const editorChangeHandler = (inputName, editorContent) => {
  formInputData[inputName] = editorContent;
  emits('dataUpdated', formInputData);
};

onMounted(() => {
  if (props.componentData) {
    formInputData.title = props.componentData.title;
    formInputData.type = props.componentData.type;
    formInputData.code = props.componentData.code;
  }
});

</script>
