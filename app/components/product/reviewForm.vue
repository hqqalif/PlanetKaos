<script setup lang="ts">
    import {reactive} from 'vue'

    const emit = defineEmits(['review-submitted'])

    const review = reactive({
        name:'',
        content:'',
        rating:null
    })

    const onSubmit = () => {
        const productReview = {
            name: review.name,
            content: review.content,
            rating: review.rating
        }
        emit('review-submitted', productReview)

        review.name = '',
        review.content = '',
        review.rating = null
    }
</script>

<template>
    <form class="reviewForm" @submit.prevent="onSubmit">
        <h3>Berikan ulasan untuk produk ini!</h3>
        <label for="name">Name: </label>
        <input id="name" v-model="review.name">

        <label for="review">Ulasan: </label>
        <input id="review" v-model="review.content">

        <label for="rating">Rating: </label>
        <select id="rating" v-model.number="review.rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit">
    </form>
</template>

<style lang="css" scoped>

</style>