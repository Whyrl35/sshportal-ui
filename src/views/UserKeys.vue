<template>
  <div id="app">
    <KeysList/>
  </div>
</template>
<script>
  import KeysList from '@/components/UserKeysList.vue';
  export default {
    name: 'sessions',
    components: {
      KeysList,
    },
    props: ['page']
  }
</script>