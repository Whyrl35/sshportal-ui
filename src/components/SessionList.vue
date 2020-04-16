<template>
  <div style="padding-top: 60px">
    <section id="events" class="p-5">
      <mdb-row>
        <mdb-col xl="12" lg="12" md="12" class="mb-r">
          <h1>Sessions list</h1><small>click on row to view details</small>
        </mdb-col>
        <mdb-col xl="12" lg="12" md="12" class="mt-4">
          <!-- scrollY :maxHeight="xxx" -->
          <mdb-datatable id="mytable" name="mytable" v-on:selectRow="viewDetails"
            :data="tableData"
            striped
            bordered
            responsive
            hover
            hoverColor="red"
            selectColor="red"
            :selected=2
            :borderless="true"
            :display="3"
            :tfoot="false"
          />
        </mdb-col>
      </mdb-row>
    </section>
  </div>
</template>
<style>
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: rgba(36, 77, 100, 0.5);
  color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
    };
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    },
  },
  methods: {
    viewDetails(row) {
      console.log(row);
      console.log(this.tableData.rows[row])
    },
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    },
    timeBetween(start, end) {
      var duration = new Date(end - start);
      var h = duration.getHours() - 1;
      var m = duration.getMinutes();
      var s = duration.getSeconds();
      return h > 0
        ? h + " hours"
        : m > 0
        ? m + " minutes"
        : s > 0
        ? s + " secondes"
        : "";
    }
  },
  mounted() {
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
          let host = item["host"]["name"];
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
            start: this.timeSince(start),
            duration: duration.trim(),
            error: item["err_msg"],
            comment: item["comment"],
          });
        }
      })
      .catch(err => {
        this.movies = [];
        console.log(err);
      });
  }
};
</script>
