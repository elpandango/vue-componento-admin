import {defineStore} from 'pinia';
import {collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import {db} from '@/js/firebase.js';

let componentsCollectionRef;
let componentsCollectionQuery;
let getComponentsSnapshot = null;

export const useStoreComponents = defineStore('storeComponents', {
  state: () => {
    return {
      components: [],
      componentTypes: [],
      componentsLoaded: false,
      componentTypesLoaded: false,
    }
  },
  actions: {
    async init() {
      componentsCollectionRef = collection(db, "components");
      componentsCollectionQuery = query(componentsCollectionRef, orderBy("date", "desc"));

      await this.getComponents();
      await this.getComponentTypes();
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
    async getComponentTypes() {
      this.componentTypesLoaded = false;
      const componentsCollRef = collection(db, "componentTypes");
      const componentsCollQuery = query(componentsCollRef, orderBy("name", "desc"));
      getComponentsSnapshot = onSnapshot(componentsCollQuery, (querySnapshot) => {
        let types = [];
        querySnapshot.forEach((doc) => {
          const type = {
            id: doc.id,
            name: doc.data().name,
          };
          types.push(type);
        });

        this.componentTypes = types;
        this.componentTypesLoaded = true;
      });
    },
    clearComponents() {
      this.components = [];
      if (getComponentsSnapshot) {
        getComponentsSnapshot();
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
        return state?.components?.filter(component => component?.id === id)[0]?.content;
      }
    },
  },
})
