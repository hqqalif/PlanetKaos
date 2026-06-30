<script setup lang="ts">
  import { ref } from 'vue'
  import productCard from '@/components/product/productCard.vue'

  const cart = ref(0)
  const updateCart = () => {
    cart.value += 1
  }
  const premium = ref(true)
</script>
<template>
  <header class="header">
            <div class="headerContainer">
                <div class="logo">
                    PlanetKaos
                </div>
                <div class="searchBar">
                    <input type="text" placeholder="Cari kaos yang kamu inginkan">
                </div>
                <div class="headerButton">
                    <button class="icon-btn">
                        <span class="icon">🛒</span>
                        <span id="jumlah"> {{ cart }}</span>
                    </button>
                    <button class="icon-btn">
                        <span class="icon">💬</span>
                    </button>
                </div>
            </div>
        </header>
  <productCard :premium="premium" @add-to-cart="updateCart"></productCard>
</template>