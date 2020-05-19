<template>
  <div id="app">
    <KeysList/>
  </div>
</template>
<script>
  import KeysList from '@/components/KeysList.vue';
  export default {
    name: 'sessions',
    components: {
      KeysList,
    },
    props: ['page']
  }
</script>