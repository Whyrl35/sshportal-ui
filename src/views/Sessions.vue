<template>
  <div id="app">
    <Navbar/>
    <SessionList/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue';
  import SessionList from '@/components/SessionList.vue';
  export default {
    name: 'sessions',
    components: {
      Navbar,
      SessionList,
    },
  }
</script>