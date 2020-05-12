<template>
  <div id="app">
    <Navbar/>
    <SessionList/>
  </div>
</template>
<script>
  import SessionList from '@/components/SessionList.vue';
  export default {
    name: 'sessions',
    components: {
      SessionList,
    },
    props: ['page']
  }
</script>