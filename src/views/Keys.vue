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
    name: 'keys',
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
      title: "Keys",
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
    viewDetails(event) {
      let row = event;
      this.$http
        .get(
          process.env.VUE_APP_API_URL + "/v1/key/" + this.tableData.rows[row]["id"]
        )
        .then(response => {
            this.modalInfo.badges = [
              { title: "ID", value: response.data.id, color: this.$globalBadgeColor },
              { title: "Name", value: response.data.name, color: this.$globalBadgeColor },
            ];
            this.modalInfo.data = [
              { title: 'Type', value: response.data.type, },
              { title: 'Length', value: response.data.length, },
              { title: 'Fingerprint', value: response.data.fingerprint, },
              { title: 'Private Key', keyblock: response.data.priv_key },
              { title: 'Public Key', keyblock: response.data.pub_key },
              { title: 'Hosts', links: response.data.hosts.map(x => x.name), },
              { title: 'Created', value: new Date(response.data.created_at).toLocaleString(), },
              { title: 'Updated', value: new Date(response.data.updated_at).toLocaleString(), },
              { title: 'Comment', value: response.data.comment, },
            ];
          this.$nextTick(function() {
            this.showModal = true;
          });
        })
        .catch(err => {
          console.log(err);
          this.showModal = false;
        });
    },
  },
  beforeMount() {
    this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/keys")
      .then(response => {
        let data = response.data.reverse();
        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({
          label: "NAME",
          field: "name",
          sort: true
        });
        this.tableData.columns.push({
          label: "TYPE",
          field: "type",
          sort: true
        });
        this.tableData.columns.push({
          label: "LENGTH",
          field: "length",
          sort: true
        });
        this.tableData.columns.push({
          label: "HOSTS",
          field: "host_count",
          sort: true
        });
        this.tableData.columns.push({
          label: "UPDATED",
          field: "updated_at",
          sort: true
        });
        this.tableData.columns.push({
          label: "CREATED",
          field: "created_at",
          sort: true
        });
        this.tableData.columns.push({
          label: "COMMENT",
          field: "comment",
          sort: true
        });

        for (const item of data) {
          item["host_count"] = item["hosts"].length
          item["updated_at"] = this.timeSince(new Date(item["updated_at"]));
          item["created_at"] = this.timeSince(new Date(item["created_at"]));
          this.tableData.rows.push(item);
        }
      })
      .catch(err => {
        console.log(err);
        this.$bvToast.toast(err.message, {
          title: "Error when getting sessions",
          autoHideDelay: 15000,
          variant: "danger",
          solid: true,
          appendToast: true
        });
      });
    }
  }
</script>