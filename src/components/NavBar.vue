<template>
    <div class="container-fluid" id="navs">
    <div class="row">
      <div class="col text-start">
        <a href="index.html">
          <img src="../assets/imagenes/El coyotito.png" style="width: 80%; height: auto; max-width: 80%" />
        </a>
        <div class="container" style="margin-top: 30px; padding: 0">
          <i>
            <h4 id="opc">
              <a href="#">Inicio |</a>
              <a href="#" class="opc2" id="categorias" @click="toggleCategoriasMenu" style="color: aliceblue;">Categorías |</a>
              <div v-show="categoriasVisible" id="categoriasMenu" class="categoria-menu">
                <button class="categoriaopc" @click="filterCategory('Belleza')"><a href="#productostod" style="color: black;">Belleza</a></button>
                <button class="categoriaopc" @click="filterCategory('Papeleria')"><a href="#productostod" style="color: black;">Papeleria</a></button>
                <button class="categoriaopc" @click="filterCategory('Accesorios')"><a href="#productostod" style="color: black;">Accesorios</a></button>
                <button class="categoriaopc" @click="filterCategory('Juegos')"><a href="#productostod" style="color: black;">Juegos</a></button>
                <button class="categoriaopc" @click="filterCategory('Todos')"><a href="#productostod" style="color: black;">Todos</a></button>
              </div>
              <a href="#contacto">Contacto</a>
            </h4>
          </i>
        </div>
      </div>
        <div class="col text-center">
          <a href="index.html"><img src="../assets/imagenes/logo.png" style="max-width: 40%; height: auto" id="logoop" /></a>
        </div>
        <div class="col text-end" style="margin-top: 50px">
          <div class="container">
            <button id="search-button" class="opc2">
              <span class="material-symbols-outlined inverted-icon">search</span>
          </button>
          <div id="search-container" class="hidden">
              <input type="text" id="search-input" placeholder="Buscar productos..." autofocus />
              <div id="search-results-container" class="search-results"></div>
          </div>

              <button class="opc2" id="view-cart">
                <span class="material-symbols-outlined"> shopping_basket </span>
              </button>
              <div class="dropdown">
                <input type="checkbox" id="dropdown-toggle" class="dropdown-toggle">
                <label for="dropdown-toggle" class="opc2">
                    <span class="material-symbols-outlined" style="cursor: pointer;">account_circle</span>
                </label>
                <div class="dropdown-content">
                  <a href="registroylogin/perfil.php">Mi perfil</a>
                  <a href="./carrito.html">Mis compras</a>
                  <a href="./favoritos.html">Favoritos</a>
                  <a href="registroylogin/logout.php">Cerrar sesión</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const searchVisible = ref(false);
    const searchQuery = ref('');
    const searchResults = ref([]);
    const categoriasVisible = ref(false);
    const router = useRouter();

    const toggleSearch = () => {
      searchVisible.value = !searchVisible.value;
      if (searchVisible.value) {
        nextTick(() => {
          document.getElementById('search-input').focus();
        });
      }
    };

    const toggleCategoriasMenu = () => {
      categoriasVisible.value = !categoriasVisible.value;
    };

    const searchProducts = () => {
      if (searchQuery.value.length > 0) {
        fetchProductsAndDisplay(searchQuery.value.toLowerCase());
      } else {
        searchResults.value = [];
      }
    };

    const fetchProductsAndDisplay = async (query) => {
      try {
        const response = await fetch('https://66a189667053166bcabf3141.mockapi.io/producs');
        const products = await response.json();
        searchResults.value = products.filter(product =>
          product.name.toLowerCase().includes(query)
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const viewProductDetails = (productId) => {
      router.push({ name: 'product-detail', params: { id: productId } });
    };

    onMounted(() => {
      document.addEventListener('click', (event) => {
        if (!document.getElementById('search-container').contains(event.target) &&
            !document.getElementById('search-button').contains(event.target)) {
          searchVisible.value = false;
        }
      });
    });

    return {
      searchVisible,
      searchQuery,
      searchResults,
      categoriasVisible,
      toggleSearch,
      toggleCategoriasMenu,
      searchProducts,
      viewProductDetails
    };
  }
};
  </script>
  
  <style scoped>
   #navs {
  background-color: #fab9c3;
  padding: 10px 20px;
}
.material-symbols-outlined {
  font-size: 50px;
  color: aliceblue;
}
.inverted-icon {
  transform: scaleX(-1);
}
#opc {
  color: aliceblue;
  font-family: inherit;
}
a {
  text-decoration: none;
  color: aliceblue;
}
.opc2 {
  background-color: #fab9c3;
  border: none;
}
#inicio {
  padding: 0;
  position: relative;
  z-index: 0;
}
#contacto {
  background-color: #fab9c3;
  padding: 10px;
  margin: 0;
}
#coyotelog {
  position: absolute;
  bottom: 100%;
  transform: translateY(61%);
  right: 0;
  z-index: 1;
}
#iconscont {
  max-width: 40%;
  height: auto;
}
.categoria-menu {
  position: fixed;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 3px solid #fab9c3;
}
.categoriaopc {
  display: block;
  padding: 10px 20px;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}
.categoriaopc:hover {
  background-color: #fecfd6;
  transition-duration: .5s;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-toggle {
  display: none;
}
.dropdown-content {
  display: none;
  position: fixed;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 3px solid #fab9c3;
  right: 40px;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #fecfd6;
  transition-duration: .5s;
}
.dropdown-toggle:checked ~ .dropdown-content {
  display: block;
}
/*lupa */
#search-container {
  position: absolute;
  top: 150px;
  right: 20px;
  width: 50%;
  z-index: 1000;
}

/* cuadr abajo */
#search-input {
  width: 100%;
  padding: 10px;
  border: 3px solid #fab9c3;
  border-radius: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  border: 3px solid #fab9c3;
  flex-wrap: wrap;
  gap: 10px;
}

.hidden {
  display: none;
}

.product-item {
  width: 120px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.product-item:hover{
  transform: translateY(-5px);
  transition-duration: .2s;
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item h4 {
  font-size: 14px;
  margin: 5px 0;
}

.product-item p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.product-item .price {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}
  </style>