<script setup>
import { ref, computed } from 'vue'

const photoGallery = ref([])
const numberOfPhotos = computed(() => photoGallery.value.length)
const eventAlbum = computed(() => photoGallery.value.filter((photo) => photo.albumId % 2 === 0))
function fetchPhotoGallery() {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((data) => {
      photoGallery.value = data
    })
}

</script>

<template>
  <div>
    <button @click="fetchPhotoGallery">Fetch Data</button>
    <p>
      {{ numberOfPhotos }} photos in the gallery
    </p>
  </div>
</template>
