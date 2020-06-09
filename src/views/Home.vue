<template>
  <div id="app">
    <Dashboard/>
  </div>
</template>
<script>
  import Dashboard from '@/components/Dashboard.vue';
  export default {
    name: 'home',
    components: {
      Dashboard,
    },
    props: ['page']
  }
</script>