<template>
  <div class="demo">
    <h1
      class="example"
      v-lettering="[/( )/g, '']"
    >
      Vue Lettering
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'demo'
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:700&display=swap');

.demo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.example {
  font-family: 'Titillium Web';
  text-transform: uppercase;
  color: #c44032;
  text-shadow: rgba(0, 0, 0, 0.15) -4px 4px 0;
  font-size: 6rem;
  letter-spacing: .6rem;
  transform: scaleY(1.3);
  user-select: none;
}

.vl__g {
  display: inline-block;
  transition: transform 0.2s ease-out;
  transform: rotate(1deg);
}

.vl__g:nth-child(5n + 1) {
  transform: rotate(3deg);
  color: #c44032;
}

.vl__g:nth-child(3n + 2) {
  transform: rotate(-2deg);
  color: #7073CF;
}

.vl__g:nth-child(4n + 3) {
  transform: rotate(-3deg);
  color: #E6C92F;
}

.vl__g:nth-child(4n + 4) {
  transform: rotate(4deg);
  color: #5DA028;
}

.vl__g:hover {
  transform: translateY(5px) scale(1.1);
}
</style>
