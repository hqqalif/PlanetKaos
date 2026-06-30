<script setup lang="ts">
    import {ref, computed} from 'vue'
    //import reviewForm from '@/components/product/reviewForm.vue'
    //import reviewList from '@/components/product/reviewList.vue'

    const brand = ref('Nike')
    const kaosHitam = ref('/images/products/images (1).jpg')
    const kaosOlive = ref('/images/products/images (2).jpg')
    const kaosMerah = ref('/images/products/images (3).jpg')
    const kaosArmy = ref('/images/products/images (4).jpg')
    const product = ref('Kaos Katun Combed 24s')
    const reviews = ref<{ name: string; message: string; rating: number | null }[]>([])
    let id = 1
    const variants = ref([
        {id: id++, colors: 'Hitam', image: kaosHitam, quantity: 50},
        {id: id++, colors: 'Olive', image: kaosOlive, quantity: 0},
        {id: id++, colors: 'Merah', image: kaosMerah, quantity: 10},
        {id: id++, colors: 'Army', image: kaosArmy, quantity: 50}])
    const selectedVariant = ref(0)
    const description = ref('Kaos polos premium dengan bahan katun combed 24s yang sejuk, nyaman, dan menyerap keringat. Cocok untuk penggunaan sehari-hari.')
    const emit = defineEmits(['add-to-cart'])

    const addCart = () => {
        emit('add-to-cart')
    }

    const updateVariant = (index: number) => {
        selectedVariant.value = index
    }

    const selectedImage = computed(() => {
        return variants.value[selectedVariant.value]?.image
    })

    const productStock = computed(() => {
        return variants.value[selectedVariant.value]?.quantity ?? 0
    })

    const productTitle = computed(() => {
        return brand.value + ' ' + product.value
    })

    const props = defineProps({
        premium: {
            type: Boolean,
            required: true
        }
    })

    const shipping = computed(() => {
        if (props.premium){
            return "Free shipping"
        }
        else{
            return "Rp20.000,00"
        }
    })

    const addReview = (review: { name: string; message: string; rating: number | null }) => {
        reviews.value.push(review)
    }

</script>

<template>
    <div class="productPage">
        
        <div class="productContainer">
            <div class="photoContainer">
                <img :src="selectedImage">
            </div>
            
            <div class="productDetails">
                <div class="productName">
                    <h2>{{ productTitle }}</h2>
                </div>
                <div class="stock">
                    <p v-if="productStock >= 30" id="available">Item in stock</p>
                    <p v-else-if="productStock < 30 && productStock > 0" id="almost">Almost sold out!</p>
                    <p v-else id="sold">Item sold out</p>
                </div>
                <div class="productDesc">
                    <p>{{ description }}</p>
                </div>
                <div class="productOption">
                    <button v-for="(variant, index) in variants" 
                        :key="variant.id" 
                        @click="updateVariant(index)">
                        {{ variant.colors }}
                    </button>
                </div>
            </div>

            <div class="orderBox">
                <div class="buttons">
                    <button class="btn-buynow" :disabled="productStock == 0" :class="{disabledBtn: productStock == 0}">
                        Beli Sekarang
                    </button>
                    <button @click="addCart" class="btn-cart" :disabled="productStock == 0" :class="{disabledBtn: productStock == 0}">
                        Tambahkan ke keranjang
                    </button>
                </div>
                <div class="shipping">
                    <p>Biaya Ongkir: {{ shipping }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .productContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 30px;
        padding: 40px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        width: 100%;
        border-bottom: 1px solid #e5e7e9;
        position: sticky;
        top: 0;
        background-color: #ffffff;
        z-index: 100;
        padding: 15px 0;
    }

    .disabledBtn{
        background-color: #6d7588 !important;
        cursor:not-allowed !important;
        color: white !important;
    }

    .headerContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
        gap: 30px;
    }

    .logo {
        color: #03ac0e;
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: -1px;
    }

    .searchBar {
        flex-grow: 1;
    }

    .searchBar input {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #e5e7e9;
        border-radius: 8px;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.2s;
    }

    .searchBar input:focus {
        border-color: #03ac0e;
    }

    .headerButton {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .icon-btn {
        background: none;
        border: none;
        padding: 5px;
        width: auto;
        cursor: pointer;
    }

    .icon {
        font-size: 1.3rem;
    }

    .photoContainer {
        width: 30%;
        position: sticky;
    }

    .photoContainer img {
        width: 100%; 
        height: auto;
        object-fit: contain;
        border-radius: 8px;
    }

    .productDetails {
        width: 40%;
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin-top: 30px;
    }
    .productOption {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap; 
        gap: 10px;     
    }

    .productOption button {
        height: auto;            
        width: auto;
        padding: 8px 16px;        
        border: 1px solid #e5e7e9; 
        border-radius: 8px;
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 0.9rem;
        color: #212121;
        cursor: pointer;
        transition: all 0.2s;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .productOption button:hover {
        border-color: #000;
        background-color: #03ac0e;
        color: #fff;
    }



    .productName h2 {
        font-family: Arial, sans-serif;
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: #212121;
    }

    .stock {
        font-family: Arial, sans-serif;
        font-size: 0.9rem;
        color: #303030;
        font-weight: bold;
    }

    #available{
        color:#028e0b;
    }

    #almost{
        color: red;
    }

    #sold{
        color: red;
    }

    .productDesc {
        font-family: Arial, sans-serif;
        font-size: 1rem;
        color: #6d7588;
        line-height: 1.5;
    }

    .orderBox {
        width: 25%;
        border: 1px solid #e5e7e9;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 20px;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    button {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .btn-cart {
        background-color: transparent;
        color: #03ac0e;
        border: 1px solid #03ac0e;
    }

    .btn-cart:hover {
        background-color: #f6fff6;
    }

    .btn-buynow {
        background-color: #03ac0e;
        color: #fff;
        border: none;
    }

    .btn-buynow:hover {
        background-color: #028e0b;
    }
</style>