<script setup>
defineOptions({
  name: 'countMode'
})

import { ref } from 'vue'

const num = ref(123)
</script>

<template>
  <div class="add">{{ num }}</div>
</template>

<style>
.add {
  color: red;
}
</style>
