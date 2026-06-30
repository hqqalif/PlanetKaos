<script>
    defineProps({
        reviews: {
            type: Array,
            required: true
        }
    })
</script>

<template>
    <div class="reviews">
        <h3>Ulasan:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                <span>{{ review.name }} memberikan bintang {{ review.rating }}</span>
                <br/>
                <span>{{ review.content }}</span>
            </li>
        </ul>
    </div>
</template>