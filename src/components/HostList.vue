<template>
  <div>
    <mdb-modal size="lg" :show="modal" @close="modal = false" info>
      <mdb-modal-header>
        <mdb-modal-title>Host details</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="d-flex flex-row  py-2">
          <div class="flex-fill pr-1"><h3><mdb-badge color="primary" class="w-100 p-2">ID: {{host.id}}</mdb-badge></h3></div>
          <div class="flex-fill"><h3><mdb-badge color="primary" class="w-100 p-2">Name: {{host.name}}</mdb-badge></h3></div>
        </div>
        <div>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr >
                <th class="default-color text-white text-center" style="width: 100px">Url</th>
                <td>{{host.url}}</td>
              </tr>
              <tr >
                <th class="default-color text-white text-center" style="width: 100px">Comment</th>
                <td>{{host.comment}}</td>
              </tr>
              <tr>
                <th class="default-color text-white text-center">Hop</th>
                <td>{{host.hop}}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="modal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <div style="padding-top: 60px">
      <section id="events" class="p-5">
        <mdb-row>
          <mdb-col xl="12" lg="12" md="12" class="mb-r">
            <h1>Hosts list</h1><small>click on row to view details</small>
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
  </div>
</template>
<style>
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #33b5e5;
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
      modal: false,
      host: {}
    }
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    },
  },
  methods: {
    viewDetails(row) {
      // some error here, id not always found, and host not working...
      this.$http.get(process.env.VUE_APP_API_URL + "/v1/host/" + this.tableData.rows[row]['id'])
      .then(response => {
        this.host = response.data
        this.modal = true
      })
      .catch(err => {
        console.log(err);
        this.modal = false
      });
    },
    timeSince(date, short_format) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return !short_format ? interval + " years ago" : interval + "y ago"
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return !short_format ? interval + " months ago" : interval + "mth ago"
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return !short_format ? interval + " days ago" : interval + "d ago"
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return !short_format ? interval + " hours ago" : interval + "h ago"
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return !short_format ? interval + " minutes ago" : interval + "min ago"
      }
      return !short_format ? interval + " secondes ago" : interval + "s ago"
    },
    timeBetween(start, end, short_format) {
      var duration = new Date(end - start);
      var h = duration.getHours() - 1;
      var m = duration.getMinutes();
      var s = duration.getSeconds();
      if (short_format) {
        return h > 0 ? h + "h" : m > 0 ? m + "m" : s > 0 ? s + "s" : "";
      }
        return h > 0 ? h + " hours" : m > 0 ? m + " minutes" : s > 0 ? s + " secondes" : "";
    }
  },
  mounted() {
    this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/hosts")
      .then(response => {
        let data = response.data.reverse();
        console.log(data)
        this.tableData.columns.push({ label: "ID", field: "id", sort: true });
        this.tableData.columns.push({ label: "NAME", field: "name", sort: true });
        this.tableData.columns.push({ label: "URL", field: "url", sort: true });
        this.tableData.columns.push({ label: "KEY", field: "ssh_key_name", sort: true });
        this.tableData.columns.push({ label: "GROUP", field: "host_groups_name", sort: true });
        this.tableData.columns.push({ label: "UPDATED", field: "updated_at", sort: true });
        this.tableData.columns.push({ label: "CREATED", field: "created_at", sort: true });
        this.tableData.columns.push({ label: "COMMENT", field: "comment", sort: true });
        this.tableData.columns.push({ label: "HOP", field: "hop", sort: true });

        for (const item of data) {
          item['ssh_key_name'] = item['ssh_key']['name']
          item['host_groups_name'] = item['host_groups']['name']
          item['updated_at'] = this.timeSince(new Date(item['updated_at']))
          item['created_at'] = this.timeSince(new Date(item['created_at']))
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
};
</script>
