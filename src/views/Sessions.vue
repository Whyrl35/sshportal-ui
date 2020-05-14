<template>
  <div id="app">
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