<template>
  <div id="app">
    <NavBar />
    <CarouselPag />
    <ProductList />
    <FooterPag />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import CarouselPag from './components/CarouselPag.vue';
import FooterPag from './components/FooterPag.vue';
import ProductList from './components/ProductList.vue';



export default {
  name: 'App',
  components: {
    NavBar,
    CarouselPag,
    ProductList,
    FooterPag
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>