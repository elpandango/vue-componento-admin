import {watch} from "vue";

export function useWatchCharacters(valueToWatch, amount = 100) {
  const watcher = watch(valueToWatch, (newValue) => {
    if (newValue.length === +amount) {
      alert('Too long!');
    }
  });
}
