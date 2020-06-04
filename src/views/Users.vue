<template>
  <div id="app">
    <UsersList/>
  </div>
</template>
<script>
  import UsersList from '@/components/UsersList.vue';
  export default {
    name: 'userlist',
    components: {
      UsersList,
    },
    props: ['page']
  }
</script>