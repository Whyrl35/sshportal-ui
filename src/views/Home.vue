<template>
  <div id="app">
    <Home/>
  </div>
</template>
<script>
  import Home from '@/components/Home.vue';
  export default {
    name: 'home',
    components: {
      Home,
    },
    props: ['page']
  }
</script>