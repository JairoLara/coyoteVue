<template>
  <div class="container-fluid" id="productos">
    <h1>Lo más vendido</h1>
    <div class="imagen-caja">
      <div id="products" class="product-container">
        <div v-for="product in limitedProducts" :key="product.id" class="product">
          <img :src="product.imageUrl" :alt="product.name" @click="viewProductDetails(product.id)" />
          <div class="product-info">
            <h4>{{ product.name }}</h4>
            <p>{{ `$${product.price}` }}</p>
            <p>{{ product.categoria }}</p>
            <button class="boton-agregar" @click="addToCart(product)">Agregar al carrito</button>
            <button class="boton-favoritos" @click="addToFavorites(product)">Agregar a favoritos</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid text-center" style="background-color: #fab9c3;">
    <h1 style="color: rgb(36, 36, 36);" id="productostod">{{ headerText }}</h1>
  </div>

  <div id="todosproducts" class="container-fluid text-center">
    <div v-for="product in displayedProducts" :key="product.id" class="product">
      <img :src="product.imageUrl" :alt="product.name" @click="viewProductDetails(product.id)" />
      <div class="product-info">
        <h4>{{ product.name }}</h4>
        <p>{{ `$${product.price}` }}</p>
        <p>{{ product.categoria }}</p>
        <button class="boton-agregar" @click="addToCart(product)">Agregar al carrito</button>
        <button class="boton-favoritos" @click="addToFavorites(product)">Agregar a favoritos</button>
      </div>
    </div>
  </div>

  <div id="results"></div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      allProducts: [],
      displayedProducts: [],
      limitedProducts: [],
      headerText: 'TODOS LOS PRODUCTOS',
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://66a189667053166bcabf3141.mockapi.io/producs');
        const products = await response.json();
        this.allProducts = products;
        this.displayedProducts = products;
        this.limitedProducts = products.slice(0, 4); // Mostrar los primeros 4 productos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    filterProducts(categoria) {
      if (categoria === 'Todos') {
        this.displayedProducts = this.allProducts;
        this.headerText = 'TODOS LOS PRODUCTOS';
      } else {
        this.displayedProducts = this.allProducts.filter(product => product.categoria === categoria);
        this.headerText = categoria;
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.some(item => item.id === product.id)) {
        alert(`${product.name} ya está en el carrito`);
        return;
      }
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} ha sido añadido al carrito`);
    },
    addToFavorites(product) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${product.name} ha sido añadido a favoritos`);
    },
      viewProductDetails(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    async searchAPI(query) {
      try {
        const response = await fetch('https://66a189667053166bcabf3141.mockapi.io/producs');
        const data = await response.json();
        const filteredData = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        this.displayResults(filteredData);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    displayResults(results) {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
      }

      results.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>ID: ${item.id}</p>
        `;
        resultsContainer.appendChild(div);
      });
    }
  },
};
</script>

<style scoped>
#todosproducts {
  background-color: #fff;
  padding-bottom: 2px;
  padding-top: 8px;
}

#productos {
  position: relative;
  overflow: hidden;
  width: 100%;
  align-items: center;
}

.imagen-caja {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.product-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.product {
  padding: 8px;
  display: inline-block;
  margin: 10px;
  width: 300px;
  height: 500px;
  text-align: center;
  flex: 0 0 auto;
  border: 3px solid #fab9c3;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.product:hover {
  transform: translateY(-5px);
}

.product img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  cursor: pointer;
}

.product-info {
  padding: 10px;
}

.product-info h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.product-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.boton-agregar {
  background-color: #fab9c3;
  border: none;
  border-radius: 10px;
  margin-bottom: 3px;
  width: 100%;
  padding: 2%;
  color: rgb(255, 255, 255);
}

.boton-agregar:hover {
  transform: scale(1.1);
  transition-duration: .5s;
}

.boton-favoritos {
  background-color: #fab9c3;
  border: none;
  border-radius: 10px;
  width: 100%;
  padding: 2%;
  color: rgb(255, 255, 255);
}

.boton-favoritos:hover {
  transform: scale(1.1);
  transition-duration: .5s;
}
</style>