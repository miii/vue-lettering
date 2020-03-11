<template>
  <div class="demo">
    <h1>Plugin Demo</h1>
    <p>add: {{ a }} + {{ b }} = {{ $add(a, b) }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'demo',
  data: () => ({ a: 1, b: 1 })
})
</script>

<style>

</style>
