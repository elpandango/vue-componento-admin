import {defineStore} from 'pinia';
import {collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import {db} from '@/js/firebase.js';
import {useStoreAuth} from "@/stores/storeAuth.js";

let componentsCollectionRef;
let componentsCollectionQuery;
let getComponentsSnapshot = null;

export const useStoreComponents = defineStore('storeComponents', {
  state: () => {
    return {
      components: [],
      componentsLoaded: false
    }
  },
  actions: {
    async init() {
      const storeAuth = useStoreAuth();
      componentsCollectionRef = collection(db, "components");
      componentsCollectionQuery = query(componentsCollectionRef, orderBy("date", "desc"));

      await this.getComponents();
    },
    async getComponents() {
      this.componentsLoaded = false;

      getComponentsSnapshot = onSnapshot(componentsCollectionQuery, (querySnapshot) => {
        let components = [];
        querySnapshot.forEach((doc) => {
          const component = {
            id: doc.id,
            date: doc.data().date,
            content: doc.data().content
          };
          components.push(component);
        });

        this.components = components;
        this.componentsLoaded = true;
      });
    },
    clearComponents() {
      this.components = [];
      if (getComponentsSnapshot) {
        getComponentsSnapshot(); // unsubscribe from any active listener
      }
    },
    async addComponent(newComponentValue) {
      let currentDate = new Date().getTime();
      let date = currentDate.toString();

      await addDoc(collection(db, "components"), {
          content: newComponentValue,
          date: date,
      });
    },
    async deleteComponent(idToDelete) {
      await deleteDoc(doc(componentsCollectionRef, idToDelete));
    },
    async updateComponent(idToUpdate, contentToUpdate) {
      const componentRef = doc(db, "components", idToUpdate);
      await updateDoc(componentRef, {
        content: contentToUpdate
      });

    }
  },
  getters: {
    getComponentContent: (state) => {
      return (id) => {
        return state.components.filter(component => component.id === id)[0].content;
      }
    },
    totalNotesCount: (state) => {
      return state.components.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      count = state.components.reduce((accumulator, currentValue) => {
        if (currentValue?.content?.length) {
          return accumulator + currentValue.content.length;
        }
      }, 0);
      return count;
    }
  },
})
