<template>
  <div>
    <mdb-modal size="lg" :show="modal" @close="modal = false" info>
      <mdb-modal-header :color="$globalThemeColorDark">
        <mdb-modal-title>Session details</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="d-flex flex-row  pb-3">
          <div class="flex-fill pr-1"><h3><mdb-badge :color="$globalBadgeColor" class="w-100 p-2">ID: {{session.id}}</mdb-badge></h3></div>
          <div class="flex-fill "><h3><mdb-badge :color="session.status_color" class="w-100 p-2">Status: {{session.status}}</mdb-badge></h3></div>
        </div>
        <div>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Last error</th>
                <td>{{session.err_msg}}</td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'">comment</th>
                <td>{{session.comment}}</td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Created at</th>
                <td>{{session.created_at}}</td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">Updated at</th>
                <td>{{session.updated_at}}</td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'">User info</th>
                <td>
                  <a href="#">
                    {{ (session.user && session.user.name) || "" }}
                    <mdb-icon icon="external-link-alt" />
                  </a>
                </td>
              </tr>
              <tr>
                <th :class="$globalThemeColor + ' text-center'">Host info</th>
                <td>
                  <a href="#">
                    {{ (session.host && session.host.name) || ""  }}
                    <mdb-icon icon="external-link-alt" />
                  </a>
                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="modal = false">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {
        columns: [],
        rows: []
      },
      modal: false,
      session: {
        status_color: '',
        user: {}
      }
    };
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    },
  },
  methods: {
    viewDetails(row) {
      this.$http
      .get(process.env.VUE_APP_API_URL + "/v1/session/" + this.tableData.rows[row]['id'])
      .then(response => {
        let data = response.data
        this.session = data
        this.session.status_color = data.status == "closed" ? "success" : "warning"
        this.session.created_humain = this.timeSince(new Date(data.created_at), true)
        this.session.duration_humain = data.status == "closed" ? this.timeBetween(new Date(data.created_at), new Date(data.updated_at), true) : "on-going"
        this.session.created_at = new Date(this.session.created_at).toLocaleString()
        this.session.updated_at = new Date(this.session.updated_at).toLocaleString()
        var original_str = this.session.host.host_key
        this.session.host.host_key = original_str.substring(0,16)
        this.session.host.host_key += "..."
        this.session.host.host_key += original_str.substring(original_str.length - 16)
        this.modal = true
      })
      .catch(err => {
        console.log(err);
        this.modal = false
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
};
</script>
