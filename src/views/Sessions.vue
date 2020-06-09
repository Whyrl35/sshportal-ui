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
    name: 'sessions',
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
      title: "Sessions",
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
          process.env.VUE_APP_API_URL + "/v1/session/" + this.tableData.rows[row]['id']
        ).then(response => {
            this.modalInfo.badges = [
              { title: "ID", value: response.data.id, color: this.$globalBadgeColor },
              { title: "Status", value: response.data.status, color: response.data.status == "closed" ? "success-color":"info-color" },
            ];
            this.modalInfo.data = [
              { title: 'Last error', value: response.data.err_msg, },
              { title: 'User info', links: [ (response.data.user && response.data.user.name )] },
              { title: 'Hosts info', links: [ response.data.host.name ] },
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
      .get(process.env.VUE_APP_API_URL + "/v1/sessions")
      .then(response => {
        let data = response.data.reverse();

        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({
          label: "USER",
          field: "user",
          sort: true
        });
        this.tableData.columns.push({
          label: "HOST",
          field: "host",
          sort: true
        });
        this.tableData.columns.push({
          label: "STATUS",
          field: "status",
          sort: true
        });
        this.tableData.columns.push({
          label: "START",
          field: "start",
          sort: true
        });
        this.tableData.columns.push({
          label: "DURATION",
          field: "duration",
          sort: true
        });
        this.tableData.columns.push({
          label: "ERROR",
          field: "error",
          sort: true
        });
        this.tableData.columns.push({
          label: "COMMENT",
          field: "comment",
          sort: true
        });

        for (const item of data) {
          let user = item["user"]["name"];
          let host = item["host"] ? item["host"]["name"] ? item["host"]["name"] : "" : "";
          let duration = "on-going";
          let start = new Date(item["created_at"]);

          if (item["status"] == "closed") {
            let end = new Date(item["updated_at"]);
            duration = this.timeBetween(start, end);
          }

          this.tableData.rows.push({
            id: item["id"],
            user: user,
            host: host,
            status: item["status"],
            start: this.timeSince(start, false),
            duration: duration.trim(),
            error: item["err_msg"],
            comment: item["comment"],
          });
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