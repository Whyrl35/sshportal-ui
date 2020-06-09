<template>
  <div id="app">
    <ItemListModal v-bind:title="title" v-bind:listInfo="modalInfo" v-bind:showModal="showModal" v-on:update-show="showModal=$event"/>
    <ItemList v-bind:tableData="tableData" v-bind:title="title" v-on:details="viewDetails($event)"/>
  </div>
</template>
<script>
  import ItemList from '@/components/ItemListing.vue';
  import ItemListModal from '@/components/ItemListingModal.vue';
  export default {
    name: 'events',
    components: {
      ItemListModal,
      ItemList,
    },
    props: ['page'],
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      title: "Events",
      showModal: false,
      modalInfo: {}
    };
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    filterData(dataArr, keys) {
      let data = dataArr.map(entry => {
        let filteredEntry = {};
        keys.forEach(key => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    }
  },
    beforeMount() {
        this.$http
        .get(process.env.VUE_APP_API_URL + "/v1/events")
        .then(response => {
            let data = response.data.reverse()
            let keys = Object.keys(data[0])
            let entries = this.filterData(data, keys);

            keys.map(key =>
                this.tableData.columns.push( {
                    label: key.toUpperCase(),
                    field: key,
                    sort: true
                }))
            entries.map(entry => this.tableData.rows.push(entry));
        })
        .catch(err => {
            console.log(err);
            this.$bvToast.toast(err.message, {
                title: "Error when getting events",
                autoHideDelay: 15000,
                variant: "danger",
                solid: true,
                appendToast: true
            });
        });
    }
  }
</script>