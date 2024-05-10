import {createRouter, createWebHistory} from "vue-router";
import {useStoreAuth} from "@/stores/storeAuth.js";
import ViewComponents from '@/views/ViewComponents.vue';
import ViewEditComponent from '@/views/ViewEditComponent.vue';
import ViewAddComponent from '@/views/ViewAddComponent.vue';
import ViewAuth from '@/views/ViewAuth.vue';

const routes = [
  {
    path: '/',
    name: 'components',
    component: ViewComponents
  },
  {
    path: '/editComponent/:id',
    name: 'editComponent',
    component: ViewEditComponent
  },
  {
    path: '/add-component',
    name: 'addComponent',
    component: ViewAddComponent
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  const storeAuth = await useStoreAuth();
  if (storeAuth.loaded) {
    if (!storeAuth.user.id && to.name !== 'auth') {
      return {name: 'auth'};
    }

    if (storeAuth.user.id && to.name === 'auth') {
      return false;
    }
  }
})

export default router;
