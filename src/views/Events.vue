<template>
  <div id="app">
    <Navbar/>
    <EventList/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue';
  import EventList from '@/components/EventList.vue';
  export default {
    name: 'home',
    components: {
      Navbar,
      EventList,
    },
  }
</script>