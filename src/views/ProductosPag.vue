<!-- src/views/ProductosPag.vue -->
<template>
  <div>
    <h1>{{ product.name }}</h1>
    <img :src="product.imageUrl" :alt="product.name" />
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: {}
    };
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    fetchProductDetails() {
      const productId = this.id;
      fetch(`https://66a189667053166bcabf3141.mockapi.io/producs/${productId}`)
        .then(response => response.json())
        .then(data => {
          this.product = data;
        });
    }
  }
}
</script>