import {defineStore} from 'pinia';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from "@/js/firebase.js";
import {useStoreComponents} from "@/stores/storeComponents.js";

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
      loaded: false,
    }
  },
  actions: {
    async init() {
      const storeComponents = useStoreComponents();

      await onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');

          storeComponents.init();
        } else {
          this.user = {};
          this.router.replace('/auth');

          storeComponents.clearComponents();
        }
      });
    },
    registerUser({email, password}) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // console.log(errorCode, errorMessage);
        });
    },
    loginUser({email, password}) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // console.log(errorCode, errorMessage);
        });
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('User signed out.')
      }).catch((error) => {
        console.log(error.message);
      });
    }
  },
})
