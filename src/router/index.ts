import { createRouter, createWebHistory } from 'vue-router';

import ProductosPag from '../views/ProductosPag.vue';
import ProductList from '../components/ProductList.vue';


const routes = [
  {
    path: '/product/:id',
    name: 'ProductosPag',
    component: ProductosPag, // Se usa ProductosPag para la vista de detalles
    props: true
  },
  {
    path: '/products',
    name: 'productList',
    component: ProductList // Usa el componente aquí
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
