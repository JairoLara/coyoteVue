<template>
  <div class="carousel-container">
    <div class="carousel">
      <div ref="slides" class="slides">
        <img src="../assets/imagenes/carr1.jpeg" alt="Image 1" />
        <img src="../assets/imagenes/carr2.jpg" alt="Image 2" />
        <img src="../assets/imagenes/carr3.jpg" alt="Image 3" />
      </div>
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>
  </div>
  <br>
  <div class="container-fluid text-center" id="todoslosprod">
    <p class="bien"><strong>!BIENVENID@S AL COYOTITO!</strong></p>
    <p class="expl">EXPLORA NUESTRAS SECCIONES Y ENCUENTRA JUSTO LO QUE ESTAS BUSCANDO !GRACIAS POR VISITARNOS!</p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'CarouselPag',
  setup() {
    const slides = ref<HTMLElement | null>(null);
    const currentIndex = ref(0);
    let slideInterval: number | null = null;

    const showSlide = (index: number) => {
      if (slides.value) {
        const totalSlides = 3; // Número de imágenes en el carrusel
        if (index >= totalSlides) {
          currentIndex.value = 0;
        } else if (index < 0) {
          currentIndex.value = totalSlides - 1;
        } else {
          currentIndex.value = index;
        }

        const offset = -currentIndex.value * 100;
        slides.value.style.transform = `translateX(${offset}%)`;
      }
    };

    const nextSlide = () => {
      showSlide(currentIndex.value + 1);
    };

    const prevSlide = () => {
      showSlide(currentIndex.value - 1);
    };

    const startSlideShow = () => {
      slideInterval = window.setInterval(nextSlide, 7000); // Cambia de imagen cada 7 segundos
    };

    onMounted(() => {
      showSlide(currentIndex.value);
      startSlideShow();
    });

    onBeforeUnmount(() => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    });

    return {
      slides,
      prevSlide,
      nextSlide
    };
  }
});
</script>
  
  <style scoped>
  .carousel-container {
    width: 90%;
    max-width: 1350px;
    position: relative;
    margin: 0 auto;
  }
  
  .carousel {
    overflow: hidden;
    position: relative;
    height: 650px;
  }
  
  .slides {
    display: flex;
    transition: transform 0.5s ease;
    height: 100%;
  }
  
  .slides img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  button.prev,
  button.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: rgb(242, 174, 174);
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
  }
  
  button.prev {
    left: 10px;
  }
  
  button.next {
    right: 10px;
  }
  
  button:focus {
    outline: none;
  }
/*Bienvenida */
  #todoslosprod {
  background-color: #ffd0d7;
  padding: 3px;

  .bien {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: rgb(70, 70, 70);
    text-align: center;
  }
}
  </style>